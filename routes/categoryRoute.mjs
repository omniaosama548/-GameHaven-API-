import express from 'express';
import * as categoryController from '../controllers/categoryController.mjs';
import { isAuthenticated } from '../middlewares/authMiddleware.mjs';
import { isAuthorized } from '../middlewares/roleMiddleware.mjs';
const router = express.Router();
//  Get all categories (any logged in user)
router.get("/",isAuthenticated,categoryController.getAllCategories)
// Get single category by ID(any logged in user)
router.get("/:id", isAuthenticated, categoryController.getCategoryById);
// Create new category (admin only)
router.post("/", isAuthenticated, isAuthorized("admin"), categoryController.createCategory);
//  Update category by ID (admin only)
router.put("/:id", isAuthenticated, isAuthorized("admin"), categoryController.updateCategory);
//  Delete category by ID (admin only)
router.delete("/:id", isAuthenticated, isAuthorized("admin"), categoryController.deleteCategory);

export default router;