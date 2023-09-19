const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"]
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
});

userSchema.index({username: 1})

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel
