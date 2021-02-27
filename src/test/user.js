const faker = require("faker");
var casual = require('casual');
const fetch = require("node-fetch");
const argon2 = require('argon2')
const { UserTC, UserSchema } = require("../models/user");
const resolver = function () {};

resolver.fakeDataFaker = UserTC.addResolver({
  name: "user",
  type: UserTC,
//  args: { record: UserTC.getInputType() },
  resolve: async ({ source, args }) => {
    let startDate = new Date(1945, 1, 1);
    let limitDate = new Date(2002, 1, 1);
    let email = faker.internet.email();
    let user = new UserSchema({
      email: email,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      gender: Math.round(Math.random()) === 0 ? 'M' : 'F',
      birthday: new Date(startDate.getTime() + Math.random() * (limitDate.getTime() - startDate.getTime())),
      password: await argon2.hash('email'), //faker.internet.password(),
      website: faker.internet.url(),
      about: faker.lorem.sentences(),
      city: faker.address.city(),
      country: faker.address.country(),
      profileImage: 'http://source.unsplash.com/600x600/?portrait', //faker.random.image(),
      coverImage: 'http://source.unsplash.com/1920x1280/?landscape' //faker.random.image()
    });
    return await user.save();
  },
});

resolver.fakeDataCasual = UserTC.addResolver({
  name: "user",
  type: UserTC,
//  args: { record: UserTC.getInputType() },
  resolve: async ({ source, args }) => {
    let startDate = new Date(1945, 1, 1);
    let limitDate = new Date(2002, 1, 1);
    let email = casual.email;

    let r1 = await fetch(`http://source.unsplash.com/600x600/?portrait`);
    let r2 = await fetch(`http://source.unsplash.com/1920x1280/?landscape`);

    let user = new UserSchema({
      email: email,
      userName: casual.username,
      firstName: casual.first_name,
      lastName: casual.last_name,
      gender: casual.coin_flip ? 'M' : 'F',
      birthday: new Date(startDate.getTime() + Math.random() * (limitDate.getTime() - startDate.getTime())),
      password: await argon2.hash('a'), //faker.internet.password(),
      website: casual.url,
      about: casual.text,
      city: casual.city,
      country: casual.country,
      address: casual.address,
      state: casual.state,
      zip: casual.zip,
      phone: casual.phone,
      profileImage: r1.url + '&fit=facearea&facepad=3.5', //faker.random.image(),
      coverImage: r2.url //faker.random.image()
    });
    return await user.save();
  },
});

module.exports = resolver;
