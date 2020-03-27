const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: { type: String, required: true },
    introduction: { type: String, required: true },
    researcher: { type: String, required: true },
    deadline: { type: String, required: true },
    duration: { type: String, required: true },
    areaOfStudy: { type: String, required: true },
    postDate: { type: Date, required: true }
});

const Post = mongoose.model("Post", postSchema, "posts");

module.exports = Post;
