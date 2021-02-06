//npm install --save apollo-server-express@1 graphql-tools graphql express body-parser
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
const stripe = require('stripe')(process.env.STRIPE_KEY);

const app = express();
app.use(express.json());
// app.use(cors({
//   origin: ['http://themusicstop.app', 'http://localhost:3000'],
//   credentials: true
// }));
app.use(cors());
app.use(methodOverride());

// const whitelist = ['http://themusicstop.app', 'http://localhost:3000']
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   },
// }
// app.use(cors(corsOptions));

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

app.post("/api/charge", bodyParser.json(), (req, res) => {
  try {
    stripe.customers
    .create({
      name: req.body.firstname + ' ' + req.body.lastname,
      email: req.body.email,
      source: req.body.token
    })
    .then(customer =>
      stripe.charges.create({
        amount: req.body.amount,
        currency: req.body.currency,
        customer: customer.id
      }, (e, c) => { // error, charge
        if (e) {
          res.json({ error: e, charge: false });
        } else
          res.json({ error: false, charge: c});
      })
    )
    .then(() => console.log('completed'))
    .catch(err => console.log(err));
  } catch (err) {
    res.send(err);
  }
});

// graphql endpoint
app.use('/api',
  bodyParser.json(),
  auth,
  graphqlExpress(req => ({
    schema,
    context: {
      user: req.user
    }
})));

// add ui in dev
//if (process.env.NODE_ENV !== 'production')
app.get('/ui', expressPlayground({ endpoint: '/api' }))
  //app.use('/ui', graphiqlExpress({ endpointURL: '/api' }));
