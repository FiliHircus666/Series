SELECT * FROM user;
SELECT * FROM series;
SELECT * FROM favorite;
SELECT * FROM comment;

  INSERT INTO user 
    (userName,password,Email,permission)
    VALUES
    ('Admin','AdminPassword','Admin@gmail.com',1),
    ('User#234','UserPassword#234','User#234@gmail.com',2),
    ('User#235','UserPassword#235','User#235@gmail.com',2);
    

  INSERT INTO series
    (name,releaseDate,ageLimit)
    VALUES
    ('The Last Kingdom','2015',16),
    ('Vikings','2013',16),
    ('Game of Thrones','2011',18);

  INSERT INTO favorite
    (userId,seriesId,Watched)
    VALUES
    (2,3,'watched'),
    (3,1,'in progress');

    INSERT INTO comment
      (userId,comment,seriesId,ratePoint)
      VALUES
      (2,'I not like this',1,5),
      (2,'Not bad',3,3);

DELETE FROM comment WHERE id = 4;

SELECT * FROM comment;
DELETE FROM user;
DELETE FROM series;
 