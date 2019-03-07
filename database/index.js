const {
  Pool,
} = require('pg');

const pool = new Pool({
  host: 'localhost',
  database: 'products',
  port: 5432,
});

const getReviewImages = (productId, callback) => {
  const queryStr = `SELECT * FROM reviews INNER JOIN images ON reviews.id = images.review_id WHERE reviews.product_id = ${productId};`;
  pool.query(queryStr, (err, review) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, review);
  });
};

const getReviews = (productId, callback) => {
  const queryStr = `SELECT * FROM reviews WHERE product_id = ${productId};`;
  pool.query(queryStr, (err, review) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, review);
  });
};

module.exports = {
  getReviewImages,
  getReviews,
};