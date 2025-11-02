import express from "express";
import {
  checkout,
  paymentVerification,
  getOrders,
  getTransactions,
} from "../controller/PaymentController.js";

const router = express.Router();

router.get("/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);

router.post("/checkout", checkout);

router.post("/paymentverification", paymentVerification);
router.get("/orders", getOrders);
router.get("/transactions", getTransactions);

export default router;