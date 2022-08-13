const sequelize = require("../models/index");
const initModel = require("../models/init-models");
const { successCode, errorCode, failCode } = require("../ulti/response");
const model = initModel(sequelize);
//them order
const addOrder = async (req, res) => {
    const { user_id, food_id, amount, code, arr_sub_id } = req.body;
    const data_user = await model.user.findByPk(user_id);
    const data_food = await model.food.findByPk(food_id);
    const isExist = await model.order.findOne({
        where: {
            user_id,
            food_id
        }
    });
    //(table order nen co primary key order_id, đơn hàng có thể đặt trùng danh sách món cũ
    if (isExist) {
        errorCode(res, `Khong thanh cong, trung data`);
    }
    //user khong ton tai trong danh sach nha hang da luu
    else if (!data_user) {
        errorCode(res, "Tai khoan khong ton tai");
    }
    //food khong ton tai trong danh sach nha hang da luu
    else if (!data_food) {
        errorCode(res, "Mon an khong ton tai");
    } else {
        obj = {
            user_id,
            food_id,
            amount,
            code,
            arr_sub_id
        };
        try {
            const data = await model.order.create(obj);
            if (data) {
                successCode(res, "Da dat mon!");
            } else {
                errorCode(res, "Dat mon khong thanh cong!");
            }
        } catch {
            //catch sai data type o req.body,...
            failCode(res);
        }
    }
};
//Unlike
const deleteOrder = async (req, res) => {};
const updateOrder = async (req, res) => {};
const getOrderById = async (req, res) => {
    const data = await model.user.findAll({
        include: "res_id_restaurants"
    });
    // res.status(200).send(data);
    successCode(res, data);
};

module.exports = {
    addOrder,
    updateOrder,
    deleteOrder,
    getOrderById
};
