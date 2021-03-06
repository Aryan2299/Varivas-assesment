const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  followers: {
    type: [mongoose.Types.ObjectId],
    required: true,
  },
  following: {
    type: [mongoose.Types.ObjectId],
    required: true,
  },
});

mongoose.model("users", userSchema);
