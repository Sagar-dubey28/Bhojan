
import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_payment_id: {
    type: String,
    required: false,
  },
  razorpay_signature: {
    type: String,
    required: false,
  },
  userEmail: {
    type: String,
  },
  items: {
    type: Array,
    default: []
  },
  // reference to Address document
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
  },
  totalAmount: {
    type: Number,
  },
  // which restaurant this payment/order belongs to (optional)
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resturant",
  },
  // payment method: 'online' | 'cod' | 'wallet' etc.
  paymentMethod: {
    type: String,
    default: "online",
  },
  status: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending"
  }
});

 const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
