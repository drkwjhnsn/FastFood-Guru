
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
  name VARCHAR(30),
  address VARCHAR(60),
  hours VARCHAR(300),
  phone VARCHAR(30),
  PRIMARY KEY (restaurant_id)
);

CREATE TABLE comments (
  comment_id INT AUTO_INCREMENT,
  author_id INT,
  restaurant_id VARCHAR(30) NOT NULL,
  body VARCHAR(2000) NOT NULL,
  author VARCHAR(30) NOT NULL,
  author_avatar VARCHAR(200),
  creation TIMESTAMP,
  PRIMARY KEY (comment_id)
  -- FOREIGN KEY (author_id) REFERENCES users(user_id)
  -- FOREIGN KEY (restaurant_id) REFERENCES restaurants(restaurant_id)
);
