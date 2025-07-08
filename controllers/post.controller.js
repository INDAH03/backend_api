const { Post, User, Like, Bookmark } = require('../models');
const { Op } = require('sequelize');

exports.getAll = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'name']
        },
        {
          model: Like,
          include: [
            {
              model: User,
              attributes: ['id', 'name']
            }
          ]
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json(posts);
  } catch (error) {
    console.error('Gagal ambil postingan:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
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

const io = require('../socket');

exports.like = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;

    const existingLike = await Like.findOne({ where: { postId, userId } });

    if (existingLike) {
      await existingLike.destroy();
    } else {
      await Like.create({ postId, userId });
    }

    const totalLikes = await Like.count({ where: { postId } });

    const io = req.app.get('io');
    io.emit('postLiked', { postId: Number(postId), likesCount: totalLikes });

    res.json({ message: 'Sukses like/unlike' });
  } catch (error) {
    console.error('Gagal like post:', error);
    res.status(500).json({ message: 'Gagal like postingan' });
  }
};

exports.search = async (req, res) => {
  try {
    const keyword = req.query.q || '';

    const posts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'name'],
        },
        {
          model: Like,
          include: [
            {
              model: User,
              attributes: ['id', 'name']
            }
          ]
        }
      ],
      where: {
        [Op.or]: [
          { content: { [Op.like]: `%${keyword}%` } },
          { '$User.name$': { [Op.like]: `%${keyword}%` } }
        ]
      },
      order: [['createdAt', 'DESC']]
    });
    res.json(posts);
  } catch (error) {
    console.error('Gagal mencari postingan:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Bookmark a post
exports.bookmark = async (req, res) => {
  try {
    const userId = req.user.id; // dari authMiddleware
    const postId = req.params.id;

    // Simpan ke tabel bookmarks
    await Bookmark.create({
      userId,
      postId
    });

    res.status(200).json({ message: 'Post bookmarked successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to bookmark post' });
  }
};

exports.bookmark = async (req, res) => {
  try {
    const userId = req.user.id; 
    const postId = req.params.id;

    console.log('Bookmarking post:', postId, 'by user:', userId);

    await Bookmark.create({ userId, postId });

    res.status(201).json({ message: 'Post bookmarked' });
  } catch (err) {
    console.error('Bookmark error:', err); 
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.getBookmarks = async (req, res) => {
  try {
    const userId = req.user.id;

    const bookmarks = await Bookmark.findAll({
      where: { userId },
      include: [
        {
          model: Post,
          as: 'post',
          attributes: ['id', 'title', 'content']
        }
      ]
    });

    res.status(200).json({ bookmarks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


