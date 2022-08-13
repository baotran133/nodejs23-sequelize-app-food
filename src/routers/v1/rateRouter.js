const express = require("express");
const rateController = require("../../controllers/rateController");
const rateRouter = express.Router();
rateRouter.post("/createRate", rateController.createRate);
rateRouter.get(
    "/getAllRateListedByRes",
    rateController.getAllRateListedByRestaurant
);
rateRouter.get(
    "/getAllRateListedByUser",
    rateController.getAllRateListedByUser
);
rateRouter.get("/getRateByUser/:user_id", rateController.getRateByUserId);
rateRouter.get("/getRateByRes/:res_id", rateController.getRateByRestaurantId);
module.exports = rateRouter;
