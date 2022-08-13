// const Food = require("../models/food");
// const FoodType = require("../models/foodType");

// const food_type = require("../models/food_type");
const sequelize = require("../models/index");
const initModel = require("../models/init-models");
const model = initModel(sequelize);
const { successCode, errorCode, failCode } = require("../ulti/response");

const getFood = async (req, res) => {
    // const data = await Food.findAll({ include: FoodType });
    const data = await model.food.findAll({ include: "type" });
    const data2 = await model.food_type.findAll({ include: "foods" });
    // res.status(200).send(data2);
    successCode(res, data2);
};

const createFood = (req, res) => {
    res.send("Create food");
};

module.exports = { getFood, createFood };
