// controllers/userController.js
const User = require('../models/user');

exports.getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json(user);
};

exports.updateUserProfile = async (req, res) => {
  const { name, bio, interests, profilePicture, privacySettings } = req.body;
  const user = await User.findById(req.user._id);
  user.name = name || user.name;
  user.bio = bio || user.bio;
  user.interests = interests || user.interests;
  user.profilePicture = profilePicture || user.profilePicture;
  user.privacySettings = privacySettings || user.privacySettings;
  await user.save();
  res.json({ message: 'Profile updated successfully' });
};

exports.getFollowers = async (req, res) => {
  const user = await User.findById(req.user._id).populate('followers', 'id name profilePicture');
  res.json({ followers: user.followers });
};

exports.getFollowing = async (req, res) => {
  const user = await User.findById(req.user._id).populate('following', 'id name profilePicture');
  res.json({ following: user.following });
};
