const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");
// const { User } = require("./User");
// Schema to create a thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    userName: {
      type: String,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});
// thoughtSchema.get(function())
const Thought = model("thought", thoughtSchema);

module.exports = Thought;
