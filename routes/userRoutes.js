const router = require('express').Router();
const {
  getUserProfile,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserStats,
} = require('../controllers/userController');
const { protect, admin } = require('../middlewares/authMiddleware');

// router.put('/:id', protect, admin, updateUser);
// router.delete('/:id', protect, admin, deleteUser);
// router.get('/:id', protect, getUserProfile);

router.route('/').get(protect, admin, getAllUsers);
router.get('/stats', protect, admin, getUserStats);

router
  .route('/:id')
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserProfile);

module.exports = router;
