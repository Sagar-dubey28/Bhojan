import Razorpay from "razorpay";
import dotenv from 'dotenv';

// Ensure environment variables are loaded
dotenv.config();

// Check if required environment variables are present
if (!process.env.RAZORPAY_API_KEY || !process.env.RAZORPAY_API_SECRET) {
  console.error('Error: Razorpay API credentials are missing in environment variables.');
  console.log('Required environment variables:');
  console.log('RAZORPAY_API_KEY:', process.env.RAZORPAY_API_KEY ? 'Present' : 'Missing');
  console.log('RAZORPAY_API_SECRET:', process.env.RAZORPAY_API_SECRET ? 'Present' : 'Missing');
  throw new Error('Razorpay API credentials are missing. Please check your .env file.');
}

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});
