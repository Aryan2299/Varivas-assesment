const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.ObjectId,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

mongoose.model("posts", postSchema);
