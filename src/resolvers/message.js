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
    friendsCol1.forEach((item) => {
      friendsId.push(item.memberId2.toString());
    });

    let friendsCol2 = await RelationSchema.
      find().
      where('memberId2').equals(args.id).
      where('status').equals('friend').
      select('memberId1 -_id').
      exec();
    friendsCol2.forEach((item) => {
      friendsId.push(item.memberId1.toString());
    });

    friendsId.push(args.id);

    let response = null;
    if (args.type === 'post')
      response = await MessageSchema.
        find().
        where('authorId').in(friendsId).
        where('messageId').equals(null).
        where('recipientId').equals(null).
        exec();
    else if (args.type === 'comment')
      response = await MessageSchema.
        find().
        where('authorId').in(friendsId).
        where('messageId').ne(null).
        exec();
    else if (args.type === 'email-sent')
      response = await MessageSchema.
        find().
        where('authorId').equals(args.id).
        where('subject').ne(null).
        exec();
    else if (args.type === 'email-received')
      response = await MessageSchema.
        find().
        where('recipientId').equals(args.id).
        where('subject').ne(null).
        exec();
    return response;
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
