const faker = require("faker");
const argon2 = require('argon2')
const { UserTC, UserSchema } = require("../models/user");

const resolver = function () {};
resolver.fakeData = UserTC.addResolver({
  name: "user",
  type: UserTC,
//  args: { record: UserTC.getInputType() },
  resolve: async ({ source, args }) => {
    let startDate = new Date(1945, 1, 1);
    let email = faker.internet.email();
    let user = new UserSchema({
      email: email,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      gender: Math.round(Math.random()) === 0 ? 'M' : 'F',
      birthday: new Date(startDate.getTime() + Math.random() * (new Date().getTime() - startDate.getTime())),
      password: await argon2.hash(email), //faker.internet.password(),
      website: faker.internet.url(),
      about: faker.lorem.sentences(),
      city: faker.address.city(),
      country: faker.address.country(),
      profileImage: faker.random.image(),
      coverImage: faker.random.image()
    });
    return await user.save();
  },
});

module.exports = resolver;
