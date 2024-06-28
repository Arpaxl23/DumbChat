const express =require("express");
//const http = require('http')
const dotenv=require("dotenv");
dotenv.config();
const app=express();
const PORT=3000||process.env.PORT;
const authRoute=require("./routes/authroute");
const connectDb = require("./configure/dbConnection");
connectDb();
app.get("/",(req,res)=>{
    res.send("hello");
})
app.use("/api/auth",authRoute);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});


