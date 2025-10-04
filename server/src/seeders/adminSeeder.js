import dotenv from "dotenv";
dotenv.config();

import connectDB from "../config/db.js";
import bcrypt from "bcrypt";
import Admin from "../models/adminModel.js";

const adminSeeder = async () => {
  try {
    await connectDB();
    const adminData = {
      fullName: "Sagar",
      email: "admin_Sagar@bhojan.com",
      password: await bcrypt.hash("SecureAdmin@12345", 10),
    };

    const existingAdmin = await Admin.findOne({ email: adminData.email });
    if (existingAdmin) {
      await Admin.findOneAndDelete({ email: adminData.email });
      console.log("Existing admin deleted");
    }

    await Admin.create(adminData);
    console.log("Admin Seeded Successfully");
    process.exit(1);
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
};

adminSeeder();