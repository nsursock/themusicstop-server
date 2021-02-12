const mongoose = require("mongoose");
const { composeWithMongoose } = require("graphql-compose-mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    website: String,
    about: String,
    profileImage: String,
    coverImage: String,
    firstName: {
        type: String,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
    },
    gender: String,
    birthday: Date,
    password: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        required: true,
        index: true,
        sparse: true
    },
    country: String,
    address: String,
    city: String,
    state: String,
    zip: String,
    phone: String,

    numLike: Number,
    numLove: Number,
    numHaha: Number,
    numSad: Number,

    publicKey: String,
    privateKey: String
  }
);

module.exports = {
  User: User,
  UserSchema: mongoose.model("users", User),
  UserTC: composeWithMongoose(mongoose.model("users", User)),
};
