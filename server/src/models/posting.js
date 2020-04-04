const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostingSchema = new Schema({
  title: { type: String, required: true },
  term: { type: String, required: true },
  areaOfStudy: { type: String, required: true },
  deadline: { type: String, required: true },
  positions: { type: Number, required: true },
  description: { type: String, required: true }
})
const PostingForResearcherSchema = new Schema({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  index: { type: Number, required: true }, // index of the posting being modified
  postings: [PostingSchema],
  removedPostings: [PostingSchema]
})
const Posting = mongoose.model('Posting', PostingForResearcherSchema, "postings");
module.exports = Posting;
