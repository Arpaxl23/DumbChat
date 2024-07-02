const mongoose =require("mongoose");

const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
        unique:true,
        
    },
    emailId:{
        type:String,
        required:true,
        unique:false
    },
    username:{
        type:String,
        required:false,
        unique:false,
        
    },
    password:{
        type:String,
        required:true,
        unique:false,
    },
    gender:{
        type:String,
        required:true,
        enum:["male","female"]
    },
    profilePic:{
        type:String,
        default:""
    }},{timestamp:true});

const User=mongoose.model("user",userSchema);
module.exports=User;