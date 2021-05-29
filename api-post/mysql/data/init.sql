DROP SCHEMA IF EXISTS post_service;
CREATE SCHEMA post_service;
USE post_service;

DROP TABLE IF EXISTS body;

CREATE TABLE body
(
  id INT unsigned primary key auto_increment,
  date DATE NOT NULL,
  userid INT(11),
  weight INT(11) NOT NULL,
  fat INT(11) NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated TIMESTAMP NULL DEFAULT NULL
);

INSERT INTO body (date,userid,weight,fat) VALUES ("2021-04-21",1,60,10);

DROP TABLE IF EXISTS meal;

CREATE TABLE meal
(
  id INT unsigned primary key auto_increment,
  userid INT(11),
  date DATE NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated TIMESTAMP NULL DEFAULT NULL
);

DROP TABLE IF EXISTS mealdetail;

CREATE TABLE mealdetail
(
  id INT unsigned primary key auto_increment,
  mealid INT(11),
  time TIME NOT NULL,
  name VARCHAR(255),
  calorie INT(11) NOT NULL,
  protein INT(11) NOT NULL,
  carbohydrate INT(11) NOT NULL,
  lipid INT(11) NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated TIMESTAMP NULL DEFAULT NULL
);