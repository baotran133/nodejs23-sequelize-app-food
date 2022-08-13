const express = require("express");
const rootRouter = express.Router();
const userRouter = require("./v1/userRouter");
const resRouter = require("./v1/resRouter");
const foodRouter = require("./v1/foodRouter");
const likeRouter = require("./v1/likeRouter");
const orderRouter = require("./v1/orderRouter");
const rateRouter = require("./v1/rateRouter");
rootRouter.use("/user/v1", userRouter);
rootRouter.use("/res/v1", resRouter);
rootRouter.use("/food/v1", foodRouter);
rootRouter.use("/like/v1", likeRouter);
rootRouter.use("/order/v1", orderRouter);
rootRouter.use("/rate/v1", rateRouter);

module.exports = rootRouter;
