const {
    //create
    createUser,
    createSeries,
    createFavorite,
    createComment,
    //login
    login,
    //get
    getUsers,
    getSeries,
    getFavorites,
    getUserByUserId,
    getSeriesById,
    getFavoriteById,
    getSeriesABC,
    getSeriesRelease,
    //update
    updateUsers,
    updateSeries,
    updateFavorite,
    //delete
    deleteUser,
    deleteSeries,
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


router.post("/user/favorite/series", checkToken, createSeries);
router.get("user/favorite/series", checkToken, getSeries);
router.get("/seriesabc", checkToken, getSeriesABC);
router.get("/series/:id", checkToken, getSeriesById);
router.get("/seriesr/:Release", checkToken, getSeriesRelease);
router.put("/user/favorite/series/", checkToken, updateSeries);
router.delete("/user/favorite/series/", checkToken, deleteSeries);

router.post("/user/series/favorite", checkToken, createFavorite);
router.get("/user/series/favorite", checkToken, getFavorites);
router.get("/favorites/:id", checkToken, getFavoriteById);
router.put("/user/series/favorite", checkToken, updateFavorite);
router.delete("/user/series/favorite", checkToken, deleteFavorite);

router.post("/user/series/favorite", checkToken, createComment);
router.get("/user/series/favorite", checkToken, getComments);
router.get("/favorites/:id", checkToken, getCommnetById);
router.put("/user/series/favorite", checkToken, updateComment);
router.delete("/user/series/favorite", checkToken, deleteComment);


// app.get("/api", (req, res)=>{
//     res.json({
//         success: 1,
//         message: "this is rest api working"
//     });
// });

module.exports = router;