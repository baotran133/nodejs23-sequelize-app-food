// const Restaurant = require('../models/restaurant');
// const Food = require('../models/food');
// const Food_Type = require('../models/food_type');

const sequelize = require("../models/index");
const initModel = require("../models/init-models");
const model = initModel(sequelize);
const { successCode, errorCode, failCode } = require("../ulti/response");

//demo get data relationship
const getFood = async (req, res) => {
    // quan hệ 1 - n
    // const data = await model.food.findAll({ include: "type" });

    // const data2 = await model.food_type.findAll({ include: "foods" });

    //quan hệ n - n
    const data3 = await model.restaurant.findAll({ include: "user_id_users" });

    // res.status(200).send(data3);
    successCode(res, data3);
};

const getRestaurant = async (req, res) => {
    // const data = await Restaurant.findAll();
    const data = await model.restaurant.findAll();

    // res.status(200).send(data);
    successCode(res, data);
};

const getRestaurantById = async (req, res) => {
    try {
        const { id } = req.params;

        // const data = await Restaurant.findAll({
        //     where: {
        //         res_id: id
        //     }
        // })

        // const data2 = await Restaurant.findByPk(id);
        const data2 = await model.restaurant.findByPk(id);

        if (data2)
            // res.status(200).send(data2);
            successCode(res, data2);
        // res.status(400).send("Nhà hàng không tồn tại");
        else errorCode(res, "Nhà hàng không tồn tại");
    } catch {
        // res.status(500).send("Err");
        failCode(res);
    }
};

const createRestaurant = async (req, res) => {
    const { res_name, image, desc } = req.body;

    let object = {
        res_name,
        image,
        desc
    };

    // const data = await Restaurant.create(object);
    const data = await model.restaurant.create(object);

    // res.status(200).send(data);
    successCode(res, data);
};

const updateRestaurant = async (req, res) => {
    const { id } = req.params;
    const { res_name, image, desc } = req.body;

    let object = {
        res_name,
        image,
        desc
    };

    // let checkRes = await Restaurant.findByPk(id);
    let checkRes = await model.restaurant.findByPk(id);

    if (checkRes) {
        // let data = await Restaurant.update(object, {
        //     where: {
        //         res_id: id
        //     }
        // })

        let data = await model.restaurant.update(object, {
            where: {
                res_id: id
            }
        });

        // let dataNew = await Restaurant.findByPk(id);
        let dataNew = await model.restaurant.findByPk(id);

        // res.status(200).send(dataNew);
        successCode(res, dataNew);
    } else {
        // res.status(400).send("Không tìm thấy dữ liệu !");
        errorCode(res, "Không tìm thấy dữ liệu !");
    }
};

const deleteRestaurant = async (req, res) => {
    const { id } = req.params;

    // let checkRes = await Restaurant.findByPk(id);
    let checkRes = await model.restaurant.findByPk(id);

    if (checkRes) {
        // let data = await Restaurant.destroy({
        //     where: {
        //         res_id: id
        //     }
        // })

        let data = await model.restaurant.destroy({
            where: {
                res_id: id
            }
        });
        // res.status(200).send("Xóa thành công");
        successCode(res, "Xóa thành công");
    } else {
        // res.status(400).send("Không tìm thấy dữ liệu !");
        errorCode(res, "Không tìm thấy dữ liệu !");
    }
};

const uploadRestaurant = async (req, res) => {
    const { filename } = req.file;
    const { id } = req.params;

    let getData = await model.restaurant.findByPk(id);

    let object = { ...getData, image: `/public/img/${filename}` };
    /*
        object.res_id = getData.res_id;
        object.res_name = getData.res_name;
        object.image = filename;
        object.desc = getData.desc;
    */
    await model.restaurant.update(object, {
        where: {
            res_id: id
        }
    });

    successCode(res, filename);
};

module.exports = {
    getRestaurant,
    getRestaurantById,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
    getFood,
    uploadRestaurant
};
