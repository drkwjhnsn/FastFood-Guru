
DROP SCHEMA IF EXISTS fastfoodguru;
CREATE SCHEMA fastfoodguru;
USE fastfoodguru;

CREATE TABLE users (
  user_id INT AUTO_INCREMENT,
  username VARCHAR(30) NOT NULL UNIQUE,
  imghash VARCHAR(64),
  hash VARCHAR(128) NOT NULL,
  salt VARCHAR(16) NOT NULL,
  PRIMARY KEY (user_id)
);

CREATE TABLE restaurants (
  restaurant_id VARCHAR(27) NOT NULL,
  name VARCHAR(30) NOT NULL,
  address VARCHAR(60) NOT NULL,
  PRIMARY KEY (restaurant_id)
);

CREATE TABLE comments (
  comment_id INT AUTO_INCREMENT,
  author_id INT NOT NULL,
  restaurant_id VARCHAR(30) NOT NULL,
  title VARCHAR(128) NOT NULL,
  body VARCHAR(1000) NOT NULL,
  author VARCHAR(30) NOT NULL,
  author_avatar VARCHAR(64),
  PRIMARY KEY (comment_id),
  FOREIGN KEY (author_id) REFERENCES users(user_id)
  -- FOREIGN KEY (restaurant_id) REFERENCES restaurants(restaurant_id)
);
