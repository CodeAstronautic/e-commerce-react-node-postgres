const express = require('express');
const { createOrder, getOrdersByUserId, updateOrderStatus } = require('../controllers/orderController');
const { authenticate } = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/adminMiddleware');
const router = express.Router();

router.post('/', authenticate, createOrder);
router.get('/user/:userId', authenticate, getOrdersByUserId);
router.get('/all-order', authenticate,isAdmin, getOrdersByUserId);
router.put('/update-order-status/:id', authenticate,isAdmin, updateOrderStatus);

module.exports = router;
