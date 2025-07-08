const { Comment } = require('../models');

exports.create = async (req, res) => {
  try {
    const { content } = req.body;
    const { postId } = req.params;
    const user = req.user;

    if (!content) {
      return res.status(400).json({ message: 'Komentar tidak boleh kosong' });
    }

    const comment = await Comment.create({
      postId,
      content,
      author: user.name,
    });

    res.status(201).json({ message: 'Komentar berhasil ditambahkan', comment });
  } catch (error) {
    console.error('Gagal membuat komentar:', error);
    res.status(500).json({ message: 'Gagal membuat komentar' });
  }
};

exports.getByPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.findAll({
      where: { postId },
      order: [['createdAt', 'DESC']],
    });

    res.json(comments);
  } catch (error) {
    console.error('Gagal mengambil komentar:', error);
    res.status(500).json({ message: 'Gagal mengambil komentar' });
  }
};

