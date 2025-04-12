const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getLoggedUser,
  getDummyRecords,
  adminGetAllUsers
} = require('../controllers/userController.js');
const { protect } = require('../middleware/authMiddleware.js');

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getLoggedUser);
router.get('/records', protect, getDummyRecords);
router.get('/admin/users', protect, adminGetAllUsers);

module.exports = router;
