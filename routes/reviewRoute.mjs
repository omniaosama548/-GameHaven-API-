import express from "express";
import * as reviewController from '../controllers/reviewController.mjs'
import {isAuthenticated}  from '../middlewares/authMiddleware.mjs'

const router = express.Router();

router.post("/",isAuthenticated ,reviewController.createReview );
router.get("/game/:gameId", reviewController.getGameReviews); 
router.delete("/:reviewId",isAuthenticated, reviewController.deleteReview);
router.patch("/:reviewId",isAuthenticated, reviewController.updateReview);

export default router;
