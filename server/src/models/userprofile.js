// User Profile

const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
    phone:{ type: String, required: true },
    address : { type: String, required: true },
    city : { type: String, required: true },
    country : { type: String, required: true },
    role: { type: String, enum: ['customer', 'service-provider'], default: 'customer' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    description :{ type: String }
});

  const UserProfile = mongoose.model('UserProfile', userProfileSchema)
  module.exports = UserProfile