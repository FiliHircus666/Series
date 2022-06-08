CREATE DATABASE serieshub
	CHARACTER SET utf8
	COLLATE utf8_hungarian_ci;

CREATE TABLE serieshub.users (
  id INT(11) NOT NULL AUTO_INCREMENT,
  userName VARCHAR(255) DEFAULT NULL,
  password VARCHAR(255) DEFAULT NULL,
  email VARCHAR(50) DEFAULT NULL,
  permission VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB;

CREATE TABLE serieshub.series (
  id INT(11) NOT NULL AUTO_INCREMENT,
  seriesName VARCHAR(255) DEFAULT NULL,
  releaseDate VARCHAR(255) DEFAULT NULL,
  ageLimit VARCHAR(255) DEFAULT NULL,
  categoryId INT(11) DEFAULT NULL,
  image VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8,
COLLATE utf8_hungarian_ci;

ALTER TABLE serieshub.series 
  ADD CONSTRAINT FK_series_categories_id FOREIGN KEY (categoryId)
    REFERENCES serieshub.categories(id) ON DELETE NO ACTION ON UPDATE NO ACTION;

CREATE TABLE serieshub.comments (
  id INT(11) NOT NULL AUTO_INCREMENT,
  userid INT(11) DEFAULT NULL,
  comment VARCHAR(255) DEFAULT NULL,
  seriesId INT(11) DEFAULT NULL,
   ratePoint INT(11) DEFAULT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8,
COLLATE utf8_hungarian_ci;

ALTER TABLE serieshub.comments 
  ADD CONSTRAINT FK_comments_users_id FOREIGN KEY (userid)
    REFERENCES serieshub.users(id) ON DELETE NO ACTION ON UPDATE NO ACTION;

CREATE TABLE serieshub.favorites (
  id INT(11) NOT NULL AUTO_INCREMENT,
  userId INT(11) DEFAULT NULL,
  seriesId INT(11) DEFAULT NULL,
  watched VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8,
COLLATE utf8_hungarian_ci;

ALTER TABLE serieshub.favorites 
  ADD CONSTRAINT FK_favorites_series_id FOREIGN KEY (seriesId)
    REFERENCES serieshub.series(id) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE serieshub.favorites 
  ADD CONSTRAINT FK_favorites_users_id FOREIGN KEY (userId)
    REFERENCES serieshub.users(id) ON DELETE NO ACTION ON UPDATE NO ACTION;

CREATE TABLE serieshub.categories (
  id INT(11) NOT NULL AUTO_INCREMENT,
  categoryName VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB;