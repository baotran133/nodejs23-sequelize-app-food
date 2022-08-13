const express = require("express");
const resController = require("../../controllers/resController");
const multer = require("multer");
const resRouter = express.Router();
//cb callback func

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.cwd() + "/public/img");
    },
    filename: (req, file, cb) => {
        fileNewName = Date.now() + "_" + file.originalname;
        cb(null, fileNewName);
    }
});
const upload = multer({ storage });
//ham upload se duoc xu ly o middleware truoc khi duoc xu ly o ham req,res
resRouter.post(
    "/upload/:id",
    upload.single("image"),
    resController.uploadRestaurant
);

resRouter.get("/getRes", resController.getRestaurant);
resRouter.get("/getRes/:id", resController.getRestaurantById);
resRouter.post("/createRes", resController.createRestaurant);
resRouter.put("/updateRes", resController.updateRestaurant);
resRouter.post("/deleteRes:id", resController.deleteRestaurant);
module.exports = resRouter;
