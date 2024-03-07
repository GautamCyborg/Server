const nodemailer = require("nodemailer");
const crypto = require('crypto');
const OTP = require('../model/otp');
require("dotenv").config();

const generateOTP=()=>{
  return crypto.randomBytes(20).toString('hex').slice(0, 6);
};

const sendOtp=async (req) => {
try{
  const email = req.body.Email;
  const otpValue = generateOTP();
  const expiration = new Date(Date.now() + 300000); // expires in 5 minutes

  // Save the OTP to the database
  const otp = new OTP({ email, otp: otpValue, expiration,verified: false });
  await otp.save();

  const transporter = nodemailer.createTransport({
    service:'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secureConnection: 'false',
    auth: {
        user: process.env.USER,
        pass: process.env.APP_PASSWORD
    }// },
    // tls:{
    //   ciphers:'SSLv3'
    // }
  });

  
  const message = {
    from: {
      name: "Gautam Singh Jadon",
      address:  process.env.USER,
    },
    to: `${email}`,
    subject: 'Nodemailer is unicode friendly ✔',
    text: `Your otp valid for 15min is ${otpValue}`,
    html: `<p><b>This is your Otp valid for 15min</b></p>${otpValue}`
  };

    const info=await transporter.sendMail(message,);
    return 'Message sent: %s', info;
  }
    
catch(error){
    console.error(error);
    return { success: false, error: 'Failed to send OTP' };
  }
};

const verifyOtp=async (req)=>{
  const otp=req.body.otp;
  const mail=req.body.Email;
  const data=await OTP.findOne({email:mail});
  const sentotp=data.otp;
  
  if(otp==sentotp){
    await OTP.findOneAndUpdate({ email: mail },{ $set: {verified: true}  });
    return {success:true,msg:"OTP verified"};
  }
  return {success:false,error:"Wrong Otp"};
};



module.exports = { sendOtp ,verifyOtp};


