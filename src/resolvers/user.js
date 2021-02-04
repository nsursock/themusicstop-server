const { UserTC } = require("../models/user");
require("../test/user");
require("./auth");
const UserQuery = {
  userById: UserTC.getResolver("findById"),
  userByIds: UserTC.getResolver("findByIds"),
  userOne: UserTC.getResolver("findOne"),
  userMany: UserTC.getResolver("findMany"),
  userCount: UserTC.getResolver("count"),
  userConnection: UserTC.getResolver("connection"),
  userPagination: UserTC.getResolver("pagination"),
  me: UserTC.getResolver("me")
};

const UserMutation = {
  userCreateOne: UserTC.getResolver("createOne"),
  userCreateMany: UserTC.getResolver("createMany"),
  userUpdateById: UserTC.getResolver("updateById"),
  userUpdateOne: UserTC.getResolver("updateOne"),
  userUpdateMany: UserTC.getResolver("updateMany"),
  userRemoveById: UserTC.getResolver("removeById"),
  userRemoveOne: UserTC.getResolver("removeOne"),
  userRemoveMany: UserTC.getResolver("removeMany"),
  fakeDataFaker: UserTC.getResolver("user"),
  fakeDataCasual: UserTC.getResolver("user"),
  signup: UserTC.getResolver("signup"),
  login: UserTC.getResolver("login"),
  changePassword: UserTC.getResolver("changePassword")
};

module.exports = { UserQuery, UserMutation };
