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

router.get("/", (req, res) => {
  res.status(200).json({ message: "Restaurant Route Working" });
});




router.post("/menu/add", upload.single("dishImage"), addMenu);


router.get("/menu/:restaurantId", getMenuByRestaurant);


router.get("/menu" , getMenuByRestaurant);


router.put("/menu/update/:id",  upload.single("dishImage"), updateMenu);


router.delete("/menu/delete/:id", deleteMenu);



export default router;
