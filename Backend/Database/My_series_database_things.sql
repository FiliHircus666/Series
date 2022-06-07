SELECT * FROM user;
SELECT * FROM series;
SELECT * FROM favorite;
SELECT * FROM comment;
SELECT * FROM serieslink;
 


# api/user
SELECT * FROM user;
# api/user/series
SELECT * FROM series;
# api/user/series/favorite
SELECT * FR6OM favorite;
# api/user/favorite/eries/comment
SELECT * FROM comment; 
 
# api/user/crateUser
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

INSERT INTO serieslink
  (seriesId,videoLink)
  VALUES
  (51,'https://youtu.be/WxPApTGWwas'),
(53,'https://youtu.be/KPLWWIOCOOQ'),
(54,'https://youtu.be/UWfgm20-LTM'),
(56,'https://youtu.be/sj9J2ecsSpo')
  ;



SELECT sl.id as id ,sl.seriesId as seriesId,sl.pictureLink,sl.videoLink FROM series s
  INNER JOIN serieslink sl on sl.seriesId = s.id 
ORDER BY s.name;

## GetSeriesLink
SELECT s.name,s.releaseDate,s.ageLimit,sl.videoLink FROM series s
LEFT JOIN serieslink sl on s.id = sl.seriesId;

UPDATE serieslink set videoLink = 'https://www.youtube.com/watch?v=YQG95_nzRsY' 
  WHERE id = 56;
  delete from serieslink;

  SELECT * FROM serieslink WHERE id = 15;
  
  