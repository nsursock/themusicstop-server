const { SchemaComposer } = require( 'graphql-compose');
const schemaComposer = new SchemaComposer();

const { UserQuery, UserMutation } = require ('./resolvers/user');
const { SongQuery, SongMutation } = require ('./resolvers/song');

schemaComposer.Query.addFields({
    ...UserQuery,
    ...SongQuery,
});

schemaComposer.Mutation.addFields({
    ...UserMutation,
    ...SongMutation,
});

module.exports = schemaComposer.buildSchema();
