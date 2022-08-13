const express = require("express");
const orderController = require("../../controllers/orderController");
const orderRouter = express.Router();

orderRouter.post("/addOrder", orderController.addOrder);
orderRouter.delete("/deleteOrder", orderController.deleteOrder);
orderRouter.get("/getOrder/:id", orderController.getOrderById);
orderRouter.put("/updateOrder/:id", orderController.updateOrder);

module.exports = orderRouter;
