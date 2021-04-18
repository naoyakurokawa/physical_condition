DROP SCHEMA IF EXISTS user_service;
CREATE SCHEMA user_service;
USE user_service;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS session;

CREATE TABLE users
(
  id int unsigned primary key auto_increment,
  name varchar(50),
  password varchar(255)
);

CREATE TABLE session
(
  id int unsigned primary key auto_increment,
  uuid varchar(255),
  name varchar(20),
  userid int
);

INSERT INTO users (name,password) VALUES ("test","123");