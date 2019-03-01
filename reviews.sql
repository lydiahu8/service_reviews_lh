DROP DATABASE IF EXISTS products;

CREATE DATABASE products;

\c products;

CREATE TABLE IF NOT EXISTS reviews (
  review_id SERIAL PRIMARY KEY,
  product_id VARCHAR(10) NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  user_id INTEGER NOT NULL,
  username VARCHAR(100) NOT NULL,
  overall_ratings VARCHAR(1),
  headline VARCHAR(255),
  review TEXT,
  created DATE DEFAULT CURRENT_DATE NOT NULL,
  updated DATE DEFAULT CURRENT_DATE NOT NULL,
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
  rating VARCHAR(1)
  review_id INTEGER REFERENCES reviews(review_id)
);