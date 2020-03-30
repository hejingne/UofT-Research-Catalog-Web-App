const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const applicationSchema = new Schema({
    researchId: { type: String, required: true },
    researchTitle: { type: String, required: true },
    emailAddress: { type: String, required: true },
    applicantName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    areaOfStudy: { type: String, required: true },
    answers: { type: Object, required: true },
    resume: { data: Buffer, contentType: String },
    transcript: { data: Buffer, contentType: String },
    status: { type: String, required: true } // submitted, under review, offered/refused, confirmed
});

const Application = mongoose.model(
    "Application",
    applicationSchema,
    "applications"
);

module.exports = Application;
