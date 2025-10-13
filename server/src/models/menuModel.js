import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    cuisine: {
      type: String,
      required: true,
    },
    isVeg: {
      type: Boolean,
      default: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    preparationTime: {
      type: Number, // in minutes
      required: true,
    },
    servingSize: {
      type: String,
      required: true,
    },
    dishImage: {
      type: {
        imageLink: { type: String, required: true },
        publicId: { type: String, required: true },
      }
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Menu", menuSchema);