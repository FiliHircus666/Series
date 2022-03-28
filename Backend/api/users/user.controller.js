const {
    create,
    getUserByUserId,
    getUsers,
    updateUser,
    deleteUser,
    getUserByUserEmail,
    getCars,
    getCarsABC,
    getCarById,
    getCarByHourlyRate,
    createCar,
    updateCar,
    deleteCar,
    getTrips,
    getTripsCar,
    getTripById,
    getTripsByCarId,
    createTrip,
    updateTrip,
    deleteTrip
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
    createCar: (req, res) => {
        const body = req.body;
        console.log(body);
        createCar(body, (err, results) => {
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
    createTrip: (req, res) => {
        const body = req.body;
        console.log(body);
        createTrip(body, (err, results) => {
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
    getTripById: (req, res) => {
        const id = req.params.id;
        getTripById(id, (err, results) => {
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
    getTripsByCarId: (req, res) => {
        const carId = req.params.carId;
        getTripsByCarId(carId, (err, results) => {
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
    getCarById: (req, res) => {
        const id = req.params.id;
        getCarById(id, (err, results) => {
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
    getCarByHourlyRate: (req, res) => {
        const hourlyRate = req.params.hourlyRate;
        getCarByHourlyRate(hourlyRate, (err, results) => {
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
    getCars: (req, res) => {
        getCars((err, results) => {
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
    getCarsABC: (req, res) => {
        getCarsABC((err, results) => {
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
    getTrips: (req, res) => {
        getTrips((err, results) => {
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
    getTripsCar: (req, res) => {
        getTripsCar((err, results) => {
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
    updateCar: (req, res) => {
        const body = req.body;
        updateCar(body, (err, results) => {
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
    updateTrip: (req, res) => {
        const body = req.body;
        updateTrip(body, (err, results) => {
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
    deleteCar: (req, res) => {
        const data = req.body;
        deleteCar(data, (err, results) => {
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
    deleteTrip: (req, res) => {
        const data = req.body;
        deleteTrip(data, (err, results) => {
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
        getUserByUserEmail(body.email, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Invalid email or password",
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
                    message: "Invalid email or password",
                    token: "",
                    data: {}
                });
            }
        });
    }

}