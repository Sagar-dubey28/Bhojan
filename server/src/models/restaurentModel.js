import mongoose from "mongoose";

const resturantSchema = mongoose.Schema(
  {
    resturantName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    lat: {
      type: String,
      required: true,
    },
    lon: {
      type: String,
      required: true,
    },
    cuisine: {
      type: String,
      required: true,
    },
    foodType: {
      type: String,
      required: true,
      enum: ["veg", "non-veg", "eggetarian", "jain", "vegan", "any"],
      default: "veg",
    },
    managerName: {
      type: String,
      required: true,
      default: "Manager Name",
    },
    managerPhone: {
      type: String,
      required: true,
      default: "9876543210",
    },
    managerImage: {
      type: {
        imageLink: { type: String, required: true },
        imageId: { type: String, required: true },
      },
      required: true,
    },
    receptionPhone: {
      type: String,
      required: true,
      default: "9876543210",
    },
    email: {
      type: String,
      required: true,
      default: "example@example.com",
    },
    password: {
      type: String,
      required: true,
    },

    images: {
      type: [
        {
          imageLink: { type: String, required: true },
          imageId: { type: String, required: true },
        },
      ],
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["active", "inactive"],
      default: "active",
    },
    openingTime: {
      type: String,
      required: true,
      default: "09:00 AM",
    },
    closingTime: {
      type: String,
      required: true,
      default: "09:00 PM",
    },
    averageCostForTwo: {
      type: Number,
      required: true,
      default: 0,
    },
    openingStatus: {
      type: String,
      required: true,
      enum: ["open", "closed"],
      default: "open",
    },
    resturantType: {
      type: String,
      required: true,
      enum: ["dine-in", "takeaway", "delivery", "all"],
      default: "all",
    },
    GSTNo: {
      type: String,
      required: true,
    },
    FSSAINo: {
      type: String,
      required: true,
    },
    upiId: {
      type: String,
      required: true,
      default: "upiId",
    },
    bankAccNumber: {
      type: String,
      required: true,
      default: "1234567890",
    },
    ifscCode: {
      type: String,
      required: true,
      default: "IFSC0000",
    },
  },
  { timestamps: true }
);

const Resturant = mongoose.model("Resturant", resturantSchema);

export default Resturant;
