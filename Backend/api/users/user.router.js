const {
    createUser,
    getUserByUserId,
    getUsers,
    updateUsers,
    deleteUser,
    login,
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
} = require("./user.controller.js")
const router = require("express").Router();
const {checkToken} = require("../../auth/token_validation");

router.post("/users/", checkToken, createUser);
router.get("/users/", checkToken, getUsers);
router.get("/users/:id", checkToken, getUserByUserId);
router.put("/users/", checkToken, updateUsers);
router.delete("/users/", checkToken, deleteUser);
router.post("/users/login", login)


router.post("/cars", checkToken, createCar);
router.get("/cars", checkToken, getCars);
router.get("/carsabc", checkToken, getCarsABC);
router.get("/cars/:id", checkToken, getCarById);
router.get("/carshrst/:hourlyRate", checkToken, getCarByHourlyRate);
router.put("/cars/", checkToken, updateCar);
router.delete("/cars/", checkToken, deleteCar);

router.post("/trips", checkToken, createTrip);
router.get("/trips", checkToken, getTrips);
router.get("/tripscar", checkToken, getTripsCar);
router.get("/trips/:id", checkToken, getTripById);
router.get("/tripsbycarid/:carId", checkToken, getTripsByCarId);
router.put("/trips/", checkToken, updateTrip);
router.delete("/trips/", checkToken, deleteTrip);

// app.get("/api", (req, res)=>{
//     res.json({
//         success: 1,
//         message: "this is rest api working"
//     });
// });

module.exports = router;