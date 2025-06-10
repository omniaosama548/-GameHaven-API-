import express from "express";
import {
  getWishlist,
  addWishlistItem,
  removeWishlistItem,
} from "../controllers/wishlistController.mjs";
import { isAuthenticated } from '../middlewares/authMiddleware.mjs';

const router = express.Router();

// GET wishlist by logen user
router.get("/",isAuthenticated , getWishlist);

// add game to wishlist  by logen user
router.post("/",isAuthenticated , addWishlistItem);

// DELETE game from wish list by logen user 
router.delete("/",isAuthenticated , removeWishlistItem);

export default router;
