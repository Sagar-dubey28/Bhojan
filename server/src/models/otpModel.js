import mongoose from "mongoose";

const OTPSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600, //time in Seconds
  },
});

const OTP = mongoose.model("OTP", OTPSchema);

export default OTP;