import mongoose from 'mongoose';

const stageProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    stageNumber: {
      type: Number,
      required: true,
      min: 1,
    },
    points: {
      type: Number,
      default: 0,
      min: 0,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Create compound index to ensure one record per user per stage
stageProgressSchema.index({ userId: 1, stageNumber: 1 }, { unique: true });

// Method to complete a stage
stageProgressSchema.methods.completeStage = async function (points) {
  this.completed = true;
  this.points = points;
  this.completedAt = new Date();
  return await this.save();
};

// Static method to get user's progress for a specific stage
stageProgressSchema.statics.getUserStageProgress = async function (
  userId,
  stageNumber
) {
  return await this.findOne({ userId, stageNumber });
};

// Static method to get all completed stages for a user
stageProgressSchema.statics.getCompletedStages = async function (userId) {
  return await this.find({ userId, completed: true }).sort({ stageNumber: 1 });
};

// Static method to get total points for a user
stageProgressSchema.statics.getTotalPoints = async function (userId) {
  const result = await this.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId) } },
    { $group: { _id: null, totalPoints: { $sum: '$points' } } },
  ]);
  return result.length > 0 ? result[0].totalPoints : 0;
};

const StageProgress = mongoose.model('StageProgress', stageProgressSchema);

export default StageProgress;
