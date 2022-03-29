const pool = require("../../config/database.js");

module.exports = {
    create: (data, callBack) => {
        let queryString = `insert into registration
            (firstName, lastName, gender, email, password, number)
            values
            (?,?,?,?,?,?)
        `
        let params = Object.values(data);
        pool.query(queryString, params, (error, results, fields) => {
            if (error) {
                return callBack(error);

            }
            return callBack(null, results);
        });
    },
    createCar: (data, callBack) => {
        let queryString = `INSERT INTO cars
                    (name,licenseNumber,hourlyRate)
                    VALUES
                    (?, ?, ?)
        `
        let params = Object.values(data);
        pool.query(queryString, params, (error, results, fields) => {
            if (error) {
                return callBack(error);

            }
            return callBack(null, results);
        });
    },
    createTrip: (data, callBack) => {
        let queryString = `INSERT INTO trips
                            (numberOfMinutes, date, carId)
                            VALUES
                            (?, ?, ?)
        `
        let params = Object.values(data);
        console.log("x:", data, params);
        pool.query(queryString, params, (error, results, fields) => {
            if (error) {
                return callBack(error);

            }
            return callBack(null, results);
        });
    },
    getUserByUserEmail: (email, callBack) => {
        let queryString = `select * from registration where email = ?`;
        let params = [email];
        pool.query(queryString, params, (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results[0]);
        });
    },
    getUsers: callBack => {
        const queryString = `select * from registration`;
        const params = [];
        pool.query(queryString, params, (error, results, fields) => {
            if (error) {
                return callBack(error);

            }
            return callBack(null, results);
        });
    },
    getCars: callBack => {
        const queryString = `select * from cars`;
        const params = [];
        pool.query(queryString, params, (error, results, fields) => {
            if (error) {
                return callBack(error);

            }
            return callBack(null, results);
        });
    },
    getCarsABC: callBack => {
        const queryString = `select name, id from cars
                                order by name`;
        const params = [];
        pool.query(queryString, params, (error, results, fields) => {
            if (error) {
                return callBack(error);

            }
            return callBack(null, results);
        });
    },
    getTrips: callBack => {
        const queryString = `select * from trips`;
        const params = [];
        pool.query(queryString, params, (error, results, fields) => {
            if (error) {
                return callBack(error);

            }
            return callBack(null, results);
        });
    },
    getTripsCar: callBack => {
        const queryString = `select t.id, t.numberOfMinutes, DATE_FORMAT(t.date, "%Y.%m.%d %H:%i") date, c.name, c.id carId from trips t
                                inner join cars c on c.id = t.carId
                                order by t.date DESC`;
        const params = [];
        pool.query(queryString, params, (error, results, fields) => {
            if (error) {
                return callBack(error);

            }
            return callBack(null, results);
        });
    },
    getUserByUserId: (id, callBack) => {
        const queryString = `select * from registration where id=?`;
        const params = [id];
        // params= []
        // const queryString = `select * from registration where id=${id}`;
        // console.log(queryString);
        pool.query(queryString, params, (error, results, fields) => {
            if (error) {
                return callBack(error);

            }
            // return callBack(null, results[0]);
            return callBack(null, results);
        });
    },
    getCarById: (id, callBack) => {
        const queryString = `select * from cars where id=?`;
        const params = [id];
        pool.query(queryString, params, (error, results, fields) => {
            if (error) {
                return callBack(error);

            }
            return callBack(null, results[0]);
        });
    },
    getCarByHourlyRate: (hourlyRate, callBack) => {
        //biztonságos megodás
        // const queryString = `select * from cars where hourlyRate < ?`;
        // const params = [hourlyRate];
        //öngyilkos megoldás
        const queryString = `select * from cars where hourlyRate < ${hourlyRate}`;
        const params = [];
        pool.query(queryString, params, (error, results, fields) => {
            if (error) {
                return callBack(error);

            }
            return callBack(null, results);
        });
    },
    getTripById: (id, callBack) => {
        const queryString = `select id, numberOfMinutes, DATE_FORMAT(date, "%Y-%m-%dT%H:%i") date, carId from trips where id=?`;
        const params = [id];
        pool.query(queryString, params, (error, results, fields) => {
            if (error) {
                return callBack(error);

            }
            return callBack(null, results[0]);
        });
    },
    getTripsByCarId: (carId, callBack) => {
        const queryString = `select * from trips where carId=?`;
        const params = [carId];
        pool.query(queryString, params, (error, results, fields) => {
            if (error) {
                return callBack(error);

            }
            return callBack(null, results);
        });
    },
    updateUser: (data, callBack) => {
        const queryString = `update registration set 
                    firstName=?, lastName=?, gender=?, email=?, password=?, number=?
                    where id=?`;
        const params = Object.values(data);
        pool.query(queryString, params, (error, results, fields) => {
            console.log(params, queryString, results);
            if (error) {
                return callBack(error);

            }
            return callBack(null, results);
        });
    },
    updateCar: (data, callBack) => {
        const queryString = `UPDATE cars set
                name=?, licenseNumber=?, hourlyRate=?
                where id= ?`;
        // const params = Object.values(data);
        const params = [
            data.name,
            data.licenseNumber,
            data.hourlyRate,
            data.id
        ]
        console.log("Update car:",params);
        pool.query(queryString, params, (error, results, fields) => {
            console.log(params, queryString, results);
            if (error) {
                return callBack(error);

            }
            return callBack(null, results);
        });
    },
    updateTrip: (data, callBack) => {
        const queryString = `UPDATE trips SET
                numberOfMinutes=?, date=?, carId=?
                where id=?;
                `;
        // const params = Object.values(data);
        params = [
            data.numberOfMinutes,
            data.date,
            data.carId,
            data.id
        ]
        pool.query(queryString, params, (error, results, fields) => {
            // console.log(params, queryString, results);
            if (error) {
                return callBack(error);

            }
            return callBack(null, results);
        });
    },
    deleteUser: (data, callBack) => {
        const queryString = `delete from registration where id = ?`;
        const params = [data.id];
        pool.query(queryString, params, (error, results, fields) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results);
        });
    },
    deleteCar: (data, callBack) => {
        const queryString = `delete from cars where id = ?`;
        const params = [data.id];
        pool.query(queryString, params, (error, results, fields) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results);
        });
    },
    deleteTrip: (data, callBack) => {
        const queryString = `delete from trips where id = ?`;
        const params = [data.id];
        pool.query(queryString, params, (error, results, fields) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results);
        });
    }
};