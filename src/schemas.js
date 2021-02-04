const { SchemaComposer } = require( 'graphql-compose');
const schemaComposer = new SchemaComposer();

const { UserQuery, UserMutation } = require ('./resolvers/user');
const { MessageQuery, MessageMutation } = require ('./resolvers/message');
const { RelationQuery, RelationMutation } = require ('./resolvers/relation');
//const { SongQuery, SongMutation } = require ('./resolvers/song');

schemaComposer.Query.addFields({
    ...UserQuery,
    ...MessageQuery,
    ...RelationQuery,
//    ...SongQuery,
});

schemaComposer.Mutation.addFields({
    ...UserMutation,
    ...MessageMutation,
    ...RelationMutation,
//    ...SongMutation,
});

module.exports = schemaComposer.buildSchema();
