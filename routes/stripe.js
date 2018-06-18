const express = require('express');
const router = express.Router();
const keys = require('../config/keys');
const Stripe = require('stripe')(keys.stripe_secret_key);
router.route('/charge')
.post((req,res) => {
   const amount = 2500;
    try{
    Stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
    })
    .then(customer => Stripe.charges.create({
        amount,
        description: 'Node JS Development Ebook',
        currency: 'usd',
        customer: customer.id
    }))
    .then(charge => res.render('success'));
    } catch (err) {
        console.log(err)
    }
   
});

module.exports = router;