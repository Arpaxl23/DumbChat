const express =require("express");
const dotenv=require("dotenv");
const cookieParser=require("cookie-parser");
const path=require("path");
const{app,server}=require("./socket/socket");
dotenv.config();
const connectDb = require("./configure/dbConnection");
connectDb();

const errorHandler = require("./Middlewares/errorhandler");
const port=4000||process.env.PORT;
const cors=require("cors");


app.use(express.json());


const authRoute=require("./routes/authroute");
const messageRoute=require("./routes/messageroute");
const userRoute=require("./routes/userroute");
app.use(express.json()); 
app.use(cookieParser());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});



app.use("/api/auth",authRoute);
app.use("/api/messages",messageRoute);
app.use("/api/users",userRoute);

app.use(express.static(path.join(__dirname, "/frontend/dist")));


app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.use(errorHandler);
server.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});


