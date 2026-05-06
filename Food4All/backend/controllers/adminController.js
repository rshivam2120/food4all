/**
 * Admin Controller
 * Handles admin operations - stats, user management
 */
const User = require('../models/User');
const Donation = require('../models/Donation');
const Request = require('../models/Request');

/**
 * @route   GET /api/admin/stats
 * @desc    Get dashboard statistics
 */
exports.getStats = async (req, res, next) => {
  try {
    const totalDonations = await Donation.countDocuments();
    const totalDonors = await User.countDocuments({ role: 'donor' });
    const totalNgos = await User.countDocuments({ role: 'ngo' });
    const completedDonations = await Donation.countDocuments({ status: 'Completed' });
    const pendingDonations = await Donation.countDocuments({ status: 'Pending' });
    const acceptedDonations = await Donation.countDocuments({ status: 'Accepted' });

    res.status(200).json({
      success: true,
      data: {
        totalDonations,
        totalDonors,
        totalNgos,
        completedDonations,
        pendingDonations,
        acceptedDonations,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/admin/users
 * @desc    Get all users (with filters)
 */
exports.getUsers = async (req, res, next) => {
  try {
    const { role } = req.query;
    let query = {};

    if (role) query.role = role;

    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PUT /api/admin/users/:id/block
 * @desc    Block or unblock user
 */
exports.blockUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (user.role === 'admin') {
      return res.status(403).json({ success: false, message: 'Cannot block admin user' });
    }

    user.isBlocked = !user.isBlocked;
    await user.save();

    res.status(200).json({
      success: true,
      message: user.isBlocked ? 'User blocked successfully' : 'User unblocked successfully',
      data: { id: user._id, isBlocked: user.isBlocked },
    });
  } catch (error) {
    next(error);
  }
};
