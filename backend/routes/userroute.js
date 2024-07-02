const express =require("express");

const protectRoute=require("../Middlewares/protectRoute.js");

const  {getUsersForSidebar} =require("../controller/userController");

const router = express.Router();

router.get("/",protectRoute,  getUsersForSidebar);

module.exports= router;
