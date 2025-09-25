import express from "express";
import {
  registerUser,
  loginUser,
  logout,
  resetPassword,
  sendOtp,
  verifyOtp,
  forgetPassword,
} from "../controller/authController.js";
import { Protect, ProtectFP } from "../middleware/userMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logout);

router.post("/resetPassword", Protect, resetPassword);

router.post("/sendOtp", sendOtp);
router.post("/verifyOtp", verifyOtp);
router.post("/forgetPassword", ProtectFP,forgetPassword);

export default router;
