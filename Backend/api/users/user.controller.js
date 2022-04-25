const {
    create,
    getUserByUserId,
    getUsers,
    updateUser,
    deleteUser,
    getUserByUserName,
    getSeries,
    getSeriesABC,
    getSeriesById,
    getSeriesRelease,
    createSeries,
    updateSeries,
    deleteSeries,
    getFavorites,
    getFavoriteById,
    createFavorite,
    updateFavorite,
    deleteFavorite
} = require("./user.service.js");

const {
    genSaltSync,
    hashSync,
    compareSync
} = require("bcrypt");

const {
    sign
} = require("jsonwebtoken");

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        console.log(body);
        body.password = hashSync(body.password, salt);
        create(body, (err, results) => {

            console.log(results);

            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: -1,
                    message: "database connection error",
                    data: {}
                });
            }
            if (results.affectedRows == 0) {
                return res.status(200).json({
                    success: 0,
                    message: "Not created user",
                    data: results
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Created user",
                data: results
            });
        });
    },
    createSeries: (req, res) => {
        const body = req.body;
        console.log(body);
        createSeries(body, (err, results) => {
            console.log(results);
            if (err) {
                console.log(err);
                // console.log("Hiba");
                return res.status(500).json({
                    success: -1,
                    message: "database connection error",
                    data: {}
                })
                ;
            }
            if (results.affectedRows == 0) {
                return res.status(200).json({
                    success: 0,
                    message: "Not created series",
                    data: results
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Created series",
                data: results
            });
        });
    },
    createFavorite: (req, res) => {
        const body = req.body;
        console.log(body);
        createFavorite(body, (err, results) => {
            console.log(results);
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: -1,
                    message: "database connection error",
                    data: {}
                });
            }
            if (results.affectedRows == 0) {
                return res.status(200).json({
                    success: 0,
                    message: "Not created favorite",
                    data: results
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Created favorite",
                data: results
            });
        });
    },
    createComment: (req, res) => {
        const body = req.body;
        console.log(body);
        createComment(body, (err, results) => {
            console.log(results);
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: -1,
                    message: "database connection error",
                    data: {}
                });
            }
            if (results.affectedRows == 0) {
                return res.status(200).json({
                    success: 0,
                    message: "Not created comment",
                    data: results
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Created comment",
                data: results
            });
        });
    },
    getUserByUserId: (req, res) => {
        const id = req.params.id;
        getUserByUserId(id, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: -1,
                    message: "Server error",
                    data: {}
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 0,
                    message: "Record not found!",
                    data: {}
                })
            }
            return res.status(200).json({
                success: 1,
                message: "Record found!",
                data: results
            });
        });
    },
    getFavoriteById: (req, res) => {
        const id = req.params.id;
        getFavoriteById(id, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: -1,
                    message: "Server error",
                    data: {}
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 0,
                    message: "Record not found!",
                    data: {}
                })
            }
            return res.status(200).json({
                success: 1,
                message: "Record found!",
                data: results
            });
        });
    },
    getSeriesById: (req, res) => {
        const id = req.params.id;
        getSeriesById(id, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: -1,
                    message: "Server error",
                    data: {}
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 0,
                    message: "Record not found!",
                    data: {}
                })
            }
            return res.status(200).json({
                success: 1,
                message: "Record found!",
                data: results
            });
        });
    },
    getSeriesRelease: (req, res) => {
        const hourlyRate = req.params.hourlyRate;
        getSeriesRelease(Release, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: -1,
                    message: "Server error",
                    data: {}
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 0,
                    message: "Record not found!",
                    data: {}
                })
            }
            return res.status(200).json({
                success: 1,
                message: "Record found!",
                data: results
            });
        });
    },
    getUsers: (req, res) => {
        getUsers((err, results) => {
            if (err) {
                return res.status(500).json({
                    success: -1,
                    message: "Server error",
                    data: []
                });
            }
            if (results.length == 0) {
                return res.status(200).json({
                    success: 0,
                    message: "No records",
                    data: results
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Get successfully",
                data: results
            });
        });
    },
    getSeries: (req, res) => {
        getSeries((err, results) => {
            if (err) {
                return res.status(500).json({
                    success: -1,
                    message: "Server error",
                    data: []
                });
            }
            if (results.length == 0) {
                return res.status(200).json({
                    success: 0,
                    message: "No records",
                    data: results
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Get successfully",
                data: results
            });
        });
    },
    getSeriesABC: (req, res) => {
        getSeriesABC((err, results) => {
            if (err) {
                return res.status(500).json({
                    success: -1,
                    message: "Server error",
                    data: []
                });
            }
            if (results.length == 0) {
                return res.status(200).json({
                    success: 0,
                    message: "No records",
                    data: results
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Get successfully",
                data: results
            });
        });
    },
    getFavorites: (req, res) => {
        getFavorites((err, results) => {
            if (err) {
                return res.status(500).json({
                    success: -1,
                    message: "Server error",
                    data: []
                });
            }
            if (results.length == 0) {
                return res.status(200).json({
                    success: 0,
                    message: "No records",
                    data: results
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Get successfully",
                data: results
            });
        });
    },
    getComments: (req, res) => {
        getFavorites((err, results) => {
            if (err) {
                return res.status(500).json({
                    success: -1,
                    message: "Server error",
                    data: []
                });
            }
            if (results.length == 0) {
                return res.status(200).json({
                    success: 0,
                    message: "No records",
                    data: results
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Get successfully",
                data: results
            });
        });
    },
    updateUsers: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: -1,
                    message: "Server error",
                    data: {}
                });
            }
            if (results.affectedRows == 0) {
                return res.status(200).json({
                    success: 0,
                    message: "Not updated",
                    data: results
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Updated successfully",
                data: results
            });
        });
    },
    updateSeries: (req, res) => {
        const body = req.body;
        updateSeries(body, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: -1,
                    message: "Server error",
                    data: {}
                });
            }
            if (results.affectedRows == 0) {
                return res.status(200).json({
                    success: 0,
                    message: "Not updated",
                    data: results
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Updated successfully",
                data: results
            });
        });
    },
    updateFavorite: (req, res) => {
        const body = req.body;
        updateFavorite(body, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: -1,
                    message: "Server error",
                    data: {}
                });
            }
            if (results.affectedRows == 0) {
                return res.status(200).json({
                    success: 0,
                    message: "Not updated",
                    data: results
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Updated successfully",
                data: results
            });
        });
    },
    deleteUser: (req, res) => {
        const data = req.body;
        deleteUser(data, (err, results) => {
            // console.log(results);
            if (err) {
                res.status(500).json({
                    deletedRows: 0,
                    success: -1,
                    message: "Server error"
                })
                return;
            }
            if (results.affectedRows == 0) {
                return res.status(200).json({
                    success: 0,
                    message: "Record Not Found",
                    data: results
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Deleted successfully",
                data: results
            });
        });
    },
    deleteSeries: (req, res) => {
        const data = req.body;
        deleteSeries(data, (err, results) => {
            // console.log(results);
            if (err) {
                res.status(500).json({
                    deletedRows: 0,
                    success: -1,
                    message: "Server error"
                })
                return;
            }
            if (results.affectedRows == 0) {
                return res.status(200).json({
                    success: 0,
                    message: "Record Not Found",
                    data: results
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Deleted successfully",
                data: results
            });
        });
    },
    deleteFavorite: (req, res) => {
        const data = req.body;
        deleteFavorite(data, (err, results) => {
            // console.log(results);
            if (err) {
                res.status(500).json({
                    deletedRows: 0,
                    success: -1,
                    message: "Server error"
                })
                return;
            }
            if (results.affectedRows == 0) {
                return res.status(200).json({
                    success: 0,
                    message: "Record Not Found",
                    data: results
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Deleted successfully",
                data: results
            });
        });
    },
    login: (req, res) => {
        const body = req.body;
        getUserByUserName(body.userName, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Invalid userName or password",
                    token: "",
                    data: {}
                });
            }
            const result = compareSync(body.password, results.password);
            if (result) {
                results.password = undefined;
                const jsontoken = sign({
                    result: results
                }, "qwe1234", {
                    expiresIn: "1h"
                });
                return res.json({
                    success: 1,
                    message: "login successfully",
                    token: jsontoken,
                    data: results
                });
            } else {
                return res.json({
                    success: 0,
                    message: "Invalid userName or password",
                    token: "",
                    data: {}
                });
            }
        });
    }

}