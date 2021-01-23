const faker = require("faker");
const { UserTC, UserSchema } = require("../models/user");
const resolver = function () {};
resolver.fakeData = UserTC.addResolver({
  name: "user",
  type: UserTC,
  args: { record: UserTC.getInputType() },
  resolve: async ({ source, args }) => {
    let startDate = new Date(1945, 1, 1);
    let user = new UserSchema({
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      gender: Math.round(Math.random()) === 0 ? 'M' : 'F',
      birthday: new Date(startDate.getTime() + Math.random() * (new Date().getTime() - startDate.getTime())),
      password: faker.internet.password(),
      website: faker.internet.url(),
      about: faker.lorem.words(),
      city: faker.address.city(),
      country: faker.address.country(),
      profileImage: faker.random.image(),
      coverImage: faker.random.image(),
    });
    return await user.save();
  },
});

module.exports = resolver;
