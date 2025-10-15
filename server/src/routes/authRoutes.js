import express from "express";
import {
  registerUser,
  loginUser,
  logout,
  resetPassword,
  sendOtp,
  verifyOtp,
  forgetPassword,
  RestaurantLogin,
  RiderLogin,
} from "../controller/authController.js";
import { Protect, ProtectFP } from "../middleware/userMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/user/login", loginUser);
router.post("/restaurant/login", RestaurantLogin);
router.post("/rider/login", RiderLogin);
router.post("/logout", logout);

router.post("/resetPassword", Protect, resetPassword);

router.post("/sendOtp", sendOtp);
router.post("/verifyOtp", verifyOtp);
router.post("/forgetPassword", ProtectFP,forgetPassword);

export default router;
