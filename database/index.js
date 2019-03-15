const {
  Pool,
} = require('pg');

const config = require('./config.js');

const pool = new Pool(config);

// Get all reviews with images for a product
const getReviewImages = (productId, callback) => {
  const queryStr = `SELECT reviews.id, images.review_id, reviews.product_id, reviews.slug, images.image_url FROM reviews INNER JOIN images ON reviews.id = images.review_id WHERE reviews.product_id = ${productId};`;
  pool.query(queryStr, (err, review) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, review);
  });
};

// Get all reviews for a product
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

// Add a review to a product
const addOneReview = (review, callback) => {
  const queryStr = 'INSERT INTO reviews (product_id, product_name, slug, userid, username, overall_ratings, headline, review, created, updated, verified, helpful, material_quality, durable, easy_use, easy_assemble, water_resistance) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)';

  // `WITH new_review AS (
  //   INSERT INTO reviews (product_id, product_name, slug, userid, username, overall_ratings, headline, review, created, updated, verified, helpful, material_quality, durable, easy_use, easy_assemble, water_resistance) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
  //   returning id
  // )
  // INSERT INTO images (image_url, review_id) VALUES ($1, (SELECT id FROM new_review));`;

  const params = [review.product_id, review.product_name, review.slug, review.userid, review.username, review.overall_ratings, review.headline, review.review, review.created, review.updated, review.verified, review.helpful, review.material_quality, review.durable, review.easy_use, review.easy_assemble, review.water_resistance];

  pool.query(queryStr, params, (err) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null);
  });
};

// Add an image to a review for a product
const addOneImage = (image, callback) => {
  const queryStr = 'INSERT INTO images (image_url, review_id) VALUES ($1, $2)';
  const params = [image.image_url, image.review_id];

  pool.query(queryStr, params, (err) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null);
  });
};

// Update a review

const updateOneReview = (reviewId, review, callback) => {
  const queryStr = `UPDATE reviews SET product_id = $1, product_name = $2, slug = $3, userid = $4, username = $5, overall_ratings = $6, headline = $7, review = $8, created = $9, updated = $10, verified = $11, helpful = $12, material_quality = $13, durable = $14, easy_use = $15, easy_assemble = $16, water_resistance = $17 WHERE id = ${reviewId};`;

  const params = [review.product_id, review.product_name, review.slug, review.userid, review.username, review.overall_ratings, review.headline, review.review, review.created, review.updated, review.verified, review.helpful, review.material_quality, review.durable, review.easy_use, review.easy_assemble, review.water_resistance];

  pool.query(queryStr, params, (err) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null);
  });
};

const deleteOneReview = (reviewId, callback) => {
  const queryStr = `DELETE FROM reviews WHERE id = ${reviewId}`;
  pool.query(queryStr, (err) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null);
  });
};

const deleteImages = (reviewId, callback) => {
  const queryStr = `DELETE FROM images WHERE review_id = ${reviewId};`;
  pool.query(queryStr, (err) => {
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
  addOneImage,
  updateOneReview,
  deleteOneReview,
  deleteImages,
};
