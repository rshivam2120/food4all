/**
 * Admin Routes
 */
const express = require('express');
const router = express.Router();
const { getStats, getUsers, blockUser } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);
router.use(authorize('admin'));

router.get('/stats', getStats);
router.get('/users', getUsers);
router.put('/users/:id/block', blockUser);

module.exports = router;
