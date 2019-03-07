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

const addOneReview = (review, callback) => {
  const queryStr = `INSERT INTO reviews (id, product_id, product_name, slug, userid, username, overall_ratings, headline, review, created, updated, verified, helpful, material_quality, durable, easy_use, easy_assemble, water_resistance) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)`
  
  const params = [review.id, review.product_id, review.product_name, review.slug, review.userid, review.username, review.overall_ratings, review.headline, review.review, review.created, review.updated, review.verified, review.helpful, review.material_quality, review.durable, review.easy_use, review.easy_assemble, review.water_resistance];

  pool.query(queryStr, params, (err) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null);
  });
};


module.exports = {
  getReviewImages,
  getReviews,
  addOneReview,
};