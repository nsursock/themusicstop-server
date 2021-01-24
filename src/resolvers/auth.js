const { UserTC, UserSchema } = require("../models/user");
//const bcrypt = require('bcrypt')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

const resolver = function () {};

resolver.me = UserTC.addResolver({
  name: "me",
  type: UserTC,
  args: { record: UserTC.getInputType() },
  resolve: async ({ source, args, context }) => {

    console.log(context);
    if (!context.user) {
      throw new Error('You are not authenticated!');
    }
    return await UserSchema.findById(context.user.id);
  }
});

resolver.signup = UserTC.addResolver({
  name: "signup",
  type: 'String',
  args: { record: UserTC.getInputType() },
  resolve: async ({ source, args }) => {

    const user = await UserSchema.create({
      firstName: args.record.firstName,
      lastName: args.record.lastName,
      email: args.record.email,
      //password: await bcrypt.hash(args.record.password, 10)
      password: await argon2.hash(args.record.password)
    });

    let token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1y' }
      );
    return token;
  },
});

resolver.login = UserTC.addResolver({
  name: "login",
  type: 'String',
  args: { record: UserTC.getInputType() },
  resolve: async ({ source, args }) => {

    const user = await UserSchema.findOne({email: args.record.email });
    if (!user) {
      throw new Error('Incorrect email')
    }

    //const valid = await bcrypt.compare(args.record.password, user.password);
    const valid = await argon2.verify(user.password, args.record.password);
    if (!valid) {
      throw new Error('Incorrect password')
    }

    let token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1y' }
      );
    return token;
  },
});

module.exports = resolver;
