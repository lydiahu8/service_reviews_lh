DROP DATABASE IF EXISTS products;

CREATE DATABASE products;

-- Connects the to products database
\c products;

-- Provides total time it took to execute query and fetch results back to client
\timing

CREATE TABLE IF NOT EXISTS reviews (
  review_id VARCHAR(10) PRIMARY KEY,
  product_id VARCHAR(10) NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  user_id VARCHAR(10) NOT NULL,
  username VARCHAR(100) NOT NULL,
  overall_ratings VARCHAR(5),
  headline VARCHAR(255),
  review TEXT,
  created VARCHAR(50) NOT NULL,
  updated VARCHAR(50) NOT NULL,
  verified BOOLEAN,
  helpful VARCHAR(10)
);

CREATE TABLE IF NOT EXISTS images (
  image_id VARCHAR(10) PRIMARY KEY,
  image_url VARCHAR(255) NOT NULL,
  review_id VARCHAR(10)
);

CREATE TABLE IF NOT EXISTS subratings (
  subrating_id VARCHAR(10) PRIMARY KEY,
  feature VARCHAR(50),
  rating VARCHAR(5),
  review_id VARCHAR(10)
);

-- COPY reviews into reviews table from CSV
COPY reviews (review_id, product_id, product_name, user_id, username, overall_ratings, headline, review, created, updated, verified, helpful)
FROM '/Users/lydiahu/Documents/HackReactor/Immersive/SDC/service_reviews_lh/database/helpers/reviews.csv'
DELIMITERS ',' CSV HEADER;

-- COPY images into images table from CSV
COPY images (image_id, image_url, review_id)
FROM '/Users/lydiahu/Documents/HackReactor/Immersive/SDC/service_reviews_lh/database/helpers/images.csv'
DELIMITERS ',' CSV HEADER;

-- COPY subRatings into subRatings table from CSV
COPY subratings (subrating_id, feature, rating, review_id)
FROM '/Users/lydiahu/Documents/HackReactor/Immersive/SDC/service_reviews_lh/database/helpers/subRatings.csv'
DELIMITERS ',' CSV HEADER;

-- CREATE INDEX productIdIndex ON reviews(product_id);
-- CREATE INDEX productNameIndex ON reviews(product_name);