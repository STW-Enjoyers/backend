const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

var userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: "Username can't be empty!",
  },
  email: {
    type: String,
    required: "Email can't be empty!",
    unique: true,
  },
  password: {
    type: String,
    required: "Password can't be empty!",
    minlength: [5, "Password must have at least 5 characters!"],
  },
  saltSecret: String,
});

userSchema.path("email").validate((val) => {
  //Regular expression of an valid mail
  emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(val);
}, "Invalid e-mail.");

//Execute before save
userSchema.pre("save", function (next) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(this.password, salt, (err, hash) => {
      this.password = hash;
      this.saltSecret = salt;
      next();
    });
  });
});

mongoose.model("User", userSchema);
