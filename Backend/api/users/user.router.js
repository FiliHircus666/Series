const {
    createUser,
    getUserByUserId,
    getUsers,
    updateUsers,
    deleteUser,
    login,
    getSeries,
    getSeriesABC,
    getSeriesById,
    getSeriesRelease,
    createSeries,
    updateSeries,
    deleteSeries,
    // getFavorites,
    getFavoriteById,
    createFavorites,
    updateFavorite,
    deleteFavorite
} = require("./user.controller.js")
const router = require("express").Router();
const {checkToken} = require("../../auth/token_validation");

router.post("/users/", checkToken, createUser);
router.get("/users/", checkToken, getUsers);
router.get("/users/:id", checkToken, getUserByUserId);
router.put("/users/", checkToken, updateUsers);
router.delete("/users/", checkToken, deleteUser);
router.post("/users/login", login)


router.post("/series", checkToken, createSeries);
router.get("/series", checkToken, getSeries);
router.get("/seriesabc", checkToken, getSeriesABC);
router.get("/series/:id", checkToken, getSeriesById);
router.get("/seriesr/:Release", checkToken, getSeriesRelease);
router.put("/series/", checkToken, updateSeries);
router.delete("/series/", checkToken, deleteSeries);

router.post("/Favorites", checkToken, createFavorites);
// router.get("/favorites", checkToken, getFavorites);
router.get("/favorites/:id", checkToken, getFavoriteById);
router.put("/favorite/", checkToken, updateFavorite);
router.delete("/favorite/", checkToken, deleteFavorite);

// app.get("/api", (req, res)=>{
//     res.json({
//         success: 1,
//         message: "this is rest api working"
//     });
// });

module.exports = router;