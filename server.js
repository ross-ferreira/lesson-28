//We dont have access to ES6 on server so cant use Import thats why use require- however latest node may support this now
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
//path lets us build out pathways for our directories
const path = require('path');

//GZIP Compression
const compression = require('compression');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

//Instantiate a new express app
const app = express();
const port = process.env.PORT || 5000;

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

if (process.env.NODE_ENV == 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  // app.get grabs all the get requests REST APIs
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
//__dirname is part of nodejs

app.listen(port, (error) => {
  if (error) throw error;
  console.log('Server running on port ' + port);
});

app.post('/payment', (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: 'usd',
  };

  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ success: stripeRes });
    }
  });
});
