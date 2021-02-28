const { RatingHistTC, RatingHistSchema } = require("../models/rating");
const { RelationSchema } = require("../models/relation");
const { SongTC, SongSchema } = require("../models/song");

RatingHistTC.addResolver({
  name: "findSongs",
  kind: "query",
  type: [SongTC],
  args: { songIds: ['String'] },
  resolve: async ({ source, args, context, info }) => {

    return await SongSchema.
      find().
      where('_id').in(args.songIds).
      exec();
  }
});

RatingHistTC.addResolver({
  name: "findFriendsRating",
  kind: "query",
  type: [RatingHistTC],
  args: { id: 'String' },
  resolve: async ({ source, args, context, info }) => {

    // get friends' list
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

    // get ratings by friends
    return await RatingHistSchema.
      find().
      where('userId').in(friendsId).
      exec();
  }
});

const RatingHistQuery = {
  ratingHistById: RatingHistTC.getResolver("findById"),
  ratingHistByIds: RatingHistTC.getResolver("findByIds"),
  ratingHistOne: RatingHistTC.getResolver("findOne"),
  ratingHistMany: RatingHistTC.getResolver("findMany"),
  ratingHistCount: RatingHistTC.getResolver("count"),
  ratingHistConnection: RatingHistTC.getResolver("connection"),
  ratingHistPagination: RatingHistTC.getResolver("pagination"),
  findFriendsRating: RatingHistTC.getResolver("findFriendsRating"),
  findSongs: RatingHistTC.getResolver("findSongs"),
};

const RatingHistMutation = {
  ratingHistCreateOne: RatingHistTC.getResolver("createOne"),
  ratingHistCreateMany: RatingHistTC.getResolver("createMany"),
  ratingHistUpdateById: RatingHistTC.getResolver("updateById"),
  ratingHistUpdateOne: RatingHistTC.getResolver("updateOne"),
  ratingHistUpdateMany: RatingHistTC.getResolver("updateMany"),
  ratingHistRemoveById: RatingHistTC.getResolver("removeById"),
  ratingHistRemoveOne: RatingHistTC.getResolver("removeOne"),
  ratingHistRemoveMany: RatingHistTC.getResolver("removeMany"),
};

module.exports = { RatingHistQuery, RatingHistMutation };
