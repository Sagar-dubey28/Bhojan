import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";


dotenv.config();

const app = express();

app.get("/",(req,res)=>{
    res.json({message: "server Connected"})
})

const port = process.env.PORT || 5000;

//connecting db
app.listen(port,async()=>{
    console.log("Server Started at", port);
    connectDB();
    
})