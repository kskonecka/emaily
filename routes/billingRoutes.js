const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

module.exports = app => {
  app.post('/api/stripe', async (req, res) => {
    // console.log(req.body);
    if (!req.user) {
      //if not user then end request
      return res.status(401).send({ error: 'You must log in!' }) //unauthorized
    }

    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id
    });

    // console.log('charge: ', charge);
    req.user.credits += 5;
    const user = await req.user.save();

    res.send(user);
  })
};
