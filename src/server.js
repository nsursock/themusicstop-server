require('dotenv').config();
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

app.listen(process.env.PORT || 4201, async () => {
  console.log("server is running");
  console.info(process.env.MONGODB_URI || process.env.DATABASE_URL);
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
