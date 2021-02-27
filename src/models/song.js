const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { composeWithMongoose } = require("graphql-compose-mongoose");
const SongSchema = new Schema(
  {
    title: String,
    artist: String,
    album: String,
    genre: String,
    releaseDate: Date,
    time: Number,
    trackNumber: Number,
    label: String,
    songId: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        required: true,
        index: true,
        sparse: true
    },
  },
  {
    timestamps: true,
  }
);

module.exports = {
  SongSchema: mongoose.model("songs", SongSchema),
  SongTC: composeWithMongoose(mongoose.model("songs", SongSchema)),
};
