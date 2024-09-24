const express = require('express');
const { register, login, updateUser } = require('../controllers/authController');
const { authenticate } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put('/update',authenticate, updateUser);

module.exports = router;
