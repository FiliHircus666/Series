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
    getFavorites,
    getFavoriteById,
    createFavorite,
    updateFavorite,
    deleteFavorite,
    createComment,
    getComments,
    updateComment,
    deleteComment,
    getSeriesLink,
    deleteSeriesLink,
    updateSeriesLink,
    getSeriesLinkById
} = require("./user.controller.js")
const router = require("express").Router();
const {checkToken} = require("../../auth/token_validation");

router.post("/users/register", checkToken, createUser);
router.get("/users/", checkToken, getUsers);
router.get("/users/:id", checkToken, getUserByUserId);
router.put("/users/", checkToken, updateUsers);
router.delete("/users/", checkToken, deleteUser);
router.post("/users/login", login)


router.post("/user/series", checkToken, createSeries);
router.get("/user/series", checkToken, getSeries);
router.get("/seriesabc", checkToken, getSeriesABC);
router.get("/user/series/:id", checkToken, getSeriesById);
router.get("/user/seriesr/:releaseDate", checkToken, getSeriesRelease);
router.put("/user/series/", checkToken, updateSeries);
router.delete("/user/series/:id", checkToken, deleteSeries);

router.post("/user/favorite/series", checkToken, createFavorite);
router.get("/user/favorite/series", checkToken, getFavorites);
router.get("/user/series/favorites/:id", checkToken, getFavoriteById);
router.put("/user/series/favorite", checkToken, updateFavorite);
router.delete("/user/series/favorite", checkToken, deleteFavorite);

router.post("/user/series/comment", checkToken, createComment);
router.get("/user/favorite/series/comment", checkToken, getComments);
// router.get("/favorites/:id", checkToken, getCommentById);
router.put("/user/series/comment", checkToken, updateComment);
router.delete("/user/series/comment", checkToken, deleteComment);

router.get("/series/serieslink", checkToken, getSeriesLink);
router.delete("/series/serieslink", checkToken, deleteSeriesLink);
router.put("/series/serieslink", checkToken, updateSeriesLink);
router.get("/series/serieslink/:id", checkToken, getSeriesLinkById);


// app.get("/api", (req, res)=>{
//     res.json({
//         success: 1,
//         message: "this is rest api working"
//     });
// });

module.exports = router;