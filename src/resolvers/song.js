const { SongTC } = require("../models/song");
const { SongSchema } = require("../models/song");

SongTC.addResolver({
  name: "create",
  kind: "mutation",
  type: SongTC.getResolver("createOne").getType(),
  args: SongTC.getResolver("createOne").getArgs(),
  resolve: async ({ source, args, context, info }) => {
    const song = await SongSchema.create(args.record);

    return {
      record: song,
      recordId: SongTC.getRecordIdFn()(song),
    };
  },
});

const SongQuery = {
  songById: SongTC.getResolver("findById"),
  songByIds: SongTC.getResolver("findByIds"),
  songOne: SongTC.getResolver("findOne"),
  songMany: SongTC.getResolver("findMany"),
  songCount: SongTC.getResolver("count"),
  songConnection: SongTC.getResolver("connection"),
  songPagination: SongTC.getResolver("pagination"),
};

const SongMutation = {
  songWithFile: SongTC.getResolver("create"),
  songCreateOne: SongTC.getResolver("createOne"),
  songCreateMany: SongTC.getResolver("createMany"),
  songUpdateById: SongTC.getResolver("updateById"),
  songUpdateOne: SongTC.getResolver("updateOne"),
  songUpdateMany: SongTC.getResolver("updateMany"),
  songRemoveById: SongTC.getResolver("removeById"),
  songRemoveOne: SongTC.getResolver("removeOne"),
  songRemoveMany: SongTC.getResolver("removeMany"),
};

module.exports = { SongQuery: SongQuery, SongMutation: SongMutation };
