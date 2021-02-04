const mongoose = require("mongoose");
const { composeWithMongoose } = require("graphql-compose-mongoose");
// const User = require('../models/user');
const Schema = mongoose.Schema;

const Relation = new Schema(
  {
    status: {
      type: String,
      required: true,
    },
    memberId1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    memberId2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = {
  RelationSchema: mongoose.model("relations", Relation),
  RelationTC: composeWithMongoose(mongoose.model("relations", Relation)),
};
