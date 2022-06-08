
### api/categories
SELECT * FROM categories;

### api/users
SELECT * FROM users;

### api/users/series/favorites
SELECT * FROM favorites;

### api/series
SELECT * FROM series; 

### api/users/series/comment
SELECT * FROM comments;

INSERT INTO series 
  (seriesName,releaseDate,ageLimit,categoryId,image)
  VALUES
  ('A nagy pénzrablás','2017','16',9,'A_nagy_penzrablas.jpg'),
  ('Game of thrones','2011','16',5,'Game_of_thrones.jpg'),
('A nagy pénzrablás','2008','18',1,'Kemeny_motorosok.jpg'),
('Loki','2021','16',1,'Loki.jpg'),
  ('Lucifer','2016','16',4,'Lucifer.jpg'),
    ('Moon knight','2022','16',1,'Moon_Knight.jpg'),
      ('Silicon valley','2014','16',4,'Silicon_Valley.jpg'),
      ('Stranger things','2016','16',7,'Stranger_things.jpg'),
      ('The last kingdom','2015','16',4,'The_Last_Kingdom.jpg'),
      ('The walking dead','2010','18',7,'The_walking_dead.jpg'),
      ('The thor love and thunder','2022','12',2,'Thor_Love_And_Thunder.jpg'),
      ('Umbrella academy','2019','16',4,'Umbrella_Academy.jpg'),
      ('WandaVision','2021','12',8,'WandaVision.jpg'),
      ('Witcher','2019','16',5,'Witcher.jpg')
  ;
### api/categories
  INSERT INTO categories 
    (categoryName)
    VALUES
    ('Action'),
('Adventure'),
('Crime'),
('Drama'), 
('Fantasy'),
('History'),
('Horror'),
    ('Romance'),
('Thriller');

DELETE  FROM series;