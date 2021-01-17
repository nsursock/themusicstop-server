const mongoose = require("mongoose");
const { composeWithMongoose } = require("graphql-compose-mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    website: String,
    about: String,
    profileImage: String,
    coverImage: String,
    firstName: String,
    lastName: String,
    gender: String,
    birthday: Date,
    password: String,
    email: String,
    country: String,
    address: String,
    city: String,
    region: String,
    postal: String,
    phone: String,
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = {
  UserSchema: mongoose.model("users", User),
  UserTC: composeWithMongoose(mongoose.model("users", User)),
};
