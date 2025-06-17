import Review from '../models/Review.mjs';
import Game from '../models/Game.mjs';
import AppError from '../utils/appError.mjs';

export const createReview = async (userId, gameId, rating, comment) => {
  const game = await Game.findById(gameId);
  if (!game) {
    throw new AppError("Game not found", 404);
  }

  const review = await Review.create({
    user: userId,
    game: gameId,
    rating,
    comment
  });

  const populatedReview = await Review.findById(review._id)
    .populate("user", "name")
    .populate("game", "title");

  return {
    message: "Review created successfully",
    review: {
      _id: populatedReview._id,
      userId: populatedReview.user?._id,
      userName: populatedReview.user?.name,
      gameId: populatedReview.game?._id,
      gameTitle: populatedReview.game?.title,
      rating: populatedReview.rating,
      comment: populatedReview.comment,
      createdAt: populatedReview.createdAt,
    }
  };
};


export const getReviewsByGame = async (gameId) => {
  const game = await Game.findById(gameId);
  if (!game) {
    throw new AppError("Game not found", 404);
  }

  const reviews = await Review.find({ game: gameId })
    .select("-__v")
    .populate("user", "name")
    .populate("game", "title")
    .sort("-createdAt");

  return reviews;
};


export const deleteReview = async (reviewId, userId) => {
  const deleted = await Review.findOneAndDelete({ _id: reviewId, user: userId });
  if (!deleted) {
    throw new AppError("Review not found or not authorized", 404);
  }
  return deleted;
};

export const updateReview = async (reviewId, userId, data) => {
  const updated = await Review.findOneAndUpdate(
    { _id: reviewId, user: userId },
    data,
    { new: true }
  );
  if (!updated) {
    throw new AppError("Review not found or not authorized", 404);
  }
  return updated;
};
