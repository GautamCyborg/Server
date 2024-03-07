const express=require('express');
const router=express.Router();
const controller=require("../controllers/user");
const app=express();

app.use(express.json());

router.get("/alluser",async (req,res)=>{
    const Users=await controller.getAllUser(req,res);
    res.send(Users);
});

router.post("/createuser",async (req,res)=>{
     user=await controller.createUser(req,res);
     res.send(user);
});

router.post("/updateuser/:_id",async (req,res)=>{
    await controller.updateUser(req,res); 
});

router.delete("/deleteuser/:Name",async (req,res)=>{
    const user=await controller.deleteUser(req,res);
    res.send(user);
});


module.exports=router;