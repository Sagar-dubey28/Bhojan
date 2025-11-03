import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import Admin from "../models/adminModel.js";
import Resturant from "../models/restaurentModel.js";
import Rider from "../models/riderModel.js";

export const Protect = async (req, res, next) => {
  try {
    // Accept token from Authorization header (Bearer <token>) OR cookie
    const token =
      req.cookies?.BhojanLoginKey || req.headers?.authorization?.split(" ")[1];

    console.log(token);

    if (!token) {
      const error = new Error("Not Authorized, No Token Found");
      error.statusCode = 401;
      throw error;
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decode) {
      const error = new Error("Not Authorized, Invalid Token");
      error.statusCode = 401;
      throw error;
    }

    const verifiedUser = await User.findById(decode.id);

    if (!verifiedUser) {
      const error = new Error("Not Authorized, Invalid User");
      error.statusCode = 401;
      throw error;
    }

    req.user = verifiedUser;
    next();
  } catch (error) {
    next(error);
  }
};

export const ProtectFP = async (req, res, next) => {
  try {
    // Accept token from Authorization header (Bearer <token>) OR cookie (BhojanFp)
    const token =
      req.cookies?.BhojanFp || req.headers?.authorization?.split(" ")[1];

    console.log(token);
    if (!token) {
      const error = new Error("Not Authorized, No Token Found");
      error.statusCode = 401;
      throw error;
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decode) {
      const error = new Error("Not Authorized, Invalid Token");
      error.statusCode = 401;
      throw error;
    }

    const { role } = req.body;
    let verifiedUser;
    if (role === "user") {
      verifiedUser = await User.findOne({ email: decode.email });
    } else if (role === "resturant" || role === "restaurant") {
      verifiedUser = await Resturant.findOne({ email: decode.email });
    } else if (role === "rider") {
      verifiedUser = await Rider.findOne({ email: decode.email });
    }

    if (!verifiedUser) {
      const error = new Error("Not Authorized, Invalid User");
      error.statusCode = 401;
      throw error;
    }

    req.user = verifiedUser;
    next();
  } catch (error) {
    next(error);
  }
};

//Admin protect middleware

export const AdminProtect = async (req, res, next) => {
  try {
    // Accept token from Authorization header (Bearer <token>) OR cookie
    const token =
      req.cookies?.BhojanLoginKey || req.headers?.authorization?.split(" ")[1];

    console.log(token);
    if (!token) {
      const error = new Error("Not Authorized, No Token Found");
      error.statusCode = 401;
      throw error;
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decode) {
      const error = new Error("Not Authorized, Invalid Token");
      error.statusCode = 401;
      throw error;
    }

    const verifiedAdmin = await Admin.findById(decode.id);

    if (!verifiedAdmin) {
      const error = new Error("Not Authorized, Invalid User");
      error.statusCode = 401;
      throw error;
    }

    req.admin = verifiedAdmin;
    next();
  } catch (error) {
    next(error);
  }
};
