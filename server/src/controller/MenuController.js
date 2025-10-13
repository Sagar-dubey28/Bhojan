import Menu from "../models/menuModel.js";
import Restaurant from "../models/restaurentModel.js";
import cloudinary from "../config/cloudinary.js";

// ✅ Add a new menu item
export const addMenu = async (req, res) => {
  try {
 
 
    const { restaurantId, name, description, price, category, cuisine, isVeg, preparationTime, servingSize } = req.body;

    // Check if restaurant exists
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    // Handle image upload to Cloudinary
    let dishImage = null;
    if (req.file) {
      const buffer = req.file.buffer;
      const b64 = Buffer.from(buffer).toString("base64");
      const dataURI = `data:${req.file.mimetype};base64,${b64}`;
      
      const result = await cloudinary.uploader.upload(dataURI, {
        folder: `BhojanAdmin/restaurant_menu`,
      });

      dishImage = {
        imageLink: result.secure_url,
        publicId: result.public_id,
      };
    }
    
    
    
    const newMenu = await Menu.create({
      restaurantId,
      name,
      description,
      price,
      category,
      cuisine,
      isVeg,
      preparationTime,
      servingSize,
      dishImage
    });

    res.status(201).json({ success: true, message: "Menu added successfully", menu: newMenu });
  } catch (error) {
    console.error("Error adding menu:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message || "Error adding menu item"
    });
    res.status(500).json({ message: "Server error while adding menu" });
  }
};

// ✅ Get all menu items of a restaurant
export const getMenuByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const menu = await Menu.find({ restaurantId });
    res.status(200).json({ success: true, menu });
  } catch (error) {
    console.error("Error fetching menu:", error);
    res.status(500).json({ message: "Server error while fetching menu" });
  }
};

// ✅ Update menu item (for availability or details)
export const updateMenu = async (req, res) => {
  try {
    const { id } = req.params; // menu item id
    const updates = req.body;  // can include isAvailable or any other field

    // Find the current menu item to get the old image publicId
    const currentMenu = await Menu.findById(id);
    if (!currentMenu) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    // Handle image update if a new file is uploaded
    if (req.file) {
      // Delete old image from Cloudinary if it exists
      if (currentMenu.dishImage?.publicId) {
        await cloudinary.uploader.destroy(currentMenu.dishImage.publicId);
      }

      // Upload new image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "restaurant_menu",
      });
      updates.dishImage = {
        imageLink: result.secure_url,
        publicId: result.public_id,
      };
    }

    const updatedMenu = await Menu.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedMenu) return res.status(404).json({ message: "Menu item not found" });

    res.status(200).json({ success: true, message: "Menu updated successfully", menu: updatedMenu });
  } catch (error) {
    console.error("Error updating menu:", error);
    res.status(500).json({ message: "Server error while updating menu" });
  }
};

// ✅ Delete menu item
export const deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;
    
    // First find the menu item to get the image publicId
    const menuToDelete = await Menu.findById(id);
    if (!menuToDelete) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    // Delete image from Cloudinary if it exists
    if (menuToDelete.dishImage?.publicId) {
      await cloudinary.uploader.destroy(menuToDelete.dishImage.publicId);
    }

    // Now delete the menu item
    await Menu.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Menu deleted successfully" });
  } catch (error) {
    console.error("Error deleting menu:", error);
    res.status(500).json({ message: "Server error while deleting menu" });
  }
};
