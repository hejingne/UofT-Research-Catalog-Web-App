const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const applicationSchema = new Schema({
    post: { type: ObjectId, required: true },
    emailAddress: { type: String, required: true },
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    areaOfStudy: { type: String, required: true },
    answers: { type: Object, required: true },
    resume: { data: Buffer, contentType: String },
    transcript: { data: Buffer, contentType: String }
});

const Application = mongoose.model(
    "Application",
    applicationSchema,
    "applications"
);

module.exports = Application;
