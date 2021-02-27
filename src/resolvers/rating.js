const { RatingTC } = require("../models/rating");


const RatingQuery = {
  ratingById: RatingTC.getResolver("findById"),
  ratingByIds: RatingTC.getResolver("findByIds"),
  ratingOne: RatingTC.getResolver("findOne"),
  ratingMany: RatingTC.getResolver("findMany"),
  ratingCount: RatingTC.getResolver("count"),
  ratingConnection: RatingTC.getResolver("connection"),
  ratingPagination: RatingTC.getResolver("pagination"),
};

const RatingMutation = {
  ratingCreateOne: RatingTC.getResolver("createOne"),
  ratingCreateMany: RatingTC.getResolver("createMany"),
  ratingUpdateById: RatingTC.getResolver("updateById"),
  ratingUpdateOne: RatingTC.getResolver("updateOne"),
  ratingUpdateMany: RatingTC.getResolver("updateMany"),
  ratingRemoveById: RatingTC.getResolver("removeById"),
  ratingRemoveOne: RatingTC.getResolver("removeOne"),
  ratingRemoveMany: RatingTC.getResolver("removeMany"),
};

module.exports = { RatingQuery, RatingMutation };
