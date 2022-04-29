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
        let queryString = `INSERT INTO series
                    (name,releaseDate,ageLimit)
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
                            (userId,seriesId,watched)
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
        (userId,userComment,seriesId,ratePoint)
        VALUES
        (?,?,?,?);
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
    getFavorites: callBack => {
        const queryString = `select * from favorite `;
        const params = [];
        // select distinct s.name from favorite f
        // INNER JOIN series s on s.id = f.seriesId
        // WHERE f.seriesId = ?
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
    getComments: callBack => {
        const queryString = `select  * from comment`;
        const params = [];
        pool.query(queryString, params, (error, results, fields) => {
            if (error) {
                return callBack(error);

            }
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
    getSeriesRelease: (releaseDate, callBack) => {
        //biztonságos megodás
        const queryString = `select * from series where releaseDate = ?`;
        const params = [releaseDate];
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
                name=?, releaseDate=?, ageLimit=?
                where id= ?`;
        // const params = Object.values(data);
        const params = [
            data.name,
            data.releaseDate,
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
                userId=?, seriesId=?, Watched=?
                where id=?;
                `;
        // const params = Object.values(data);
        params = [
            data.userId,
            data.seriesId,
            data.Watched,
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
    updateComment: (data, callBack) => {
        const queryString = `UPDATE comment SET
                userId=?, userComment=?, seriesId=?,ratePoint = ? 
                where id=?;
                `;
        // const params = Object.values(data);
        params = [
            data.userId,
            data.userComment,
            data.seriesId,
            data.ratePoint,
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
    },
    deleteComment: (data, callBack) => {
        const queryString = `delete from comment where id = ?`;
        const params = [data.id];
        pool.query(queryString, params, (error, results, fields) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results);
        });
    }
};