// routes/auth.js
const express = require('express');
const { login } = require('../controllers/authController');
const apiLimiter = require('../middlewares/rateLimit');
const router = express.Router();

router.post('/login', login);

module.exports = router;
