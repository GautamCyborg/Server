const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
    Name:String,
    Email:String,
    contact:{type:Number,default:'0000000000'},
    experience:{type:Number,default:'0'},
    password:String,
    Verification_status:{type:Boolean,default:true},
    role:{ type: String, default: "user" },
});

const userModel=new mongoose.model("Usermgmt",userSchema);

module.exports=userModel;
