/**
 * Donation Routes
 */
const express = require('express');
const router = express.Router();
const {
  createDonation,
  getDonations,
  getDonation,
  updateDonation,
  deleteDonation,
} = require('../controllers/donationController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.route('/')
  .post(authorize('donor'), createDonation)
  .get(getDonations);

router.route('/:id')
  .get(getDonation)
  .put(updateDonation)
  .delete(deleteDonation);

module.exports = router;
