const jwt = require('jsonwebtoken');
require("dotenv").config();

const validateToken = (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  console.log(token);
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = {
  validateToken
};