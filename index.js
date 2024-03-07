const express=require("express");
const userRouter=require("./routes/user");
const cors=require('cors');
const loginRouter=require("./routes/auth");
const connect=require("./connection");
const app=express();
const cookieParser =require("cookie-parser");
require("dotenv").config();


app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));

//connection
const url=process.env.MONGO_URL;
const port= process.env.PORT;
connect(url);


//Route
app.use("/user",userRouter);
app.use("/otp",loginRouter);


app.listen(port,(()=>{console.log(`app is listening to port ${port}`)}));