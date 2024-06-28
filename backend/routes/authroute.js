const express=require("express");
const router=express.Router();
const {login,logout,signup}=require('../controller/authcontroller')
router.get("/signup",signup);
router.get("/login",login);
router.get("/logout",logout);

module.exports=router;