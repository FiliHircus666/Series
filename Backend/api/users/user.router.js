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
    getSeriesLinkById,
    createCategories,
    getCategories,
    updateCategories,
    getCategoriesById,
    deleteCategories
    
} = require("./user.controller.js")
const router = require("express").Router();
const {checkToken} = require("../../auth/token_validation");

router.post("/register", checkToken, createUser);
router.get("/users/", checkToken, getUsers);
router.get("/users/:id", checkToken, getUserByUserId);
router.put("/users/", checkToken, updateUsers);
router.delete("/users/", checkToken, deleteUser);
router.post("/login", login)

router.post("/series", checkToken, createSeries);
router.get("/series", checkToken, getSeries);
router.get("/seriesabc", checkToken, getSeriesABC);
router.get("/series/:id", checkToken, getSeriesById);
router.get("/series/:releaseDate", checkToken, getSeriesRelease);
router.put("/series", checkToken, updateSeries);
router.delete("/series/:id", checkToken, deleteSeries);

router.post("/user/favorite/series", checkToken, createFavorite);
router.get("/user/favorite/series", checkToken, getFavorites);
router.get("/user/series/favorites/:id", checkToken, getFavoriteById);
router.put("/user/series/favorite", checkToken, updateFavorite);
router.delete("/user/series/favorite", checkToken, deleteFavorite);

router.post("/comment", checkToken, createComment);
router.get("/comment", checkToken, getComments);
// router.get("/comment/:id", checkToken, getCommentById);
router.put("/comment", checkToken, updateComment);
router.delete("/comment", checkToken, deleteComment);

router.post("/categories", checkToken, createCategories);
router.get("/categories", checkToken, getCategories);
router.delete("/categories", checkToken, deleteCategories);
router.put("/categories", checkToken, updateCategories);
router.get("/categories/:id", checkToken, getCategoriesById);

router.get("/series/serieslink", checkToken, getSeriesLink);
router.delete("/series/serieslink", checkToken, deleteSeriesLink);
router.put("/series/serieslink", checkToken, updateSeriesLink);
router.get("/series/serieslink/:id", checkToken, getSeriesLinkById);

module.exports = router;