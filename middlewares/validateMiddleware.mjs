import { z } from "zod";

// Login schema
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

// Register schema
const registerSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

// Middleware function to validate request body against a schema
export const validateBody = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body); // will throw if validation fails
    next();
  } catch (error) {
    // Format Zod error messages nicely
    const errors = error.errors.map((err) => ({
      field: err.path[0],
      message: err.message,
    }));
    return res.status(400).json({ errors });
  }
};

export const loginValidation = validateBody(loginSchema);
export const registerValidation = validateBody(registerSchema);
