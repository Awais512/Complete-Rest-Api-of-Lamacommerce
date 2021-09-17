const router = require('express').Router();
const {
  getAll,
  deleteCart,
  updateCart,
  getCart,
} = require('../controllers/cartController');
const { protect, admin } = require('../middlewares/authMiddleware');

router.route('/').get(protect, admin, getAll);
router
  .route('/:id')
  .get(protect, getCart)
  .put(protect, updateCart)
  .delete(protect, deleteCart);

module.exports = router;
