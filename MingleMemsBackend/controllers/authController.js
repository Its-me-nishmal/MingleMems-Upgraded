// controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const dotenv = require('dotenv');

dotenv.config();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

exports.login = async (req, res) => {
  console.log(req.body)
  const { phoneNumber, otp } = req.body;
  // Implement OTP verification logic here
  // Assuming OTP is verified, find or create the user
  let user = await User.findOne({ phoneNumber });
  if (!user) {
    user = new User({ phoneNumber, name: 'New User', password: 'test123' });
    await user.save();
  }
  const token = generateToken(user._id);
  res.json({ token, user });
  console.log('Token sent:', token);
};
