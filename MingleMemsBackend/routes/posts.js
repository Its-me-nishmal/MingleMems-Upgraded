// routes/posts.js
const express = require('express');
const { createPost, updatePost, deletePost, likePost, unlikePost, commentOnPost, sharePost } = require('../controllers/postController');
const auth = require('../middlewares/auth');
const apiLimiter = require('../middlewares/rateLimit');
const router = express.Router();

router.post('/', auth, apiLimiter, createPost);
router.put('/:id', auth, apiLimiter, updatePost);
router.delete('/:id', auth, apiLimiter, deletePost);
router.post('/:id/like', auth, apiLimiter, likePost);
router.delete('/:id/like', auth, apiLimiter, unlikePost);
router.post('/:id/comments', auth, apiLimiter, commentOnPost);
router.post('/:id/share', auth, apiLimiter, sharePost);

module.exports = router;
