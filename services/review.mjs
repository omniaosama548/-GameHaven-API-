import Review from '../models/Review.mjs'

export const createReview = async (userId, gameId, rating, comment) => {
  const review = await Review.create({ user: userId, game: gameId, rating, comment });

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
  return await Review.find({ game: gameId })
     .select("-__v")
    .populate("user", "name")
    .populate("game", "title")
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
