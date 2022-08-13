const sequelize = require("../models/index");
const initModel = require("../models/init-models");
const { successCode, errorCode, failCode } = require("../ulti/response");
const model = initModel(sequelize);

const createRate = async (req, res) => {
    try {
        const { user_id, res_id, amount, date_rate } = req.body;
        const data_user = await model.user.findByPk(user_id);
        const data_res = await model.restaurant.findByPk(res_id);
        const isExist = await model.rate_res.findOne({
            where: {
                user_id,
                res_id
            }
        });
        //data da ton tai ( user da rate nha hang nay, trung khoa chinh, thong bao da rate)
        if (isExist) {
            errorCode(res, "Da rate");
            //nguoi dung chua dang nhap hoac khong ton tai
        } else if (!data_user) {
            errorCode(res, "Tai khoan khong ton tai");
            //nha hang khong ton tai trong danh sach nha hang da luu
        } else if (!data_res) {
            errorCode(res, "Nha hang ko ton tai");
        } else {
            obj = {
                user_id,
                res_id,
                amount,
                date_rate
            };
            const data = await model.rate_res.create(obj);
            if (data) {
                successCode(res, "Rate thanh cong!");
            } else {
                errorCode(res, "Rate khong thanh cong");
            }
        }
    } catch {
        failCode(res);
    }
};

const getAllRateListedByUser = async (req, res) => {
    const data = await model.user.findAll({
        include: "res_id_restaurant_rate_res"
    });

    successCode(res, data);
};
const getAllRateListedByRestaurant = async (req, res) => {
    const data = await model.restaurant.findAll({
        include: "user_id_user_rate_res"
    });

    successCode(res, data);
};
const getRateByUserId = async (req, res) => {
    const { user_id } = req.params;
    const data = await model.user.findAll({
        include: "res_id_restaurant_rate_res",
        where: {
            user_id: user_id
        }
    });
    successCode(res, data);
};
const getRateByRestaurantId = async (req, res) => {
    const data = await model.restaurant.findAll({
        include: "user_id_user_rate_res",
        where: {
            res_id: req.params.res_id
        }
    });
    successCode(res, data);
};

module.exports = {
    createRate,
    getAllRateListedByUser,
    getAllRateListedByRestaurant,
    getRateByUserId,
    getRateByRestaurantId
};
