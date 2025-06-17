import User from "../models/User.mjs";

export const getAllUsers = async () => {
  return await User.find({});
};

export const updateUser = async (id, updatedUser) => {
  const changedUser = await User.findOneAndUpdate({ _id: id }, updatedUser, {
    new: true,
  });
  if (!changedUser) throw new Error("User not found");
  return changedUser;
};

export const deleteUser = async (id) => {
  const deletedUser = await User.findByIdAndDelete(id);
  if (!deletedUser) throw new Error("User not found");
  return deletedUser;
};
