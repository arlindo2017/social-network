// Import Libraries
const dayjs = require("dayjs");
const { Schema, Types } = require("mongoose");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
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

module.exports = reactionSchema;
