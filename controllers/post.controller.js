const Post = require('../models/post.model');

exports.getAll = async (req, res) => {
  const posts = await Post.findAll();
  res.json(posts);
};

exports.getById = async (req, res) => {
  const post = await Post.findByPk(req.params.id);
  if (!post) return res.status(404).json({ message: 'Not found' });
  res.json(post);
};

exports.create = async (req, res) => {
  const post = await Post.create({ content: req.body.content, authorId: req.user.id });
  res.json(post);
};

exports.update = async (req, res) => {
  const post = await Post.findByPk(req.params.id);
  if (!post || post.authorId !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
  post.content = req.body.content;
  await post.save();
  res.json(post);
};

exports.delete = async (req, res) => {
  const post = await Post.findByPk(req.params.id);
  if (!post || post.authorId !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
  await post.destroy();
  res.json({ message: 'Deleted' });
};
