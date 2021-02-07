const { UserTC, UserSchema } = require("../models/user");
const stripe = require('stripe')(process.env.STRIPE_KEY);

const resolver = function () {};

resolver.donate = UserTC.addResolver({
  name: "donate",
  type: 'String',
  args: {
    firstname: 'String',
    lastname: 'String',
    email: 'String',
    token: 'String',
    amount: 'Float',
    currency: 'String'
  },
  resolve: async ({ source, args }) => {

    let response = await
      stripe.customers
        .create({
          name: args.firstname + ' ' + args.lastname,
          email: args.email,
          source: args.token
        })
      .then(customer =>
        stripe.charges.create({
          amount: args.amount,
          currency: args.currency,
          customer: customer.id
        }));
    return response.receipt_url;
  }
});
