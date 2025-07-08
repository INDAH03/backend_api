const express = require('express');
const router = express.Router();
const post = require('../controllers/post.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const auth = require('../middlewares/auth.middleware');

router.get('/', post.getAll);
router.post('/', authMiddleware, post.create);
router.put('/:id', authMiddleware, post.update);
router.delete('/:id', authMiddleware, post.delete);
router.post('/:id/like', auth, post.like);
router.get('/search', post.search);
router.get('/:id', post.getById);
router.post('/:id/bookmark', authMiddleware, post.bookmark);
router.get('/bookmarks', authMiddleware, post.getBookmarks);

module.exports = router;
