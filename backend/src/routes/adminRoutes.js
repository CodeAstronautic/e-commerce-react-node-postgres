const express = require('express');
const { getAllUsers, updateProduct } = require('../controllers/adminController');
const { authenticate } = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/adminMiddleware');
const router = express.Router();

router.get('/users', authenticate, isAdmin, getAllUsers);
router.put('/products/:id', authenticate, isAdmin, updateProduct);

module.exports = router;
