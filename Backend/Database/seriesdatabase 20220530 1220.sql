﻿--
-- Script was generated by Devart dbForge Studio 2019 for MySQL, Version 8.1.22.0
-- Product home page: http://www.devart.com/dbforge/mysql/studio
-- Script date 30/05/2022 12:20:53
-- Server version: 5.5.5-10.4.24-MariaDB
-- Client version: 4.1
--

-- 
-- Disable foreign keys
-- 
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;

-- 
-- Set SQL mode
-- 
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- 
-- Set character set the client will use to send SQL statements to the server
--
SET NAMES 'utf8';

--
-- Set default database
--
USE seriesdatabase;

--
-- Drop table `comment`
--
DROP TABLE IF EXISTS comment;

--
-- Drop table `favorite`
--
DROP TABLE IF EXISTS favorite;

--
-- Drop table `serieslink`
--
DROP TABLE IF EXISTS serieslink;

--
-- Drop table `series`
--
DROP TABLE IF EXISTS series;

--
-- Drop table `user`
--
DROP TABLE IF EXISTS user;

--
-- Set default database
--
USE seriesdatabase;

--
-- Create table `user`
--
CREATE TABLE user (
  id INT(11) NOT NULL AUTO_INCREMENT,
  userName VARCHAR(255) DEFAULT NULL,
  password VARCHAR(255) DEFAULT NULL,
  Email VARCHAR(255) DEFAULT NULL,
  permission VARBINARY(255) DEFAULT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 19,
AVG_ROW_LENGTH = 5461,
CHARACTER SET utf8,
COLLATE utf8_hungarian_ci;

--
-- Create table `series`
--
CREATE TABLE series (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) DEFAULT NULL,
  releaseDate VARCHAR(255) DEFAULT NULL,
  ageLimit VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 5,
AVG_ROW_LENGTH = 16384,
CHARACTER SET utf8,
COLLATE utf8_hungarian_ci;

--
-- Create table `serieslink`
--
CREATE TABLE serieslink (
  id INT(11) NOT NULL AUTO_INCREMENT,
  seriesId INT(11) DEFAULT NULL,
  videolink VARCHAR(255) DEFAULT NULL,
  picturelink VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8,
COLLATE utf8_hungarian_ci;

--
-- Create foreign key
--
ALTER TABLE serieslink 
  ADD CONSTRAINT FK_serieslink_series_id FOREIGN KEY (seriesId)
    REFERENCES series(id) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Create table `favorite`
--
CREATE TABLE favorite (
  id INT(11) NOT NULL AUTO_INCREMENT,
  userId INT(11) DEFAULT NULL,
  seriesId INT(11) DEFAULT NULL,
  Watched VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8,
COLLATE utf8_hungarian_ci;

--
-- Create foreign key
--
ALTER TABLE favorite 
  ADD CONSTRAINT FK_favorite_series_id FOREIGN KEY (seriesId)
    REFERENCES series(id) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Create foreign key
--
ALTER TABLE favorite 
  ADD CONSTRAINT FK_favorite_user_id FOREIGN KEY (userId)
    REFERENCES user(id) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Create table `comment`
--
CREATE TABLE comment (
  id INT(11) NOT NULL AUTO_INCREMENT,
  userId INT(11) DEFAULT NULL,
  userComment VARCHAR(255) DEFAULT NULL,
  seriesId INT(11) DEFAULT NULL,
  ratePoint INT(11) DEFAULT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 5,
AVG_ROW_LENGTH = 8192,
CHARACTER SET utf8,
COLLATE utf8_hungarian_ci;

--
-- Create foreign key
--
ALTER TABLE comment 
  ADD CONSTRAINT FK_comment_series_id FOREIGN KEY (seriesId)
    REFERENCES series(id) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Create foreign key
--
ALTER TABLE comment 
  ADD CONSTRAINT FK_comment_user_id FOREIGN KEY (userId)
    REFERENCES user(id) ON DELETE CASCADE ON UPDATE CASCADE;

-- 
-- Dumping data for table user
--
INSERT INTO user VALUES
(17, 'FiliHircus', '$2b$10$.1wB3E66Ls1jt05V3UGfE.8JHRrcHYxaxVaQYuLEQnFBuZtQoQbba', 'Admin@gmail.com', x'30'),
(18, 'User', '$2b$10$vo73GoePjaDDmMJRdAlqzOPO.4BneWCdqP5rjzwh4mj8cTi/eCy.u', 'Admin@gmail.com', x'31');

-- 
-- Dumping data for table series
--
INSERT INTO series VALUES
(1, 'The Last Kingdoms', '2015', '16'),
(2, 'Wanda Vision ', '2022', '16'),
(3, 'Loki', '2021', '16'),
(4, 'Thor - Love & thunder', '2022', '16');

-- 
-- Dumping data for table serieslink
--
-- Table seriesdatabase.serieslink does not contain any data (it is empty)

-- 
-- Dumping data for table favorite
--
-- Table seriesdatabase.favorite does not contain any data (it is empty)

-- 
-- Dumping data for table comment
--
-- Table seriesdatabase.comment does not contain any data (it is empty)

-- 
-- Restore previous SQL mode
-- 
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;

-- 
-- Enable foreign keys
-- 
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;