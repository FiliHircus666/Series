const pool = require("../../config/database.js");

module.exports = {
    create: (data, callBack) => {
        let queryString = `insert into user
            (userName,password,Email,permission)
            values
            (?,?,?,?)
        `
        let params = Object.values(data);
        pool.query(queryString, params, (error, results, fields) => {
            if (error) {
                return callBack(error);

            }
            return callBack(null, results);
        });
    },
    createSeries: (data, callBack) => {
        let queryString = `insert INTO series
                    (name,release,ageLimit)
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
    createFavorite: (data, callBack) => {
        let queryString = `INSERT INTO favorite
                            (userId,seriesId,Watched)
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
    createComment: (data, callBack) => {
        let queryString = `INSERT INTO comment
                            (userId,comment,seriesId,ratePoint)
                            VALUES
                            (?, ?, ?,?)
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
    getUserByUserName: (userName, callBack) => {
        let queryString = `select * from user where userName = ?`;
        let params = [userName];
        pool.query(queryString, params, (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results[0]);
        });
    },
    getUsers: callBack => {
        const queryString = `select * from user`;
        const params = [];
        pool.query(queryString, params, (error, results, fields) => {
            if (error) {
                return callBack(error);

            }
            return callBack(null, results);
        });
    },
    getSeries: callBack => {
        const queryString = `select * from series`;
        const params = [];
        pool.query(queryString, params, (error, results, fields) => {
            if (error) {
                return callBack(error);

            }
            return callBack(null, results);
        });
    },
    getSeriesABC: callBack => {
        const queryString = `select name, id from series
                                order by name`;
        const params = [];
        pool.query(queryString, params, (error, results, fields) => {
            if (error) {
                return callBack(error);

            }
            return callBack(null, results);
        });
    },
    createFavorites: callBack => {
        const queryString = `select * from Favorite`;
        const params = [];
        pool.query(queryString, params, (error, results, fields) => {
            if (error) {
                return callBack(error);

            }
            return callBack(null, results);
        });
    },
    getUserByUserId: (id, callBack) => {
        const queryString = `select * from user where id=?`;
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
    getSeriesById: (id, callBack) => {
        const queryString = `select * from series where id=?`;
        const params = [id];
        pool.query(queryString, params, (error, results, fields) => {
            if (error) {
                return callBack(error);

            }
            return callBack(null, results[0]);
        });
    },
    getSeriesRelease: (Release, callBack) => {
        //biztonságos megodás
        const queryString = `select * from series where Release = ?`;
        const params = [Release];
        //öngyilkos megoldás
        // const queryString = `select * from series where Release `;
        // const params = [];
        pool.query(queryString, params, (error, results, fields) => {
            if (error) {
                return callBack(error);

            }
            return callBack(null, results);
        });
    },
    getFavoriteById: (id, callBack) => {
        const queryString = `select * from favorite where id=?`;
        const params = [id];
        pool.query(queryString, params, (error, results, fields) => {
            if (error) {
                return callBack(error);

            }
            return callBack(null, results[0]);
        });
    },
    updateUser: (data, callBack) => {
        const queryString = `update user set 
                    userName=?, password=?, Email=?, permission=?
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
    updateSeries: (data, callBack) => {
        const queryString = `UPDATE series set
                name=?, release=?, ageLimit=?
                where id= ?`;
        // const params = Object.values(data);
        const params = [
            data.name,
            data.release,
            data.ageLimit,
            data.id
        ]
        console.log("Update series:",params);
        pool.query(queryString, params, (error, results, fields) => {
            console.log(params, queryString, results);
            if (error) {
                return callBack(error);

            }
            return callBack(null, results);
        });
    },
    updateFavorite: (data, callBack) => {
        const queryString = `UPDATE favorite SET
                userId, seriesId=?, Watched=?
                where id=?;
                `;
        // const params = Object.values(data);
        params = [
            data.userId,
            data.seriesId,
            data.Watced,
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
        const queryString = `delete from user where id = ?`;
        const params = [data.id];
        pool.query(queryString, params, (error, results, fields) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results);
        });
    },
    deleteSeries: (data, callBack) => {
        const queryString = `delete from series where id = ?`;
        const params = [data.id];
        pool.query(queryString, params, (error, results, fields) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results);
        });
    },
    deleteFavorite: (data, callBack) => {
        const queryString = `delete from favorite where id = ?`;
        const params = [data.id];
        pool.query(queryString, params, (error, results, fields) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results);
        });
    }
};