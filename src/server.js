//npm install --save apollo-server-express@1 graphql-tools graphql express body-parser
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
//const { makeExecutableSchema } = require('graphql-tools');
const cors = require('cors');
const mongoose = require("mongoose");

// Initialize the app
const app = express();

app.use(express.json());
app.use(cors());

// Start server
const SERVER_PORT = process.env.PORT || 3001;
app.listen(SERVER_PORT, async () => {
  console.log("server is running: " + SERVER_PORT);
  await mongoose.connect(
    process.env.MONGODB_URI || process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  });
});

mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);

// The GraphQL endpoint
const schema = require("./schemas");
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
if (process.env.NODE_ENV !== 'production')
  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
