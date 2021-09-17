const router = require('express').Router();
const {
  getAllOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  getMonthlyIncome,
} = require('../controllers/orderController');
const { protect, admin } = require('../middlewares/authMiddleware');

router.get('/stats', protect, admin, getMonthlyIncome);

router.route('/').get(protect, admin, getAllOrders).post(protect, createOrder);
router
  .route('/:id')
  .get(protect, getOrder)
  .put(protect, updateOrder)
  .delete(protect, admin, deleteOrder);

module.exports = router;
