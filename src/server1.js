//npm install --save apollo-server-express@1 graphql-tools graphql express body-parser
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const expressPlayground = require('graphql-playground-middleware-express').default
const cors = require('cors');
const mongoose = require("mongoose");
const schema = require("./schemas");
const jwt = require('express-jwt')

const app = express();

app.use(express.json());
app.use(cors());
//app.use(bodyParser.json());

//const JWT_SECRET = require('crypto').randomBytes(64).toString('hex');
//console.log('secret: '+JWT_SECRET);
// const authMiddleware = jwt({
//   secret: process.env.JWT_SECRET,
//   algorithms: ['RS256']
// });
// app.use(authMiddleware);

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

app.use('/api', bodyParser.json(), graphqlExpress({ schema }));

if (process.env.NODE_ENV !== 'production')
  app.get('/playground', expressPlayground({ endpoint: '/api' }))
  //app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
