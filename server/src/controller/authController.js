import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import genToken from "../utils/genToken.js";
import OTP from "../models/otpModel.js";
import sendEmail from "../utils/sendEmail.js";
import { genForgetPassToken } from "../utils/genForgetPassToken.js";
import Rider from "../models/riderModel.js";
import Resturant from "../models/restaurentModel.js";

export const registerUser = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      const error = new Error("All Feilds Required");
      error.statusCode = 404;
      return next(error);
    }
    const exitingUser = await User.findOne({ email });
    if (exitingUser) {
      const error = new Error("You are Already exist");
      error.statusCode = 500;
      return next(error);
    }
    const hashpassword = await bcrypt.hash(password, 10);
    const fullNameUpperCase = fullName.charAt(0).toUpperCase();
    const profilePic = `https://placehold.co/600x400/EEE/31343C?font=poppins&text=${fullNameUpperCase}`;

    const newUser = await User.create({
      fullName,
      email,
      password: hashpassword,
      profilePic,
      role: "user",
    });

    res.status(200).json({ message: "User Created Sucessfully" });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("All fields are required");
      error.statusCode = 400;
      return next(error);
    }

    const findingUser = await User.findOne({ email: email.toLowerCase() });

    if (!findingUser) {
      const error = new Error("User not found. Please register first.");
      error.statusCode = 404;
      return next(error);
    }

    const passwordMatch = await bcrypt.compare(password, findingUser.password);
    if (!passwordMatch) {
      const error = new Error("Invalid email or password");
      error.statusCode = 401;
      return next(error);
    }

    // Generate token
    if (!genToken(findingUser._id, res)) {
      const error = new Error("Unable to login");
      error.statusCode = 403;
      return next(error);
    }

    // Prepare data
    const responseData = {
      fullName: findingUser.fullName,
      email: findingUser.email,
      profilePic: findingUser.profilePic,
      gender: findingUser.gender,
      dob: findingUser.dob,
      phone: findingUser.phone,
      foodType: findingUser.foodType,
      role: findingUser.role,
    };

    res.status(200).json({
      message: `Welcome back, ${findingUser.fullName}`,
      data: responseData,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res, next) => {
  try {
    res.clearCookie("BhojanLoginKey");
    res.status(200).json({ message: "Logout Successfully" });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const currentUser = req.user;
    if (!currentPassword || !newPassword) {
      const error = new Error("All Fields Required");
      error.statusCode = 404;
      return next(error);
    }

    const isVerified = await bcrypt.compare(
      currentPassword,
      currentUser.password
    );
    if (!isVerified) {
      const error = new Error("Current Password is Incorrect");
      error.statusCode = 401;
      return next(error);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    currentUser.password = hashedPassword;
    await currentUser.save();

    res.status(200).json({ message: "Password Reset Successful" });
  } catch (error) {
    next(error);
  }
};

export const sendOtp = async (req, res, next) => {
  try {
    const { email } = req.body;
    const findingUser = await User.findOne({ email });
    if (!findingUser) {
      const error = new Error("User Not found, Please register");
      error.statusCode = 404;
      return next(error);
    }
    const otpPresent = await OTP.findOne({ email });
    if (otpPresent) {
      await otpPresent.deleteOne({ email });
    }

    const otp = Math.floor(Math.random() * 9000000 + 100000);
    const message = `  <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; background: #f7f7f7; padding: 20px; }
            .container { background: #fff; border-radius: 8px; padding: 24px; max-width: 400px; margin: auto; box-shadow: 0 2px 8px rgba(0,0,0,0.05);}
            .otp { font-size: 2em; color: #e63946; letter-spacing: 4px; margin: 16px 0; }
            .title { font-size: 1.2em; color: #222; margin-bottom: 8px; }
            .footer { font-size: 0.9em; color: #888; margin-top: 24px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="title">Your Bhojan App OTP Code</div>
            <p>Dear ${findingUser.fullName},</p>
            <p>Use the following One-Time Password (OTP) to verify your email address:</p>
            <div class="otp">${otp}</div>
            <p>This OTP is valid for 10 minutes. Please do not share it with anyone.</p>
            <div class="footer">If you did not request this, please ignore this email.</div>
          </div>
        </body>
      </html>`;

    const emailStatus = await sendEmail(email, "OTP for verification", message);

    const hashOtp = await bcrypt.hash(otp.toString(), 10);

    await OTP.create({
      email,
      otp: hashOtp,
    });

    if (emailStatus) {
      res.status(200).json({ mesage: "OTp sent Successfully on Email" });
    } else {
      res.status(404).json({ message: "Unable To sent OTP" });
    }
  } catch (error) {
    next(error);
  }
};
export const verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const otpIsAvailable = await OTP.findOne({ email });

    if (!otpIsAvailable) {
      const error = new Error("OTP expired. Try Again");
      error.statusCode = 401;
      return next(error);
    }

    const otpValid = await bcrypt.compare(otp.toString(), otpIsAvailable.otp);

    if (!otpValid) {
      const error = new Error("Invalid OTP. Try Again");
      error.statusCode = 401;
      return next(error);
    }

    if (!genForgetPassToken(email, res)) {
      const error = new Error("Unable to Complete the Process");
      error.statusCode = 403;
      return next(error);
    }
    await OTP.deleteOne({ email });
    res.status(200).json({ message: "Otp Verification successfull" });
  } catch (error) {
    next(error);
  }
};
export const forgetPassword = async (req, res, next) => {
  try {
    const { newPassword } = req.body;
    console.log("NewPasword", newPassword);

    const currentUser = req.user;
    console.log("CurrentUser", currentUser);

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    currentUser.password = hashedPassword;
    await currentUser.save();
    console.log("NewCurrentUser", currentUser);

    console.log("save ho gya hun.");

    res.clearCookie("BhojanFp");
    res.status(200).json({ message: "Password Change Successful" });
  } catch (error) {
    next(error);
  }
};

export const RestaurantLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const error = new Error("Email and Password are required");
      error.statusCode = 400;
      return next(error);
    }
    const existingResturant = await Resturant.findOne({ email });
    if (!existingResturant) {
      const error = new Error("Resturant not found");
      error.statusCode = 404;
      return next(error);
    }

    const isVerified = await bcrypt.compare(
      password,
      existingResturant.password
    );
    if (!isVerified) {
      const error = new Error("Invalid Password");
      error.statusCode = 401;
      return next(error);
    }

    // Create response data with role
    const responseData = {
      ...existingResturant.toObject(),
      role: "restaurant"
    };

    if (!genToken(existingResturant._id, res)) {
      const error = new Error("Unable to Login");
      error.statusCode = 403;
      return next(error);
    }

    res.status(200).json({
      message: "Restaurant Logged In Successfully",
      data: responseData
    });
  } catch (error) {
    next(error);
  }
};

export const RiderLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const error = new Error("Email and Password are required");
      error.statusCode = 400;
      return next(error);
    }
    const existingRider = await Rider.findOne({ email });
    if (!existingRider) {
      const error = new Error("Rider not found");
      error.statusCode = 404;
      return next(error);
    }
    const isVerified = await bcrypt.compare(password, existingRider.password);
    if (!isVerified) {
      const error = new Error("Invalid Password");
      error.statusCode = 401;
      return next(error);
    }
    if (!genToken(existingRider._id, res)) {
      const error = new Error("Unable to Login");
      error.statusCode = 403;
      return next(error);
    }

    existingRider.role = "rider";
    res.status(200).json({
      message: "Rider Logged In Successfully",
      data: existingRider,
    });
  } catch (error) {
    next(error);
  }
};
