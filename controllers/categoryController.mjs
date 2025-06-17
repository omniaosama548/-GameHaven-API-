import * as categoryService from '../services/category.service.mjs'
import catchAsync from '../utils/catchAsync.mjs'
import AppError from '../utils/appError.mjs';
//get all categories 
export const getAllCategories =catchAsync(async(req,res,next)=>{
    const categories=await categoryService.getAllCategories();
    res.status(200).json(categories);
})
//get by id
export const getCategoryById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const category = await categoryService.getCategoryById(id);

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  res.status(200).json(category);
});

//create category
export const createCategory=catchAsync(async(req,res,next)=>{
    const { name } = req.body;
     if (!name) {
    return next(new AppError("Category name is required", 400));
  }
  const category = await categoryService.createCategory({ name });
  res.status(201).json(category);
})
//update category
export const updateCategory=catchAsync(async(req,res,next)=>{
    const { id } = req.params;
  const data = req.body;
  const updatedCategory = await categoryService.updateCategory(id, data);
   if (!updatedCategory) {
    return next(new AppError("Category not found", 404));
  }
  res.status(200).json({
    message: "Category updated successfully",
    data: updatedCategory,
  });
})
//delete
export const deleteCategory=catchAsync(async(req,res,next)=>{
    const deleted=await categoryService.deleteCategory(req.params.id);
    if(!deleted){
        return next(new AppError("Category not found", 404));
    }
     res.status(204).json({ message: "Category deleted successfully" });
})