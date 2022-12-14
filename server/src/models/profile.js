const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    emailAddress: { type: String, required: true, unique: true },
    userType: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    description: { type: String },
    interests: { type: [String] },
    profilePicture: { data: Buffer, contentType: String },
    currentEmployer: { type: String },
    currentPosition: { type: String }
});

const Profile = mongoose.model("Profile", profileSchema, "profiles");

module.exports = Profile;
