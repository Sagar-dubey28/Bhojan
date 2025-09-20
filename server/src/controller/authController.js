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
    const hashpassword = await bcrypt.hash(password, 10);
    const profilePic = `https://placehold.co/600x400/EEE/31343C?font=poppins&text=${fullName.charAt(
      0
    )}`;

    const newUser = await User.create({
      fullName,
      email,
      password: hashpassword,
      profilePic,
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
      const error = new Error("All Feilds Required");
      error.statusCode = 404;
      return next(error);
    }

    const findingUser = await User.findOne({ email });

    if (!findingUser) {
      const error = new Error("User not Found ,Please Register");
      error.statusCode = 404;
      return next(error);
    }

    const passwordMatch = await bcrypt.compare(password,findingUser.password);
    if (!passwordMatch) {
      const error = new Error("Invalid userName or password");
      error.statusCode = 401;
      return next(error);
    }
    res
      .status(200)
      .json({
        message: `welcome back, ${findingUser.fullName}`,
        data: {
          fullName: findingUser.fullName,
          email: findingUser.email,
          profilePic: findingUser.profilePic,
        },
      });
  } catch (error) {
    next(error);
  }
};
