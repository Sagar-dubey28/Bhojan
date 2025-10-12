import express from "express";

const router = express.Router();

// Define your restaurant-related routes here
router.get("/", (req, res) => {
  res.status(200).json({ message: "Restaurant Route Working" });
});

export default router;