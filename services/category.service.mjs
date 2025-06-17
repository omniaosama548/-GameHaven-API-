import Category from '../models/Category.mjs'
//get all category
export const getAllCategories=async ()=>{
    return await Category.find().sort({ createdAt: -1 });
    
}
//get by id
export const getCategoryById = async (id) => {
  return await Category.findById(id);
};
//create catogery
export const  createCategory=async (data)=>{
const category=new Category(data);
return await category.save();
}
//update
export const updateCategory=async (id,data)=>{
     return await Category.findByIdAndUpdate(id, data, { new: true });
}
//delete
export const deleteCategory = async (id) => {
  return await Category.findByIdAndDelete(id);
};