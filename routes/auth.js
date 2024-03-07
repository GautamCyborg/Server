const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const app = express();

const controller = require("../controllers/user");
const authController = require("../service/auth");
const { sendOtp, verifyOtp } = require("../controllers/otp");
const validate = require("../service/validate");

const otpmodel = require("../model/otp");
require("dotenv").config();

app.use(express.json());

router.post("/signup", async (req, res) => {
  if (!(await otpmodel.findOne(req.body.verified))) {
    res.json({ Status: "Failed" });
  }

  if (await otpmodel.findOne(req.body.verified)) {
    console.log(req.body.Name);
    const response = await controller.createUser(req);
    await otpmodel.deleteOne(req.body.verified);
    res.json(response);
  }
});

router.post("/login", async (req, res) => {
  const cook = await authController.Login(req, res);
});

router.post("/signout", (req, res) => {
  req.session = null;
  const token = req.headers.authorization.split(" ")[1];
  jwt.destroy(token);
  res.json({ message: "Signed out successfully" });
});

router.post("/send_otp", async (req, res) => {
  const response = await sendOtp(req);
  console.log(response);
  res.send(response);
});

router.post("/verify_otp", async (req, res) => {
  const response = await verifyOtp(req);
  console.log(response);
  res.send(response);
});

router.post("/validate", async (req, res) => {
  const token = req.body.token;
  try {
    await jwt.verify(token, process.env.JWT_SECRET);
     return res.json({ Status: true });
    }
   catch (error) {
    return res.json({ Status: false });
   }
});

module.exports = router;
