/**
 * Request Routes
 */
const express = require('express');
const router = express.Router();
const {
  createRequest,
  getRequests,
  updateRequestStatus,
} = require('../controllers/requestController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.route('/')
  .post(authorize('ngo'), createRequest)
  .get(getRequests);

router.put('/:id/status', authorize('ngo'), updateRequestStatus);

module.exports = router;
