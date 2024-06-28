const mongoose =require("mongoose");

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        
    },name:{
        type:String,
        required:false,
        unique:false,
        
    },
    email:{
        type:String,
        required:true,
        unique:true,
        
    },
    password:{
        type:String,
        required:true,
        unique:false,
    }},{timestamp:false});