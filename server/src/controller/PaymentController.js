import { instance } from "../config/Razorpay.js";
import crypto from "crypto";
import  Payment from "../models/PaymentModal.js";
import Address from "../models/AddressModel.js";

export const checkout = async (req, res) => {
  try {
    // Expect amount, items, address in request body
    const { amount, items, address, paymentMethod, restaurantId: reqRestaurantId } = req.body;

    const options = {
      amount: Number(amount * 100),
      currency: "INR",
      receipt: `order_${Date.now()}`,
    };

    const order = await instance.orders.create(options);
    // persist address as a separate document
    let addressDoc = null;
    try {
      if (address) {
        addressDoc = await Address.create({
          name: address.name,
          phone: address.phone,
          line1: address.line1,
          city: address.city,
          pincode: address.pincode,
          userEmail: (req.user && req.user.email) || undefined,
        });
      }
    } catch (err) {
      console.warn("Unable to create address record:", err.message);
    }

    // determine restaurantId from items or request body
    const detectedRestaurantId = Array.isArray(items) && items.length > 0
      ? (items[0].resturantId || items[0].restaurantId || items[0].restaurant || null)
      : null;
    const restaurantId = reqRestaurantId || detectedRestaurantId || undefined;

    // Create a pending payment record so restaurant can see incoming orders
    try {
      await Payment.create({
        razorpay_order_id: order.id,
        items: items || [],
        address: addressDoc ? addressDoc._id : undefined,
        totalAmount: amount || undefined,
        status: "pending",
        userEmail: (req.user && req.user.email) || undefined,
        restaurantId: restaurantId,
        paymentMethod: paymentMethod || "online"
      });
    } catch (err) {
      console.warn("Unable to create pending payment record:", err.message);
    }

    // Return order and echo back the metadata so client can keep it until verification
    res.status(200).json({
      success: true,
      order,
      meta: { items, address, amount }
    });
  } catch (error) {
    console.error("Checkout error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating order",
      error: error.message
    });
  }
};

export const paymentVerification = async (req, res) => {
  try {
    // Expect razorpay ids plus optional metadata (items, address, amount, userEmail)
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, items, address, amount, userEmail, paymentMethod } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // If an address object was provided, persist or update it
      let addressDoc = null;
      try {
        if (address) {
          addressDoc = await Address.create({
            name: address.name,
            phone: address.phone,
            line1: address.line1,
            city: address.city,
            pincode: address.pincode,
            userEmail: userEmail || (req.user && req.user.email) || undefined,
          });
        }
      } catch (err) {
        console.warn("Unable to create address record during verification:", err.message);
      }

      // Update the pending payment record (created at checkout) with payment ids and mark as paid
      const update = {
        razorpay_payment_id,
        razorpay_signature,
        items: items || [],
        totalAmount: amount || undefined,
        userEmail: userEmail || (req.user && req.user.email) || undefined,
        status: "paid",
      };
      if (addressDoc) update.address = addressDoc._id;
      if (paymentMethod) update.paymentMethod = paymentMethod;

      const payment = await Payment.findOneAndUpdate(
        { razorpay_order_id },
        update,
        { new: true, upsert: true }
      );

      res.status(200).json({ success: true, data: payment });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid payment signature"
      });
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({
      success: false,
      message: "Payment verification failed",
      error: error.message
    });
  }
};

export const getOrders = async (req, res) => {
  try {
    // Optionally allow query params to filter by status, userEmail or restaurantId
    const { status, userEmail, restaurantId } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (userEmail) filter.userEmail = userEmail;
    if (restaurantId) filter.restaurantId = restaurantId;

    const payments = await Payment.find(filter).populate('address').sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: payments });
  } catch (error) {
    console.error("Get orders error:", error);
    res.status(500).json({ success: false, message: "Unable to fetch orders" });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const { restaurantId } = req.query;
    if (!restaurantId) return res.status(400).json({ success: false, message: "restaurantId is required" });

    const payments = await Payment.find({ restaurantId }).sort({ createdAt: -1 });
    // map to transactions
    const transactions = payments.map(p => ({
      id: p._id,
      amount: p.totalAmount,
      status: p.status,
      paymentMethod: p.paymentMethod,
      razorpay_payment_id: p.razorpay_payment_id,
      createdAt: p.createdAt
    }));

    res.status(200).json({ success: true, data: transactions });
  } catch (error) {
    console.error("Get transactions error:", error);
    res.status(500).json({ success: false, message: "Unable to fetch transactions" });
  }
};
