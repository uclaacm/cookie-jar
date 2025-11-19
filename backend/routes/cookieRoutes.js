import express from 'express';
import User from '../models/User.js';
import Cookie from '../models/Cookie.js';

const router = express.Router();

// GET all cookies for a user
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const cookies = await Cookie.getUserCookies(userId);
    const totalSpent = await Cookie.getTotalSpent(userId);
    const cookiesByType = await Cookie.getCookieCountByType(userId);

    return res.status(200).json({
      cookies,
      totalCookies: cookies.length,
      totalSpent,
      cookiesByType,
    });
  } catch (error) {
    console.error('Error fetching cookies:', error);
    res.status(500).json({ error: 'An error occurred while fetching cookies' });
  }
});

// POST purchase a cookie
router.post('/purchase', async (req, res) => {
  try {
    const { userId, cookieName, cookieType, price } = req.body;

    if (!userId || !cookieName || !cookieType || price === undefined) {
      return res.status(400).json({
        error: 'User ID, cookie name, cookie type, and price are required',
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if user has enough points
    if (user.totalPoints < price) {
      return res.status(400).json({
        error: 'Insufficient points',
        message: `You need ${price} points but only have ${user.totalPoints}`,
      });
    }

    // Create the cookie purchase
    const cookie = new Cookie({
      userId,
      cookieName,
      cookieType,
      price,
    });

    await cookie.save();

    // Deduct points from user
    user.totalPoints -= price;
    await user.save();

    return res.status(201).json({
      message: 'Cookie purchased successfully',
      cookie,
      remainingPoints: user.totalPoints,
    });
  } catch (error) {
    console.error('Error purchasing cookie:', error);
    res.status(500).json({ error: 'An error occurred while purchasing the cookie' });
  }
});

// GET cookie statistics for a user
router.get('/:userId/stats', async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const totalCookies = await Cookie.countDocuments({ userId });
    const totalSpent = await Cookie.getTotalSpent(userId);
    const cookiesByType = await Cookie.getCookieCountByType(userId);

    return res.status(200).json({
      totalCookies,
      totalSpent,
      availablePoints: user.totalPoints,
      cookiesByType,
    });
  } catch (error) {
    console.error('Error fetching cookie stats:', error);
    res.status(500).json({ error: 'An error occurred while fetching cookie statistics' });
  }
});

// DELETE a cookie (refund)
router.delete('/:cookieId', async (req, res) => {
  try {
    const { cookieId } = req.params;

    const cookie = await Cookie.findById(cookieId);
    if (!cookie) {
      return res.status(404).json({ error: 'Cookie not found' });
    }

    const user = await User.findById(cookie.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Refund the points
    user.totalPoints += cookie.price;
    await user.save();

    // Delete the cookie
    await Cookie.findByIdAndDelete(cookieId);

    return res.status(200).json({
      message: 'Cookie refunded successfully',
      refundedPoints: cookie.price,
      totalPoints: user.totalPoints,
    });
  } catch (error) {
    console.error('Error refunding cookie:', error);
    res.status(500).json({ error: 'An error occurred while refunding the cookie' });
  }
});

export default router;
