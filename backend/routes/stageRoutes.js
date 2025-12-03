import express from 'express';
import User from '../models/User.js';
import StageProgress from '../models/StageProgress.js';

const router = express.Router();

// GET user's stage progress
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const stageProgress = await StageProgress.find({ userId }).sort({ stageNumber: 1 });
    const totalPoints = await StageProgress.getTotalPoints(userId);

    return res.status(200).json({
      currentStage: user.currentStage,
      totalPoints,
      stages: stageProgress,
    });
  } catch (error) {
    console.error('Error fetching stage progress:', error);
    res.status(500).json({ error: 'An error occurred while fetching stage progress' });
  }
});

// POST start a new stage (must have completed previous stage)
router.post('/start', async (req, res) => {
  try {
    const { userId, stageNumber } = req.body;

    if (!userId || !stageNumber) {
      return res.status(400).json({ error: 'User ID and stage number are required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if user can access this stage
    if (!user.canAccessStage(stageNumber)) {
      return res.status(403).json({
        error: 'Cannot access this stage',
        message: `You must complete stage ${user.currentStage} first`,
        currentStage: user.currentStage,
      });
    }

    // Check if stage progress already exists
    let stageProgress = await StageProgress.findOne({ userId, stageNumber });

    if (!stageProgress) {
      // Create new stage progress
      stageProgress = new StageProgress({
        userId,
        stageNumber,
        points: 0,
        completed: false,
      });
      await stageProgress.save();
    }

    return res.status(200).json({
      message: 'Stage started',
      stage: stageProgress,
    });
  } catch (error) {
    console.error('Error starting stage:', error);
    res.status(500).json({ error: 'An error occurred while starting the stage' });
  }
});

// POST complete a stage
router.post('/complete', async (req, res) => {
  try {
    const { userId, stageNumber, points } = req.body;

    if (!userId || !stageNumber || points === undefined) {
      return res.status(400).json({ error: 'User ID, stage number, and points are required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if user can access this stage
    if (!user.canAccessStage(stageNumber)) {
      return res.status(403).json({
        error: 'Cannot complete this stage',
        message: 'You have not unlocked this stage yet',
      });
    }

    // Get or create stage progress
    let stageProgress = await StageProgress.findOne({ userId, stageNumber });

    if (!stageProgress) {
      stageProgress = new StageProgress({
        userId,
        stageNumber,
      });
    }

    // Complete the stage
    await stageProgress.completeStage(points);

    // Update user's total points
    const totalPoints = await StageProgress.getTotalPoints(userId);
    user.totalPoints = totalPoints;

    // Unlock next stage if this was the current stage
    if (stageNumber === user.currentStage) {
      await user.unlockNextStage();
    } else {
      await user.save();
    }

    return res.status(200).json({
      message: 'Stage completed successfully',
      stage: stageProgress,
      user: {
        currentStage: user.currentStage,
        totalPoints: user.totalPoints,
      },
    });
  } catch (error) {
    console.error('Error completing stage:', error);
    res.status(500).json({ error: 'An error occurred while completing the stage' });
  }
});

// GET specific stage progress
router.get('/:userId/:stageNumber', async (req, res) => {
  try {
    const { userId, stageNumber } = req.params;

    const stageProgress = await StageProgress.getUserStageProgress(userId, parseInt(stageNumber));

    if (!stageProgress) {
      return res.status(404).json({ error: 'Stage progress not found' });
    }

    return res.status(200).json(stageProgress);
  } catch (error) {
    console.error('Error fetching stage:', error);
    res.status(500).json({ error: 'An error occurred while fetching stage progress' });
  }
});

export default router;
