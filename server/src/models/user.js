const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    emailAddress: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator: validator.isEmail,
            message: "Not valid email"
        }
    },
    password: { type: String, required: true, minlength: 8 },
    userType: { type: String, required: true }
});

const User = mongoose.model("User", userSchema, "users");

module.exports = User;
