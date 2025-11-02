import express from "express";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";
import publicRoutes from "./src/routes/publicRoutes.js";
import restaurantRoutes from "./src/routes/restaurantRoutes.js";  
import paymentRoute from "./src/routes/PaymentRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cloudinary from "./src/config/cloudinary.js";

// import dotenv from "dotenv";
// dotenv.config();

const app = express();

app.use(cors({ origin: ["http://localhost:5173", "https://bhojan-56.netlify.app/"], credentials: true }));

// build in middleware
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/api/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);

app.get("/", (req, res) => {
  res.json({ message: "server Connected" });
});

//Routing
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/public", publicRoutes);
app.use("/restaurant", restaurantRoutes);
app.use("/payment", paymentRoute);

//our made middleware
app.use((err, req, res, next) => {
  const errorMessage = err.message || "Internal Server Error";
  const errorStatus = err.statusCode || 500;

  res.status(errorStatus).json({ message: errorMessage });
});

const port = process.env.PORT || 5000;

//connecting db
app.listen(port, async () => {
  console.log("Server Started at", port);
  connectDB();
  try {
    const res = await cloudinary.api.ping();
    console.log("Cloudinary Connected", res);
  } catch (error) {
    console.error("cloudinary Connection Error", error);
  }
});
