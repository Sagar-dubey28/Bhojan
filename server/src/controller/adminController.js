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
      const error = new Error("All Fields are Required");
      error.statusCode = 404;
      return next(error);
    }

    // console.log("managerImageFiles:", req.files.managerImage);
    // console.log("restaurantImageFiles:", req.files.restaurantImages);

    const managerImageFile = req.files.managerImage;
    const restaurantImageFiles = req.files.restaurantImages;
    if (!managerImageFile || restaurantImageFiles.length === 0) {
      const error = new Error("All Images are Required");
      error.statusCode = 404;
      return next(error);
    }
    
     
    // Upload Manager Image to Cloudinary
    const M_b64 = Buffer.from(managerImageFile[0].buffer).toString("base64");
    const M_dataURI = `data:${managerImageFile[0].mimetype};base64,${M_b64}`;
    const M_result = await cloudinary.uploader.upload(M_dataURI, {
      folder: `BhojanAdmin/Resturants/${resturantName.trim()}`,
      width: 500,
      height: 500,
      crop: "fill",
    });
    
    
    if (!M_result) {
      const error = new Error("Manager Image Upload Failed");
      error.statusCode = 500;
      return next(error);
    }
    
   

    const managerImage = {
      imageLink: M_result.secure_url,
      imageId: M_result.public_id,
    };
    
    
    const restaurantImages = [];
    // Upload Restaurant Images to Cloudinary
      await restaurantImageFiles.forEach(async (image) => {
      const R_b64 = Buffer.from(image.buffer).toString("base64");
      const R_dataURI = `data:${image.mimetype};base64,${R_b64}`;
      const R_result = await cloudinary.uploader.upload(R_dataURI, {
        folder: `BhojanAdmin/Resturants/${resturantName}`,
        width: 500,
        height: 500,
        crop: "fill",
      });
   
      
      if (!R_result) {
        const error = new Error("Restaurant Image Upload Failed");
        error.statusCode = 500;
        return next(error);
      }
      restaurantImages.push({
        imageLink: R_result.secure_url,
        imageId: R_result.public_id,
      });
      
      
    });
    console.log("yha tkk poch gya hun");
    

    // Create new Resturant
    const newResturant = await Resturant.create({
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
      images:restaurantImages,
    });
    res.status(200).json({
      message: "Add Resturant Route",
      data: newResturant,
    });
    console.log("chl gya hun");
    
  } catch (error) {
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