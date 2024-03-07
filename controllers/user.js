const express=require("express");
const model=require("../model/user");
const app=express();

app.use(express.json());


const createUser= (req)=>{
    model.create(req.body);
    return {"success":true};
};

const getAllUser=async (req,res)=>{
    const allUser=await model.find({});
    return allUser;
};

const updateUser=async (req,res)=>{
    const { _id } = req.params;
    console.log(req.body);
    const { Email,contact,experience,Name,password,role } = req.body;
    //console.log({ Email,contact,experience,_id,Name,password,role });
    const user = await model.findOneAndUpdate({ _id: _id },{ Email,contact,experience,Name,password,role },{ new: true });
    if (!user) {
      return res.status(404).send("User not found");
    }
  
    return user;
};

const deleteUser=async(req,res)=>{
    const Name=req.params;
    console.log(Name);
    await model.deleteOne(Name).then(res=>{console.log(res)});
    return "user deleted";
};

const controller={createUser,getAllUser,updateUser,deleteUser};

module.exports=controller;