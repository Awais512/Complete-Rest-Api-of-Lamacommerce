const User = require('../models/User');
const asyncHandler = require('express-async-handler');

//@route        POST /api/users/:id
//@desc         Update User
//@access       Private/admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (req.body.password) {
    user.password = req.body.password;
  }
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );
  res.status(200).json(updatedUser);
});

//@route        DELETE /api/users/:id
//@desc         Delete User
//@access       Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    throw new Error('User not Found');
  }
  res.status(200).json({ msg: 'User Deleted Successfully' });
});

//@desc     Get all Users
//@route    GET api/users
//@access   Private
const getAllUsers = asyncHandler(async (req, res) => {
  const query = req.query.new;
  const users = query
    ? await User.find().sort({ _id: -1 }).limit(5)
    : await User.find();
  res.status(200).json(users);
});

//@desc     Get User Profile
//@route    GET api/users/:id
//@access   Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    return res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not Found');
  }
});

//@desc     Get User Stats
//@route    GET api/users/stats
//@access   Private
const getUserStats = asyncHandler(async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  const data = await User.aggregate([
    { $match: { createdAt: { $gte: lastYear } } },
    {
      $project: {
        month: { $month: '$createdAt' },
      },
    },
    {
      $group: {
        _id: '$month',
        total: { $sum: 1 },
      },
    },
  ]);
  res.status(200).json(data);
});

module.exports = {
  updateUser,
  getUserProfile,
  deleteUser,
  getAllUsers,
  getUserStats,
};
