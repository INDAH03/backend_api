const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/posts/:postId/comments', authMiddleware, commentController.create);
router.get('/posts/:postId/comments', commentController.getByPost);

module.exports = router;
