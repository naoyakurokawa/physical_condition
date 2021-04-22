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
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT NULL
);

INSERT INTO body (date,userid,weight,fat) VALUES ("2021-04-21",1,60,10);