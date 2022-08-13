const sequelize = require("../models/index");
const initModel = require("../models/init-models");
const { successCode, errorCode, failCode } = require("../ulti/response");
const model = initModel(sequelize);
//Like
const createLike = async (req, res) => {
    const { user_id, res_id, date_like } = req.body;
    const data_user = await model.user.findByPk(user_id);
    const data_res = await model.restaurant.findByPk(res_id);
    const isExist = await model.like_res.findOne({
        where: {
            user_id,
            res_id
        }
    });
    //data da ton tai ( user da like nha hang nay, trung khoa chinh, thong bao da like)
    if (isExist) {
        errorCode(res, "Da like");
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
            date_like
        };
        try {
            const data = await model.like_res.create(obj);
            successCode(res, "Like!");
        } catch {
            failCode(res);
        }
    }
};
//Unlike
const deleteLike = async (req, res) => {
    const { user_id, res_id } = req.body;
    const data_user = await model.user.findByPk(user_id);
    const data_res = await model.restaurant.findByPk(res_id);
    const isExist = await model.like_res.findOne({
        where: {
            user_id,
            res_id
        }
    });
    //kiem tra data co ton tai hay khong (người dùng đã like nhà hàng đó hay chưa)
    if (isExist) {
        await model.like_res.destroy({
            where: {
                res_id
            }
        });
        successCode(res, `Unlike restaurant ${data_res.res_name}`);
    } else if (!data_user) {
        errorCode(res, "Tai khoan khong ton tai");
    } else if (!data_res) {
        errorCode(res, "Nha hang ko ton tai");
    } else {
        errorCode(res, "Chua like");
    }
};

const getAllLikeListedByRestaurant = async (req, res) => {
    const data = await model.restaurant.findAll({
        include: "user_id_users"
    });

    successCode(res, data);
};
const getAllLikeListedByUser = async (req, res) => {
    const data = await model.user.findAll({
        include: "res_id_restaurants"
    });

    // res.status(200).send(data);
    successCode(res, data);
};
const getLikeByUserId = async (req, res) => {
    const data = await model.user.findAll({
        include: "res_id_restaurants",
        where: {
            user_id: req.params.user_id
        }
    });

    // res.status(200).send(data);
    successCode(res, data);
};
const getLikeByRestaurantId = async (req, res) => {
    const data = await model.restaurant.findAll({
        include: "user_id_users",
        where: {
            res_id: req.params.res_id
        }
    });

    // res.status(200).send(data);
    successCode(res, data);
};
module.exports = {
    createLike,
    deleteLike,
    getAllLikeListedByUser,
    getAllLikeListedByRestaurant,
    getLikeByUserId,
    getLikeByRestaurantId
};
