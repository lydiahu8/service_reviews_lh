/* eslint-disable prefer-destructuring */
const express = require('express');
const compression = require('compression');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../database/index.js');

const app = express();

app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

const port = 3008;

// bundle
app.use(express.static(`${__dirname}/../client/dist`));

// Get all reviews for a specific product at :productId
app.get('/api/reviews/:productId', (req, res) => {
  const {
    productId,
  } = req.params;
  db.getReviews(parseInt(productId, 10), (err, num) => {
    if (err) {
      res.status(400).send();
    }
    res.status(200).send(num);
  });
});

// Post a review to a specific product
app.post('/api/reviews/', (req, res) => {
  const {
    body,
  } = req;
  db.addOneReview(body, (err, data) => {
    if (err) {
      res.status(400).send();
    }
    res.status(200).send(data);
  });
});

// Update a review for a specific product at :productId
app.put('/api/reviews/:productId', (req, res) => {
  const {
    productId,
  } = req.params;
  const {
    body,
  } = req;
  db.updateOneReview(parseInt(productId, 10), body, (err, data) => {
    if (err) {
      res.status(400).send();
    }
    res.status(200).send(data);
  });
});

// Delete a review for a specific product at :productId
app.delete('/api/reviews/:productId', (req, res) => {
  const {
    productId,
  } = req.params;
  db.deleteOneReview(parseInt(productId, 10), (err, data) => {
    if (err) {
      res.status(400).send();
    }
    res.status(200).send(data);
  });
});

// the index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

app.listen(port, () => console.log(`Now listening on port ${port}!`));
