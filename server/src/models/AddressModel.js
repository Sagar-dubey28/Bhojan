import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  name: { type: String },
  phone: { type: String },
  line1: { type: String },
  city: { type: String },
  pincode: { type: String },
  userEmail: { type: String },
}, { timestamps: true });

const Address = mongoose.model("Address", addressSchema);

export default Address;
