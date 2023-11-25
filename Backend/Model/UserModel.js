const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    default: function () {
      return this.email.split("@")[0]; // Default username is the email
    },
  },
  profilePicture: String,
  projects: [],
});

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
