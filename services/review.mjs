import Review from '../models/Review.mjs'

export const createReview = async (userId, gameId, rating, comment) => {
  return await Review.create({ user: userId, game: gameId, rating, comment });
};

export const getReviewsByGame = async (gameId) => {
  return await Review.find({ game: gameId })
    .populate("user", "name")
    .sort("-createdAt");
};

export const deleteReview = async (reviewId, userId) => {
  return await Review.findOneAndDelete({ _id: reviewId, user: userId });
};

export const updateReview = async (reviewId, userId, data) => {
  return await Review.findOneAndUpdate(
    { _id: reviewId, user: userId },
    data,
    { new: true }
  );
};
