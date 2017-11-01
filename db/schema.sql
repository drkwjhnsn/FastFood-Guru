
DROP SCHEMA IF EXISTS fastfoodguru;
CREATE SCHEMA fastfoodguru;
USE fastfoodguru;

CREATE TABLE users (
  user_id INT AUTO_INCREMENT,
  username VARCHAR(30) NOT NULL UNIQUE,
  zip INT NOT NULL,
  imghash VARCHAR(64),
  hash VARCHAR(128) NOT NULL,
  salt VARCHAR(16) NOT NULL,
  PRIMARY KEY (user_id)
);
