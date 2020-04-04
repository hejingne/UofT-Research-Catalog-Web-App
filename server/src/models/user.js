const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    emailAddress: {
        type: String,
        required: true,
        unique: true,
        trim: true
        // email address validator, commented out since default user's credentials are not email address
        // validate: {
        //     validator: validator.isEmail,
        //     message: "Not valid email"
        // }
    },
    // password's minimum length, commented out since default user's credentials are less than 8
    // password: { type: String, required: true, minlength: 8 },
    password: { type: String, required: true },
    userType: { type: String, required: true }
});

const User = mongoose.model("User", userSchema, "users");

module.exports = User;
