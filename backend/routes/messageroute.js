const express=require("express");

const {sendmessage,getMessage}=require("../controller/messageController");
const protectRoute = require("../Middlewares/protectRoute");

const router=express.Router();

router.get("/:id",protectRoute,getMessage);
router.post("/send/:id",protectRoute,sendmessage);

module.exports=router;