DROP DATABASE IF EXISTS products;

CREATE DATABASE products;

-- Connects the to products database
\c products;

-- Provides total time it took to execute query and fetch results back to client
\timing

CREATE TABLE IF NOT EXISTS reviews (
  id INTEGER PRIMARY KEY,
  product_id INTEGER NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  slug VARCHAR(255),
  userid INTEGER,
  username VARCHAR(100),
  overall_ratings SMALLINT,
  headline VARCHAR(255),
  review TEXT,
  created VARCHAR(50) NOT NULL,
  updated VARCHAR(50),
  verified BOOLEAN,
  helpful INTEGER,
  material_quality SMALLINT,
  durable SMALLINT,
  easy_use SMALLINT,
  easy_assemble SMALLINT,
  water_resistance SMALLINT
);

CREATE TABLE IF NOT EXISTS images (
  id INTEGER PRIMARY KEY,
  image_url VARCHAR(100) NOT NULL,
  review_id INTEGER
);

-- COPY reviews into reviews table from CSV
COPY reviews (id, product_id, product_name, slug, userid, username, overall_ratings, headline, review, created, updated, verified, helpful, material_quality, durable, easy_use, easy_assemble, water_resistance)
FROM '/Users/lydiahu/Documents/HackReactor/Immersive/SDC/service_reviews_lh/database/helpers/reviews.csv'
DELIMITERS ',' CSV HEADER;

-- COPY images into images table from CSV
COPY images (id, image_url, review_id)
FROM '/Users/lydiahu/Documents/HackReactor/Immersive/SDC/service_reviews_lh/database/helpers/images.csv'
DELIMITERS ',' CSV HEADER;

CREATE INDEX productIdIndex ON reviews(product_id);
CREATE INDEX productNameIndex ON reviews(slug);
CREATE INDEX imageReviewIdIndex ON images(review_id);
