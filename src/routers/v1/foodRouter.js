const express = require("express");
const foodController = require("../../controllers/foodController");
const foodRouter = express.Router();

foodRouter.get("/getFood", foodController.getFood);
foodRouter.post("/createFood", foodController.createFood);

module.exports = foodRouter;
