const express = require("express");
const { UserModel } = require("../Model/UserModel");
const jwt = require("jsonwebtoken");

const UserRouter = express.Router();

// creating and checking for a user
UserRouter.post("/", async (req, res) => {
  try {
    const { email } = req.body;
    // Check if the user already exists with the provided email
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      const token = jwt.sign({ email }, "harshi", { expiresIn: "8h" });
      res.status(201).send({
        msg: "User already exists",
        token,
        existingUser,
      });
      return;
    }

    // Create a new user if it doesn't exist
    const newUser = await UserModel.create({ email });
    const tokenAtSignup = jwt.sign({ email }, "harshi", { expiresIn: "8h" });
console.log(tokenAtSignup)
    res.status(201).send({
      msg: "New User Created",
      existingUser: newUser,
      token: tokenAtSignup,
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});



module.exports = { UserRouter };
