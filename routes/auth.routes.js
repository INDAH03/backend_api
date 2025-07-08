const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware.js');

router.post('/register', auth.register);
router.post('/login', auth.login);
router.get('/profile', authMiddleware, auth.getProfile);

module.exports = router;
