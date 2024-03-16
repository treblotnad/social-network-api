const { Schema, model } = require("mongoose");
const Thought = require("./Thought");

// Schema to create User model
const userSchema = new Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      max_length: 50,
    },
    thoughts: [Thought],
    friends: [this],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const User = model("user", userSchema);

module.exports = User;
