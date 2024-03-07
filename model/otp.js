const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  expiration: { type: Date, required: true },
  verified: { type: Boolean },
});

module.exports = mongoose.model('OTP', otpSchema);