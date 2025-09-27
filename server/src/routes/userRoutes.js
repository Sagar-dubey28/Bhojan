import express from "express";
import { updateUser } from "../controller/userController.js";

const router = express.Router();

router.get("/updateUser", updateUser)

export default router;