import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js"
import cors from "cors";


dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:5173" , credentials:true}));

// build in middleware
app.use(express.json());


app.get("/",(req,res)=>{
    res.json({message: "server Connected"})
})

//Routing
app.use("/api/auth", authRoutes);


const port = process.env.PORT || 5000;

//connecting db
app.listen(port,async()=>{
    console.log("Server Started at", port);
    connectDB();
    
})