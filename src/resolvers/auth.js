const { UserTC, UserSchema } = require("../models/user");
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')

const resolver = function () {};
resolver.login = UserTC.addResolver({
  name: "user",
  type: UserTC,
  args: { record: UserTC.getInputType() },
  resolve: async ({ source, args }) => {


  },
});

module.exports = resolver;
