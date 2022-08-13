const express = require("express");
const likeController = require("../../controllers/likeController");
const likeRouter = express.Router();

likeRouter.post("/createLike", likeController.createLike);
likeRouter.delete("/unlike", likeController.deleteLike);
likeRouter.get(
    "/getAllLikeListedByRes",
    likeController.getAllLikeListedByRestaurant
);
likeRouter.get(
    "/getAllLikeListedByUser",
    likeController.getAllLikeListedByUser
);
likeRouter.get("/getLikeByRes/:res_id", likeController.getLikeByRestaurantId);
likeRouter.get("/getLikeByUser/:user_id", likeController.getLikeByUserId);

module.exports = likeRouter;
