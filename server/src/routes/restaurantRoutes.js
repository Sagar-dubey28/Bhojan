import express from "express";
import multer from "multer";
import {
  addMenu,
  getMenuByRestaurant,
  updateMenu,
  deleteMenu,
} from "../controller/MenuController.js";


// Configure multer for memory storage
// const storage = multer.memoryStorage();
// const upload = multer({ 
//   storage,
//   limits: {
//     fileSize: 5 * 1024 * 1024, // 5MB limit
//   },
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype.startsWith('image/')) {
//       cb(null, true);
//     } else {
//       cb(new Error('Not an image! Please upload an image.'), false);
//     }
//   }
// });

const upload = multer();

const router = express.Router();

// ✅ Test Route
router.get("/", (req, res) => {
  res.status(200).json({ message: "Restaurant Route Working" });
});

// ================== 🍽 MENU ROUTES ==================

// ➕ Add new menu item for a restaurant
router.post("/menu/add", upload.single("dishImage"), addMenu);

// 📜 Get all menu items of a specific restaurant
router.get("/menu/:restaurantId", getMenuByRestaurant);

// 📜 Get menu items for logged-in restaurant
router.get("/menu" , getMenuByRestaurant);

// ✏️ Update menu item
router.put("/menu/update/:id",  upload.single("dishImage"), updateMenu);

// 🗑️ Delete a menu item
router.delete("/menu/delete/:id", deleteMenu);



export default router;
