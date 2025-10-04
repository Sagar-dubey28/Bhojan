import Admin from "../models/adminModel.js";
import bcrypt from "bcrypt";
import genToken from "../utils/genToken.js";

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