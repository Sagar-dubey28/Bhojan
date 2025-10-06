import express from "express";
import { updateUser } from "../controller/userController.js";
import multer from "multer";
import { Protect } from "../middleware/userMiddleware.js";

const router = express.Router();

const upload = multer();

router.put("/updateUser", Protect, upload.single("profilePic"), updateUser);

export default router;
