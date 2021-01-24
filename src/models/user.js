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
        //required: true,
    },
    lastName: {
        type: String,
        trim: true,
        //required: true,
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
    },
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
