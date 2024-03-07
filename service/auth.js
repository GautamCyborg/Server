const model = require("../model/user");
const jwt = require("jsonwebtoken");

const Signup = (req, res) => {
  model.create(req.body);
  return req.body;
};

const Login = async (req, res) => {
  try {
    const { Email, password } = req.body;

    const user = await model.findOne({ Email });
    if (!user) {
      return { message: "No user Found" };
    }
    if (user.password == password) {
      jwt.sign(
        { id: user._id },
        "abcdefghijklmnopqrstuvwxyz",
        {},
        (err, token) => {
          if (err) {
            console.error(err);
            return res.status(500).send("Error generating token");
          }
          res.cookie("token", token, { httpOnly: true, secure: true });
          res.status(200).json({ message: "Authentication successful", token });
        }
      );
    }

    if (user.password != password) {
      return { message: "invalid password" };
    }
  } catch (error) {
    return { message: error };
  }
};

const Signout = (req, res) => {
  const cookieName = req.body;
  res.clearCookie(cookieName);
  res.redirect("/");
};

const authCon = { Login, Signup, Signout };
module.exports = authCon;
