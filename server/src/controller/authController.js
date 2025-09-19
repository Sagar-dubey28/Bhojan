import User from "../models/userModel.js";
import bcrypt from "bcrypt";

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
      const error = new error("You are Already exist");
      const errorStatus = 500;
      return next(error);
    }
    //const hashpassword = bcrypt.hash(password,10);//

    const newUser = await User.create({ fullName, email, password });

    res.status(200).json({ message: "User Created Sucessfully" });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("All Feilds Required");
      error.statusCode = 404;
      return next(error);
    }

    const findingUser = await User.findOne({ email });

    if (findingUser) {
      if (password === findingUser.password) {
        res.status(200).json({ message: "You Login succesfully" });
      } else {
        res.status(500).json({ message: "password not match" });
      }
    } else {
      res.status(500).json({ message: "You don't have account" });
    }
  } catch (error) {
    next(error);
  }
};
