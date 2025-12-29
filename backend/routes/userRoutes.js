import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import StageProgress from '../models/StageProgress.js';
import Cookie from '../models/Cookie.js';

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      profilePhoto: user.profilePhoto,
      currentStage: user.currentStage,
      totalPoints: user.totalPoints,
    },
    JWT_SECRET,
    { expiresIn: '24h' },
  );
};

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// POST login endpoint

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if all required fields are provided
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the password is correct
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = generateToken(user);

    // Return user data and token
    return res.status(200).json({
      message: 'Login successful',
      token,
      user: user.toJSON(),
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'An error occurred during login' });
  }
});

// POST signup endpoint

router.post('/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, password, profilePhoto } = req.body;

    // Check if all required fields are provided
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Create new user
    const user = new User({
      firstName,
      lastName,
      email,
      password,
      profilePhoto: profilePhoto || null,
    });

    // Save user (password will be hashed automatically by pre-save hook)
    await user.save();

    // Generate JWT token for the new user
    const token = generateToken(user);

    return res.status(201).json({
      message: 'User registered successfully',
      token,
      user: user.toJSON(),
    });
  } catch (error) {
    console.error('Signup error:', error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        error: 'Validation error',
        details: Object.values(error.errors).map(e => e.message)
      });
    }

    res.status(500).json({ error: 'An error occurred during registration' });
  }
});

// PUT endpoint to update user total points
router.put('/points', verifyToken, async (req, res) => {
  try {
    const { points } = req.body;

    if (typeof points !== 'number' || points < 0) {
      return res.status(400).json({ error: 'Points must be a non-negative number' });
    }

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.totalPoints += points;
    console.log("NEW TOTAL POINTS:", user.totalPoints);
    await user.save();

    return res.status(200).json({
      message: 'Points updated successfully',
      totalPoints: user.totalPoints,
      pointsAdded: points
    });
  } catch (error) {
    console.error('Update points error:', error);
    res.status(500).json({ error: 'An error occurred while updating points' });
  }
});

// GET endpoint to get user's current total points
router.get('/points', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({
      totalPoints: user.totalPoints
    });
  } catch (error) {
    console.error('Get points error:', error);
    res.status(500).json({ error: 'An error occurred while fetching points' });
  }
});

export default router;
