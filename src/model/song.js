const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { composeWithMongoose } = require("graphql-compose-mongoose");
const SongSchema = new Schema(
  {
    title: String,
    author: [String],
    cover: String,
    tags: [String],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = {
  SongSchema: mongoose.model("songs", SongSchema),
  SongTC: composeWithMongoose(mongoose.model("songs", SongSchema)),
};
