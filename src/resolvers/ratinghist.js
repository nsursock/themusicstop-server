const { RatingHistTC } = require("../models/rating");


const RatingHistQuery = {
  ratingHistById: RatingHistTC.getResolver("findById"),
  ratingHistByIds: RatingHistTC.getResolver("findByIds"),
  ratingHistOne: RatingHistTC.getResolver("findOne"),
  ratingHistMany: RatingHistTC.getResolver("findMany"),
  ratingHistCount: RatingHistTC.getResolver("count"),
  ratingHistConnection: RatingHistTC.getResolver("connection"),
  ratingHistPagination: RatingHistTC.getResolver("pagination"),
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
