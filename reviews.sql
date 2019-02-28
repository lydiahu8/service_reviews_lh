DROP DATABASE IF EXISTS products;

CREATE DATABASE products;

\c products;

CREATE TABLE IF NOT EXISTS reviews (
  review_id SERIAL PRIMARY KEY,
  product_id VARCHAR(10),
  product_name VARCHAR(100),
  user_id INTEGER,
  username VARCHAR(100),
  ratings VARCHAR(2),
  headline VARCHAR(255),
  review TEXT,
  created INTEGER,
  updated INTEGER,
  verified BOOLEAN,
  helpful INTEGER
);

CREATE TABLE IF NOT EXISTS images (
  image_id SERIAL PRIMARY KEY,
  image_url VARCHAR(255),
  review_id INTEGER REFERENCES reviews(review_id)
);