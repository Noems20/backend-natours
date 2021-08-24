export const getAllUsers = (req, res) => {
  res.status(200).json({ success: true, msg: 'All users' });
};
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
