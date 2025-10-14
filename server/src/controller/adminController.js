import Admin from "../models/adminModel.js";
import bcrypt from "bcrypt";
import genToken from "../utils/genToken.js";
import cloudinary from "../config/cloudinary.js";
import Resturant from "../models/restaurentModel.js"


export const AdminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const error = new Error("Email and Password are required");
      error.statusCode = 400;
      return next(error);
    }
    const admin = await Admin.findOne({ email });
    if (!admin) {
      const error = new Error("Admin not found");
      error.statusCode = 404;
      return next(error);
    }

    const isVerified = await bcrypt.compare(password, admin.password);
    if (!isVerified) {
      const error = new Error("Invalid Password");
      error.statusCode = 401;
      return next(error);
    }

    if (!genToken(admin._id, res)) {
      const error = new Error("Unable to Login");
      error.statusCode = 403;
      return next(error);
    }

    res.status(200).json({
      message: "Admin Logged In Successfully",
      admin: {
        fullName: admin.fullName,
        email: admin.email,
        profilePic: admin.profilePic,
        role: "admin",
      },
    });
  } catch (error) {
    next(error);
  }
};

export const AddRestaurent = async (req, res, next) => {
  try {
    const {
      resturantName,
      address,
      lat,
      lon,
      cuisine,
      foodType,
      managerName,
      managerPhone,
      receptionPhone,
      email,
      password,
      status,
      openingTime,
      closingTime,
      averageCostForTwo,
      openingStatus,
      resturantType,
      GSTNo,
      FSSAINo,
      upiId,
      bankAccNumber,
      ifscCode,
    } = req.body;

    // ✅ Field validation
    if (
      !resturantName ||
      !address ||
      !lat ||
      !lon ||
      !cuisine ||
      !foodType ||
      !managerName ||
      !managerPhone ||
      !receptionPhone ||
      !email ||
      !password ||
      !status ||
      !openingTime ||
      !closingTime ||
      !averageCostForTwo ||
      !openingStatus ||
      !resturantType ||
      !GSTNo ||
      !FSSAINo ||
      !upiId ||
      !bankAccNumber ||
      !ifscCode
    ) {
      return next(new Error("All fields are required"));
    }

    const managerImageFile = req.files.managerImage;
    const restaurantImageFiles = req.files.restaurantImages;

    if (!managerImageFile || restaurantImageFiles.length === 0) {
      return next(new Error("All images are required"));
    }

    // ✅ Upload Manager Image to Cloudinary
    const M_b64 = Buffer.from(managerImageFile[0].buffer).toString("base64");
    const M_dataURI = `data:${managerImageFile[0].mimetype};base64,${M_b64}`;
    const M_result = await cloudinary.uploader.upload(M_dataURI, {
      folder: `BhojanAdmin/Restaurants/${resturantName.trim()}`,
      width: 500,
      height: 500,
      crop: "fill",
    });

    const managerImage = {
      imageLink: M_result.secure_url,
      imageId: M_result.public_id,
    };

    // ✅ Upload Restaurant Images (wait for all)
    const uploadPromises = restaurantImageFiles.map(async (image) => {
      const R_b64 = Buffer.from(image.buffer).toString("base64");
      const R_dataURI = `data:${image.mimetype};base64,${R_b64}`;
      const R_result = await cloudinary.uploader.upload(R_dataURI, {
        folder: `BhojanAdmin/Restaurants/${resturantName.trim()}`,
        width: 500,
        height: 500,
        crop: "fill",
      });

      return {
        imageLink: R_result.secure_url,
        imageId: R_result.public_id,
      };
    });

    // ✅ Wait for all uploads to complete
    const restaurantImages = await Promise.all(uploadPromises);

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create new restaurant
    const newRestaurant = await Resturant.create({
      resturantName,
      address,
      lat,
      lon,
      cuisine,
      foodType,
      managerName,
      managerPhone,
      receptionPhone,
      email,
      password: hashedPassword,
      status,
      openingTime,
      closingTime,
      averageCostForTwo,
      openingStatus,
      resturantType,
      GSTNo,
      FSSAINo,
      upiId,
      bankAccNumber,
      ifscCode,
      managerImage,
      images: restaurantImages,
    });

    res.status(201).json({
      success: true,
      message: "Restaurant added successfully ✅",
      data: newRestaurant,
    });

  } catch (error) {
    console.error("❌ AddRestaurant Error:", error);
    next(error);
  }
};


export const GetAllRestaurents = async (req, res, next) => {
  try {
    const resturants = await Resturant.find().sort({ createdAt: -1 });
 
    if (!resturants || resturants.length === 0) {
      const error = new Error("No Resturants Found");
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json({
      message: "All Restaurants Fetched Successfully",
      data: resturants,
    });
  } catch (error) {
    next(error);
  }
};

export const DeleteRestaurant = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate id
    if (!id) {
      const error = new Error("Restaurant ID is required");
      error.statusCode = 400;
      return next(error);
    }

    // Find restaurant first to get image IDs
    const restaurant = await Resturant.findById(id);
    
    if (!restaurant) {
      const error = new Error("Restaurant not found");
      error.statusCode = 404;
      return next(error);
    }

    // Delete manager image from Cloudinary
    if (restaurant.managerImage && restaurant.managerImage.imageId) {
      try {
        await cloudinary.uploader.destroy(restaurant.managerImage.imageId);
      } catch (error) {
        console.error('Error deleting manager image:', error);
        // Continue with deletion even if image deletion fails
      }
    }

    // Delete restaurant images from Cloudinary
    if (restaurant.images && restaurant.images.length > 0) {
      try {
        const deletePromises = restaurant.images.map(image => 
          cloudinary.uploader.destroy(image.imageId)
        );
        await Promise.all(deletePromises);
      } catch (error) {
        console.error('Error deleting restaurant images:', error);
        // Continue with deletion even if image deletion fails
      }
    }

    // Delete restaurant from database
    await Resturant.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Restaurant deleted successfully"
    });

  } catch (error) {
    console.error('Delete restaurant error:', error);
    const serverError = new Error(error.message || "Internal Server Error");
    serverError.statusCode = error.statusCode || 500;
    next(serverError);
  }
};