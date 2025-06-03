import AppError from "../utils/appError.mjs";

// Error handling functions
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateErrorDB = (err) => {
  const value = err.keyValue ? Object.values(err.keyValue)[0] : "unknown";
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError("Invalid token, please log in again", 401);

const handleJWTExpiredError = () =>
  new AppError("Your token has expired, please log in again", 401);

// Response functions
const sendErrorDev = (err, req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
  console.error("ERROR", err);
  return res.status(err.statusCode).render("error", {
    title: "Something went wrong",
    msg: err.message,
  });
};

const sendErrorProd = (err, req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    console.error("ERROR", err);
    return res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }
  if (err.isOperational) {
    return res.status(err.statusCode).render("error", {
      title: "Something went wrong",
      msg: err.message,
    });
  }
  console.error("ERROR", err);
  return res.status(err.statusCode).render("error", {
    title: "Something went wrong",
    msg: "Please try again later.",
  });
};

// Global error handler
const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    // Improved error copying
    let error = {
      ...err,
      name: err.name,
      message: err.message,
      code: err.code,
    };

    // Map of error handlers
    const errorHandlers = {
      CastError: handleCastErrorDB,
      11000: handleDuplicateErrorDB,
      ValidationError: handleValidationErrorDB,
      JsonWebTokenError: handleJWTError,
      TokenExpiredError: handleJWTExpiredError,
    };

    const handler = errorHandlers[error.name] || errorHandlers[error.code];
    if (handler) error = handler(error);

    sendErrorProd(error, req, res);
  }
};

export default globalErrorHandler;
