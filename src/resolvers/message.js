const { MessageTC, MessageSchema } = require("../models/message");
const { UserTC, UserSchema } = require("../models/user");
const { RelationSchema } = require("../models/relation");

MessageTC.addResolver({
  name: "findFriendsPost",
  kind: "query",
  type: [MessageTC],
  args: { id: 'String', type: 'String' },
  resolve: async ({ source, args, context, info }) => {

    let friendsId = [];

    let friendsCol1 = await RelationSchema.
      find().
      where('memberId1').equals(args.id).
      where('status').equals('friend').
      select('memberId2 -_id').
      exec();
    friendsCol1.forEach((item, i) => {
      friendsId.push(item.memberId2);
    });

    let friendsCol2 = await RelationSchema.
      find().
      where('memberId2').equals(args.id).
      where('status').equals('friend').
      select('memberId1 -_id').
      exec();
    friendsCol2.forEach((item, i) => {
      friendsId.push(item.memberId1);
    });

    friendsId.push(args.id);

    if (args.type === 'post')
      return await MessageSchema.
        find().
        where('authorId').in(friendsId).
        where('messageId').equals(null).
        exec();
    else if (args.type === 'comment')
      return await MessageSchema.
        find().
        where('authorId').in(friendsId).
        where('messageId').ne(null).
        exec();
  },
});

MessageTC.addResolver({
  name: "findAuthors",
  kind: "query",
  type: [UserTC],
  args: { authorIds: ['String'] },
  resolve: async ({ source, args, context, info }) => {

    return await UserSchema.
      find().
      where('_id').in(args.authorIds).
      exec();
  }
});

const MessageQuery = {
  messageById: MessageTC.getResolver("findById"),
  messageByIds: MessageTC.getResolver("findByIds"),
  messageOne: MessageTC.getResolver("findOne"),
  messageMany: MessageTC.getResolver("findMany"),
  messageCount: MessageTC.getResolver("count"),
  messageConnection: MessageTC.getResolver("connection"),
  messagePagination: MessageTC.getResolver("pagination"),
  findFriendsPost: MessageTC.getResolver("findFriendsPost"),
  findAuthors: MessageTC.getResolver("findAuthors"),
};

const MessageMutation = {
  messageCreateOne: MessageTC.getResolver("createOne"),
  messageCreateMany: MessageTC.getResolver("createMany"),
  messageUpdateById: MessageTC.getResolver("updateById"),
  messageUpdateOne: MessageTC.getResolver("updateOne"),
  messageUpdateMany: MessageTC.getResolver("updateMany"),
  messageRemoveById: MessageTC.getResolver("removeById"),
  messageRemoveOne: MessageTC.getResolver("removeOne"),
  messageRemoveMany: MessageTC.getResolver("removeMany"),
};

module.exports = { MessageQuery, MessageMutation };
