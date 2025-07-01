const express = require('express');
const router = express.Router();
const post = require('../controllers/post.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', post.getAll);
router.get('/:id', post.getById);
router.post('/', authMiddleware, post.create);
router.put('/:id', authMiddleware, post.update);
router.delete('/:id', authMiddleware, post.delete);

module.exports = router;
