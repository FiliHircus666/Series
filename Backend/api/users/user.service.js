const pool = require("../../config/database.js");

module.exports = {
    create: (data, callBack) => {
        let queryString = `insert into users
            (userName,password,email,permission)
            values
            (?,?,?,?)
        `
        let params = [
            data.userName,
            data.password,
            data.email,
            data.permission
        ];
        pool.query(queryString, params, (error, results, fields) => {
            if (error) {
                return callBack(error);

            }
            return callBack(null, results);
        });
    },
    createSeries: (data, callBack) => {
        let queryString = `INSERT INTO series
                    (seriesName,releaseDate,ageLimit,categoryId)
                    VALUES
                    (?, ?, ?, ?)
        `
        let params = [
            data.seriesName,
            data.releaseDate,
            data.ageLimit,
            data.categoryId
        ];
        pool.query(queryString, params, (error, results, fields) => {
            if (error) {
                return callBack(error);

            }
            return callBack(null, results);
        });
    },
    createCategories: (data, callBack) => {
        let queryString = `INSERT INTO categories
        (categoryName)
        VALUES
        (?)
        `
        let params = Object.values(data);
        pool.query(queryString, params, (error, results, fields) => {
            if (error) {
                return callBack(error);

            }
            return callBack(null, results);
        });
    },
    updateCategories: (data, callBack) => {
        const queryString = `UPDATE categories SET
        categoryName = ?
     WHERE id = ?`;
        // const params = Object.values(data);
        const params = [
            data.CategoryName,
            data.id
        ]
        console.log("Update category:",params);
        pool.query(queryString, params, (error, results, fields) => {
            console.log(params, queryString, results);
            if (error) {
                return callBack(error);

            }
            return callBack(null, results);
        });
    },
    getCategories: callBack => {
        const queryString = `select * from categories`;
        const params = [];
        pool.query(queryString, params, (error, results, fields) => {
            if (error) {
                return callBack(error);

            }
            return callBack(null, results);
        });
    },
    getCategoriesById: (id, callBack) => {
        const queryString = `select * from categories where id=?`;
        const params = [id];
        pool.query(queryString, params, (error, results, fields) => {
            if (error) {
                return callBack(error);

            }
            return callBack(null, results[0]);
        });
    },
    deleteCategories: (data, callBack) => {
        const queryString = `delete from categories where id = ?`;
        const params = [data.id];
        pool.query(queryString, params, (error, results, fields) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results);
        });
    },
    createFavorite: (data, callBack) => {
        let queryString = `INSERT INTO favorites
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
        let queryString = `INSERT INTO comments
        (userId,comment,seriesId,ratePoint)
        VALUES
        (?,?,?,?);
        `
        let params = [
            data.userId,
            data.comment,
            data.seriesId,
            data.ratePoint
        ];
        console.log("x:", data, params);
        pool.query(queryString, params, (error, results, fields) => {
            if (error) {
                return callBack(error);

            }
            return callBack(null, results);
        });
    },
    getUserByUserName: (userName, callBack) => {
        let queryString = `select * from users where userName = ?`;
        let params = [userName];
        pool.query(queryString, params, (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results[0]);
        });
    },
    getUsers: callBack => {
        const queryString = `select * from users`;
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
        const queryString = `select seriesName, id from series
                                order by seriesName`;
        const params = [];
        pool.query(queryString, params, (error, results, fields) => {
            if (error) {
                return callBack(error);

            }
            return callBack(null, results);
        });
    },
    getFavorites: callBack => {
        const queryString = `select * from favorites `;
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
        const queryString = `select * from users where id=?`;
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
        const queryString = `select * from comments`;
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
    getSeriesLink:  callBack => {
        //biztonságos megodás
        const queryString = `SELECT s.name,s.releaseDate,s.ageLimit,sl.videoLink FROM series s
        LEFT JOIN serieslink sl on s.id = sl.seriesId`;
        const params = [];
        //öngyilkos megoldás
        // const queryString = `select * from series where Release `;
        // const params = [];
        pool.query(queryString, params, (error, results, fields) => {
            if (error) {
                return callBack(error);

            }
            console.log("results:",results);
            return callBack(null, results);
        });
    },
    getSeriesLinkById:  callBack => {
        //biztonságos megodás
        const queryString = `
        SELECT * FROM serieslink WHERE id = ?`;
        const params = [];
        //öngyilkos megoldás
        // const queryString = `select * from series where Release `;
        // const params = [];
        pool.query(queryString, params, (error, results, fields) => {
            if (error) {
                return callBack(error);

            }
            console.log("results:",results);
            return callBack(null, results);
        });
    },
    getFavoriteById: (id, callBack) => {
        const queryString = `select * from favorites where id=?`;
        const params = [id];
        pool.query(queryString, params, (error, results, fields) => {
            if (error) {
                return callBack(error);

            }
            return callBack(null, results[0]);
        });
    },
    updateUser: (data, callBack) => {
        const queryString = `update users set 
                    userName=?, password=?, email=?, permission=?
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
        seriesName=?, releaseDate=?, ageLimit=?, categoryId=?
                where id= ?`;
        // const params = Object.values(data);
        const params = [
            data.seriesName,
            data.releaseDate,
            data.ageLimit,
            data.categoryId,
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
        const queryString = `UPDATE favorites SET
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
        const queryString = `UPDATE comments SET
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
    updateSeriesLink: (data, callBack) => {
        const queryString = `UPDATE comments SET
                seriesId=?, videoLink = ? 
                where id=?;
                `;
        // const params = Object.values(data);
        params = [
            data.seriesId,
            data.videoLink,
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
        const queryString = `delete from users where id = ?`;
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
    deleteSeriesLink: (data, callBack) => {
        const queryString = `delete from serieslinks where id = ?`;
        const params = [data.id];
        pool.query(queryString, params, (error, results, fields) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results);
        });
    },
    deleteFavorite: (data, callBack) => {
        const queryString = `delete from favorites where id = ?`;
        const params = [data.id];
        pool.query(queryString, params, (error, results, fields) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results);
        });
    },
    deleteComment: (data, callBack) => {
        const queryString = `delete from comments where id = ?`;
        const params = [data.id];
        pool.query(queryString, params, (error, results, fields) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results);
        });
    }
};