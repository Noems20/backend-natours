import User from '../models/userModel.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

export const getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

export const getUser = (req, res) => {
  res.status(200).json({ success: true, msg: 'One users' });
};
export const createUser = (req, res) => {
  res.status(201).json({ success: true, msg: 'Created user' });
};
export const updateUser = (req, res) => {
  res.status(200).json({ success: true, msg: 'Update user' });
};
export const deleteUser = (req, res) => {
  res.status(204).json({ success: true, msg: 'Delete user' });
};
