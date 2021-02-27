const mongoose = require("mongoose");
const { composeWithMongoose } = require("graphql-compose-mongoose");
//const { User } = require('./user');
const Schema = mongoose.Schema;

const Rating = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    songId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Song',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0, max: 100
    },
    review: String,
  },
  {
    timestamps: true,
  },
);

module.exports = {
  RatingSchema: mongoose.model("ratings", Rating),
  RatingTC: composeWithMongoose(mongoose.model("ratings", Rating)),
  RatingHistSchema: mongoose.model("ratingshist", Rating),
  RatingHistTC: composeWithMongoose(mongoose.model("ratingshist", Rating)),
};
