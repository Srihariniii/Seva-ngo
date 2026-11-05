import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'seva_ngo_jwt_secret_dev_key', {
    expiresIn: '7d'
  });
};

// @desc    Auth admin & get token
// @route   POST /api/auth/login
// @access  Public
export const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password'
      });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });

    if (admin && (await admin.matchPassword(password))) {
      return res.json({
        success: true,
        message: 'Admin login successful',
        data: {
          _id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
          token: generateToken(admin._id)
        }
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current admin profile
// @route   GET /api/auth/profile
// @access  Private
export const getAdminProfile = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.admin._id).select('-password');
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }
    res.json({
      success: true,
      data: admin
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Verify current token validity
// @route   GET /api/auth/verify
// @access  Private
export const verifyAuth = async (req, res) => {
  res.json({
    success: true,
    message: 'Token is valid',
    data: {
      _id: req.admin._id,
      name: req.admin.name,
      email: req.admin.email,
      role: req.admin.role
    }
  });
};
