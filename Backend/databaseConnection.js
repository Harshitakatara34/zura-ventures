const mongoose = require("mongoose");
require("dotenv").config();

const mongoURL = process.env.mongoURL;

const connection = mongoose.connect("mongodb+srv://Harshita:harshita@cluster0.g1zjwi1.mongodb.net/Zura?retryWrites=true&w=majority");

module.exports = { connection };
