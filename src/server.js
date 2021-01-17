require('dotenv').config();
//const createError = require('http-errors');
const cors = require('cors');
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");
//const logger = require("./core/logger");
const extensions = ({ context }) => {
  return {
    runTime: Date.now() - context.startTime,
  };
};

//app.use(logger);
app.use(express.json());
app.use(cors());

const SERVER_PORT = process.env.PORT === undefined ? 3001 : process.env.PORT;
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

const graphqlSchema = require("./schemas/index");
app.use(
  "/graphql",
  graphqlHTTP((request) => {
    return {
      context: { startTime: Date.now() },
      graphiql: true,
      schema: graphqlSchema,
      extensions,
    };
  })
);

// ******* crud *********
//console.log('Current directory: ' + process.cwd());
/*const memberAPI = require('./routes/member');
app.use('/api', memberAPI);
app.use((req, res, next) => {
  next(createError(404));
});

// Find 404
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});*/
