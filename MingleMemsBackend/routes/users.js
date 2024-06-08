// routes/users.js
const express = require('express');
const { getUserProfile, updateUserProfile, getFollowers, getFollowing } = require('../controllers/userController');
const auth = require('../middlewares/auth');
const apiLimiter = require('../middlewares/rateLimit');
const router = express.Router();

router.get('/', auth, apiLimiter, getUserProfile);
router.put('/', auth, apiLimiter, updateUserProfile);
router.get('/followers', auth, apiLimiter, getFollowers);
router.get('/following', auth, apiLimiter, getFollowing);

module.exports = router;
