const { RelationTC } = require("../models/relation");
const RelationQuery = {
  relationById: RelationTC.getResolver("findById"),
  relationByIds: RelationTC.getResolver("findByIds"),
  relationOne: RelationTC.getResolver("findOne"),
  relationMany: RelationTC.getResolver("findMany"),
  relationCount: RelationTC.getResolver("count"),
  relationConnection: RelationTC.getResolver("connection"),
  relationPagination: RelationTC.getResolver("pagination"),
};

const RelationMutation = {
  relationCreateOne: RelationTC.getResolver("createOne"),
  relationCreateMany: RelationTC.getResolver("createMany"),
  relationUpdateById: RelationTC.getResolver("updateById"),
  relationUpdateOne: RelationTC.getResolver("updateOne"),
  relationUpdateMany: RelationTC.getResolver("updateMany"),
  relationRemoveById: RelationTC.getResolver("removeById"),
  relationRemoveOne: RelationTC.getResolver("removeOne"),
  relationRemoveMany: RelationTC.getResolver("removeMany"),
};

module.exports = { RelationQuery, RelationMutation };
