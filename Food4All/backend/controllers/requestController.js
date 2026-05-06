/**
 * Request Controller
 * Handles NGO food pickup requests
 */
const Request = require('../models/Request');
const Donation = require('../models/Donation');

/**
 * @route   POST /api/requests
 * @desc    Create request for donation (NGO only)
 */
exports.createRequest = async (req, res, next) => {
  try {
    const { donationId } = req.body;

    if (!donationId) {
      return res.status(400).json({ success: false, message: 'Donation ID is required' });
    }

    const donation = await Donation.findById(donationId);
    if (!donation) {
      return res.status(404).json({ success: false, message: 'Donation not found' });
    }

    if (donation.status !== 'Pending') {
      return res.status(400).json({ success: false, message: 'Donation is no longer available' });
    }

    const existingRequest = await Request.findOne({ donationId, ngoId: req.user.id });
    if (existingRequest) {
      return res.status(400).json({ success: false, message: 'You have already requested this donation' });
    }

    const request = await Request.create({
      donationId,
      ngoId: req.user.id,
    });

    // Update donation status to Accepted
    donation.status = 'Accepted';
    await donation.save();

    const populatedRequest = await Request.findById(request._id)
      .populate('donationId', 'title quantity location pickupTime')
      .populate('ngoId', 'name email phone');

    res.status(201).json({
      success: true,
      message: 'Request submitted successfully',
      data: populatedRequest,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/requests
 * @desc    Get requests (NGO sees own, donor sees for their donations)
 */
exports.getRequests = async (req, res, next) => {
  try {
    let query = {};

    if (req.user.role === 'ngo') {
      query.ngoId = req.user.id;
    } else if (req.user.role === 'donor') {
      // Get donations by this donor
      const donations = await Donation.find({ donorId: req.user.id }).select('_id');
      const donationIds = donations.map((d) => d._id);
      query.donationId = { $in: donationIds };
    }

    const requests = await Request.find(query)
      .populate('donationId', 'title description quantity location pickupTime status donorId')
      .populate('ngoId', 'name email phone location')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: requests.length,
      data: requests,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PUT /api/requests/:id/status
 * @desc    Update request status (NGO marks as Collected)
 */
exports.updateRequestStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const request = await Request.findById(req.params.id)
      .populate('donationId');

    if (!request) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }

    if (req.user.role === 'ngo' && request.ngoId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    if (status === 'Collected') {
      request.status = 'Collected';
      request.donationId.status = 'Completed';
      await request.donationId.save();
    } else if (status) {
      request.status = status;
    }

    await request.save();

    const updatedRequest = await Request.findById(request._id)
      .populate('donationId', 'title quantity location pickupTime status')
      .populate('ngoId', 'name email phone');

    res.status(200).json({
      success: true,
      message: 'Request updated successfully',
      data: updatedRequest,
    });
  } catch (error) {
    next(error);
  }
};
