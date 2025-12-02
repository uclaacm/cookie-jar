import mongoose from 'mongoose';

const cookieSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    cookieName: {
      type: String,
      required: true,
      trim: true,
    },
    cookieType: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    purchasedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
cookieSchema.index({ userId: 1 });
cookieSchema.index({ purchasedAt: -1 });

// Static method to get all cookies for a user
cookieSchema.statics.getUserCookies = async function (userId) {
  return await this.find({ userId }).sort({ purchasedAt: -1 });
};

// Static method to get total spent by user
cookieSchema.statics.getTotalSpent = async function (userId) {
  const result = await this.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId) } },
    { $group: { _id: null, totalSpent: { $sum: '$price' } } },
  ]);
  return result.length > 0 ? result[0].totalSpent : 0;
};

// Static method to count cookies by type for a user
cookieSchema.statics.getCookieCountByType = async function (userId) {
  return await this.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId) } },
    { $group: { _id: '$cookieType', count: { $sum: 1 } } },
  ]);
};

const Cookie = mongoose.model('Cookie', cookieSchema);

export default Cookie;
