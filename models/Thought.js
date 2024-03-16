const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");
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
      type: Schema.Types.ObjectId,
      ref: "user",
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
const Thought = model("thought", thoughtSchema);

module.exports = { Thought, thoughtSchema };
