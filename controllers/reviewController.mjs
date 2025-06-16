import catchAsync from '../utils/catchAsync.mjs'
import * as reviewService from '../services/review.mjs';
import AppError from '../utils/appError.mjs';

export const createReview = catchAsync(async (req, res, next) => {
  const { gameId, rating, comment } = req.body;
  if (!gameId || !rating) {
    return next(new AppError("Game ID and rating are required", 400));
  }
  const review = await reviewService.createReview(req.user._id, gameId, rating, comment);
  res.status(201).json(review);
});

export const getGameReviews = catchAsync(async (req, res, next) => {
  const { gameId } = req.params;
  const reviews = await reviewService.getReviewsByGame(gameId);
  res.status(200).json(reviews);
});

export const deleteReview = catchAsync(async (req, res, next) => {
  const { reviewId } = req.params;
  const deleted = await reviewService.deleteReview(reviewId, req.user._id);
  if (!deleted) return next(new AppError("Review not found or not authorized", 404));
  res.status(200).json({
     message:"review deleted successfully"
});
});

export const updateReview = catchAsync(async (req, res, next) => {
  const { reviewId } = req.params;
  const updated = await reviewService.updateReview(reviewId, req.user._id, req.body);
  if (!updated) return next(new AppError("Review not found or not authorized", 404));
  res.status(200).json({
    message:"review updated successfully",
    updated});
});
