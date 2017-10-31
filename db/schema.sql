
DROP SCHEMA IF EXISTS fastfoodguru;
CREATE SCHEMA fastfoodguru;
USE fastfoodguru;

CREATE TABLE users (
  user_id INT AUTO_INCREMENT,
  username varchar(30) NOT NULL UNIQUE,
  hash varchar(128) NOT NULL,
  salt varchar(16) NOT NULL,
  PRIMARY KEY (user_id)
);
