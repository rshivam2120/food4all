/**
 * Donation Controller
 * Handles CRUD operations for food donations
 */
const Donation = require('../models/Donation');
const Request = require('../models/Request');

/**
 * @route   POST /api/donations
 * @desc    Create new donation (Donor only)
 */
exports.createDonation = async (req, res, next) => {
  try {
    req.body.donorId = req.user.id;

    const donation = await Donation.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Donation created successfully',
      data: donation,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/donations
 * @desc    Get all donations (filter by status for NGO)
 */
exports.getDonations = async (req, res, next) => {
  try {
    const { status, donorId } = req.query;
    let query = {};

    // Donors see only their donations
    if (req.user.role === 'donor') {
      query.donorId = req.user.id;
    } else if (req.user.role === 'ngo') {
      // NGOs see only available (Pending) donations
      query.status = status || 'Pending';
    } else if (donorId) {
      query.donorId = donorId;
    }

    if (status) query.status = status;

    const donations = await Donation.find(query)
      .populate('donorId', 'name email phone')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: donations.length,
      data: donations,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/donations/:id
 * @desc    Get single donation
 */
exports.getDonation = async (req, res, next) => {
  try {
    const donation = await Donation.findById(req.params.id)
      .populate('donorId', 'name email phone location');

    if (!donation) {
      return res.status(404).json({ success: false, message: 'Donation not found' });
    }

    res.status(200).json({
      success: true,
      data: donation,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PUT /api/donations/:id
 * @desc    Update donation (status update for NGO/donor)
 */
exports.updateDonation = async (req, res, next) => {
  try {
    let donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({ success: false, message: 'Donation not found' });
    }

    // Only donor can update donation details (except status)
    if (req.user.role === 'donor' && donation.donorId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const { status, ...updateFields } = req.body;

    // Donors can update everything except status (for some fields)
    if (req.user.role === 'donor') {
      Object.assign(donation, updateFields);
    }

    // NGO can update status to Completed after pickup
    if (req.user.role === 'ngo' && status === 'Completed') {
      donation.status = 'Completed';
    } else if (status && req.user.role === 'donor') {
      donation.status = status;
    } else if (status) {
      donation.status = status;
    }

    await donation.save();

    donation = await Donation.findById(donation._id).populate('donorId', 'name email phone');

    res.status(200).json({
      success: true,
      message: 'Donation updated successfully',
      data: donation,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   DELETE /api/donations/:id
 * @desc    Delete donation (Donor only)
 */
exports.deleteDonation = async (req, res, next) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({ success: false, message: 'Donation not found' });
    }

    if (donation.donorId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to delete' });
    }

    await Request.deleteMany({ donationId: donation._id });
    await Donation.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Donation deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
