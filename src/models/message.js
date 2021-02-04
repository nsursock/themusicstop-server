const mongoose = require("mongoose");
const { composeWithMongoose } = require("graphql-compose-mongoose");
// const User = require('../models/user');
const Schema = mongoose.Schema;

const Message = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    publishedAt: {
      type: Date,
      required: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    messageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
      default: null,
    },
    numLike: Number,
    numLove: Number,
    numHaha: Number,
    numSad: Number
  },
  {
    timestamps: true,
  },
);

module.exports = {
  MessageSchema: mongoose.model("messages", Message),
  MessageTC: composeWithMongoose(mongoose.model("messages", Message)),
};
