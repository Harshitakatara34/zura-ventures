// Middleware for verifying JWT token on protected routes
require("dotenv").config();
const jwt = require("jsonwebtoken");

const secretKey = process.env.secretKey;
const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(400).send({
        msg: "No token found , please provide the token or Log in again",
      });
    }

    const decoded = jwt.verify(token, secretKey);
    req.email = decoded.email;

    next();
  } catch (error) {
    res.status(500).send({
      msg: "Something went wrong in middleware",
      error: error.message,
    });
  }
};

module.exports = { authMiddleware };
