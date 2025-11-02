import Razorpay from "razorpay";
// import dotenv from 'dotenv';

// // Ensure environment variables are loaded
// dotenv.config();


export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});
