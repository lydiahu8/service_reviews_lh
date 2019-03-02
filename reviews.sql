DROP DATABASE IF EXISTS products;

CREATE DATABASE products;

-- Connects the to products database
\c products;

-- Provides total time it took to execute query and fetch results back to client
-- \timing

CREATE TABLE IF NOT EXISTS reviews (
  review_id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  user_id INTEGER NOT NULL,
  username VARCHAR(100) NOT NULL,
  overall_ratings INTEGER,
  headline VARCHAR(255),
  review TEXT,
  created VARCHAR(50) NOT NULL,
  updated VARCHAR(50) NOT NULL,
  verified BOOLEAN,
  helpful INTEGER
);

CREATE TABLE IF NOT EXISTS images (
  image_id SERIAL PRIMARY KEY,
  image_url VARCHAR(255) NOT NULL,
  review_id INTEGER REFERENCES reviews(review_id)
);

CREATE TABLE IF NOT EXISTS subRatings (
  subRating_id SERIAL PRIMARY KEY,
  feature VARCHAR(50),
  rating INTEGER,
  review_id INTEGER REFERENCES reviews(review_id)
);

-- COPY reviews into reviews table from CSV
-- COPY reviews (product_id, product_name, user_id, username, overall_ratings, headline, review, created, updated, verified, helpful)
-- FROM '/Users/lydiahu/Documents/HackReactor/Immersive/SDC/service_reviews_lh/database/utilities/reviews.csv'
-- DELIMITERS ',' CSV HEADER;

-- COPY images into images table from CSV
-- COPY images (image_url, review_id)
-- FROM '/Users/lydiahu/Documents/HackReactor/Immersive/SDC/service_reviews_lh/database/utilities/images.csv'
-- DELIMITERS ',' CSV HEADER;

-- COPY subRatings into subRatings table from CSV
-- COPY reviews (feature, rating, review_id)
-- FROM '/Users/lydiahu/Documents/HackReactor/Immersive/SDC/service_reviews_lh/database/utilities/subRatings.csv'
-- DELIMITERS ',' CSV HEADER;

-- CREATE INDEX productIdIndex ON reviews(product_id);
-- CREATE INDEX productNameIndex ON reviews(product_name);