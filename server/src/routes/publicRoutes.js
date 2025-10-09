import express from "express";
import { getAllRestaurents } from "../controller/publicController.js";

const router = express.Router();

router.get("/getAllRestaurents", getAllRestaurents)

export default router;