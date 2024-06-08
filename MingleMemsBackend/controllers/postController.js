// controllers/postController.js
const Post = require('../models/post');

exports.createPost = async (req, res) => {
  const { content, tags, categories, scheduledTime } = req.body;
  const post = new Post({
    content,
    tags,
    categories,
    scheduledTime,
    author: req.user._id,
  });
  await post.save();
  res.json({ post });
};

exports.updatePost = async (req, res) => {
  const { content, tags, categories } = req.body;
  const post = await Post.findById(req.params.id);
  if (post.author.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  post.content = content || post.content;
  post.tags = tags || post.tags;
  post.categories = categories || post.categories;
  await post.save();
  res.json({ message: 'Post updated successfully' });
};

exports.deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post.author.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  await post.remove();
  res.json({ message: 'Post deleted successfully' });
};

exports.likePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post.likes.includes(req.user._id)) {
    post.likes.push(req.user._id);
    await post.save();
  }
  res.json({ message: 'Post liked successfully' });
};

exports.unlikePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  post.likes = post.likes.filter((like) => like.toString() !== req.user._id.toString());
  await post.save();
  res.json({ message: 'Post unliked successfully' });
};

exports.commentOnPost = async (req, res) => {
  const { content } = req.body;
  const post = await Post.findById(req.params.id);
  const comment = {
    content,
    author: req.user._id,
    createdAt: new Date(),
  };
  post.comments.push(comment);
  await post.save();
  res.json({ comment });
};

exports.sharePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post.shares.includes(req.user._id)) {
    post.shares.push(req.user._id);
    await post.save();
  }
  res.json({ message: 'Post shared successfully' });
};
