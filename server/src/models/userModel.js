import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    profilePic: {
      type: String,
      required: true,
    },
     photoPublicId: {
      type: String,
    },
      gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "other",
    },
    phone: {
      type: String,
      required: true,
      default: "9876543210",
    },
    dob: {
      type: String,
      required: true,
      default: "01/01/2000",
    },
    foodType: {
      type: String,
      required: true,
      enum: ["veg", "non-veg", "eggetarian", "jain", "vegan", "any"],
      default: "veg",
    },
     role: {
      type: String,
      enum: ["user", "restaurant", "rider"],
      required: true,
    },
     status: {
      type: String,
      enum: ["active", "inactive", "blocked"],
      default: "active",
    },
    Remarks: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
