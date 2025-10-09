import express from "express";
import { AdminLogin,AddRestaurent, GetAllRestaurents } from "../controller/adminController.js";
import multer from "multer";
import { AdminProtect } from "../middleware/userMiddleware.js";

const router = express.Router();

const upload = multer();

router.post("/login", AdminLogin);
router.post(
  "/addRestaurent",
  AdminProtect,
  upload.fields([{ name: "managerImage" }, { name: "restaurantImages" }]),
  AddRestaurent
);

 router.get("/getallresturants", AdminProtect, GetAllRestaurents);



export default router;