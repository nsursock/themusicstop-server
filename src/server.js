require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const expressPlayground = require('graphql-playground-middleware-express').default
const cors = require('cors');
const methodOverride = require('method-override');
const mongoose = require("mongoose");
const schema = require("./schemas");
const jwt = require('express-jwt')

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(methodOverride());

//const JWT_SECRET = require('crypto').randomBytes(64).toString('hex');
//console.log('secret: '+JWT_SECRET);

// auth middleware
const auth = jwt( {
  secret: process.env.JWT_SECRET,
  credentialsRequired: false,
  algorithms: ['sha1', 'RS256', 'HS256']
});


// start server
const SERVER_PORT = process.env.PORT || 3001;
app.listen(SERVER_PORT, async () => {
  console.log("server is running: " + SERVER_PORT);
  await mongoose.connect(
    process.env.MONGODB_URI || process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  });
});

// db error
mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);

// graphql endpoint
app.use('/api', auth, graphqlExpress(req => ({
  schema,
  context: {
    user: req.user
  }
})));

// add ui in dev
//if (process.env.NODE_ENV !== 'production')
app.get('/ui', expressPlayground({ endpoint: '/api' }))
  //app.use('/ui', graphiqlExpress({ endpointURL: '/api' }));
