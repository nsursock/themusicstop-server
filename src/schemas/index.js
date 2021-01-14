const { SchemaComposer } = require( 'graphql-compose');


const schemaComposer = new SchemaComposer();

const { UserQuery, UserMutation } =require ('./user');
const { SongQuery, SongMutation } =require ('./song');

schemaComposer.Query.addFields({
    ...UserQuery,
    ...SongQuery,
});

schemaComposer.Mutation.addFields({
    ...UserMutation,
    ...SongMutation,
});

module.exports = schemaComposer.buildSchema();
