import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
     profilePic:{
        type: String,
        default: "https://placehold.co/600x400/orange/white?font=montserrat&text=A",
    }
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;