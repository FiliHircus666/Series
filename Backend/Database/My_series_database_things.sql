SELECT * FROM user;
SELECT * FROM series;
SELECT * FROM favorite;
SELECT * FROM comment;



# api/user
SELECT * FROM user;
# api/user/series
SELECT * FROM series;
# api/user/series/favorite
SELECT * FROM favorite
# api/user/series/comment
SELECT * FROM comment; 
 
# crateUser
  INSERT INTO user 
    (userName,password,Email,permission)
    VALUES
    ('Admin','AdminPassword','Admin@gmail.com',1);
  
    
# createSeries
  INSERT INTO series
    (name,releaseDate,ageLimit)
    VALUES
    ('The Last Kingdom','2015',16),
    ('Vikings','2013',16),
    ('Game of Thrones','2011',18);
# createFavorite
  INSERT INTO favorite
    (userId,seriesId,watched)
    VALUES
    (10,51,'watched'),
    (12,53,'in progress');
# createComment
    INSERT INTO comment
      (userId,userComment,seriesId,ratePoint)
      VALUES
      (10,'I not like this shit',1,5);
      
# deleteComment
DELETE FROM comment WHERE id = 4;
# getCommentById
SELECT * FROM comment WHERE id = 7;
# deleteUser
DELETE FROM user where id = 2;
# deleteSeries 
DELETE FROM series;
# getFavorite 
SELECT DISTINCT s.name FROM favorite f
  INNER JOIN series s on s.id = f.seriesId
  WHERE f.seriesId = 51;
DELETE FROM user;

INSERT INTO 