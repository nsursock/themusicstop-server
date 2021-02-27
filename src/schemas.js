const { SchemaComposer } = require( 'graphql-compose');
const schemaComposer = new SchemaComposer();

const { UserQuery, UserMutation } = require ('./resolvers/user');
const { MessageQuery, MessageMutation } = require ('./resolvers/message');
const { RelationQuery, RelationMutation } = require ('./resolvers/relation');
const { SongQuery, SongMutation } = require ('./resolvers/song');
const { RatingQuery, RatingMutation } = require ('./resolvers/rating');
const { RatingHistQuery, RatingHistMutation } = require ('./resolvers/ratinghist');

schemaComposer.Query.addFields({
    ...UserQuery,
    ...MessageQuery,
    ...RelationQuery,
    ...SongQuery,
    ...RatingQuery,
    ...RatingHistQuery
});

schemaComposer.Mutation.addFields({
    ...UserMutation,
    ...MessageMutation,
    ...RelationMutation,
    ...SongMutation,
    ...RatingMutation,
    ...RatingHistMutation
});

module.exports = schemaComposer.buildSchema();
