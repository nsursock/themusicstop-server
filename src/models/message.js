const mongoose = require("mongoose");
const { composeWithMongoose } = require("graphql-compose-mongoose");
//const { User } = require('./user');
const Schema = mongoose.Schema;

const Message = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: false,
      default: null
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
    recipientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
      default: null
    },
    messageId: { // relatedId #todo
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
      default: null,
    },
    flagged: {
      type: Boolean,
      default: false,
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
