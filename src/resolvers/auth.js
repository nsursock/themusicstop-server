const { UserTC, UserSchema } = require("../models/user");
//const bcrypt = require('bcrypt')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

const resolver = function () {};

// resolver.me = UserTC.addResolver({
//   name: "me",
//   type: UserTC,
//   args: { record: UserTC.getInputType() },
//   resolve: async ({ source, args, context }) => {
//
//     console.log(context);
//     if (!context.user) {
//       throw new Error('You are not authenticated!');
//     }
//     return await UserSchema.findById(context.user.id);
//   }
// });

resolver.changePassword = UserTC.addResolver({
  name: "changePassword",
  type: 'String',
  args: { id: 'String', password: 'String' },
  resolve: async ({ source, args }) => {

    const filter = { _id: args.id };
    const update = { password: await argon2.hash(args.password) };
    const user = await UserSchema.updateOne(
      filter, update, function (err, docs) {
        if (err) {
            throw new Error(err);
        }
      });
    return args.id;
  },
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
      userName: args.record.userName,
      //password: await bcrypt.hash(args.record.password, 10)
      password: await argon2.hash(args.record.password),
      birthday: args.record.birthday,
      gender: args.record.gender,
      city: args.record.city,
      country: args.record.country
    });

    let token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1y' }
      );
    return token;
  },
});

resolver.login = UserTC.addResolver({
  name: "login",
  type: 'String',
  args: { username: 'String', password: 'String' },
  resolve: async ({ source, args }) => {

    const user = await UserSchema.findOne({userName: args.username });
    if (!user) {
      throw new Error('Incorrect username')
    }

    //const valid = await bcrypt.compare(args.record.password, user.password);
    const valid = await argon2.verify(user.password, args.password);
    if (!valid) {
      throw new Error('Incorrect password')
    }

    let token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
    return token;
  },
});

module.exports = resolver;
