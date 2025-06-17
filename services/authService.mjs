import User from "../models/User.mjs";

export const getOneUser = async (query) => {
  return await User.findOne(query).select("+password");
};

export const addUser = async (newUser) => {
  const addedUser = await User.create(newUser);
  console.log(addedUser);
  return "User added successfully";
};
