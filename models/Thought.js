//Import libraries
const dayjs = require("dayjs");
const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

// Define thoughtSchema
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
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    // Import reactions
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
      // Format date to timestamp using Day.js
      transform: function (data, time) {
        time.createdAt = dayjs(time.createdAt).format("MM/DD/YYYY hh:mm:ss A");
        return time;
      },
    },
    id: false,
  }
);

// Virtual to get reactions count
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
