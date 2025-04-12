const express = require("express");
const connectDB = require("./config/db.js");
const cors = require("cors");
const app = express();
const userRoutes = require("./routes/userRoutes.js")
const dotenv = require("dotenv");
dotenv.config();


connectDB();
app.use(cors({
    origin:"http://localhost:4200",
    credentials:true,   
}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/users",userRoutes);

app.listen(3000,()=>{console.log("server is running at 3000")})