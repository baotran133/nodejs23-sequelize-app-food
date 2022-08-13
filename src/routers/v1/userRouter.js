const express = require("express");
const userController = require("../../controllers/userController");
const userRouter = express.Router();

userRouter.get("/getUser", userController.getUser);
userRouter.post("/createUser", userController.createUser);
module.exports = userRouter;
// userRouter.get("/api/getUser", async (req, res) => {
//   const query = "SELECT * FROM user";
//   //   conn.query(query, (err, result) => {
//   //     if (err) {
//   //       res.status(500).send(err);
//   //     }
//   //     res.status(200).send(result);
//   //   });
//   try {
//     const result = await conn.promise().query(query);
//     res.status(200).send(result[0]);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

//GET ID
// userRouter.get("/api/getUser/:id", (req, res) => {
//   const { id } = req.params;
//   //   const query = `SELECT * FROM user WHERE user_id=${id}`;
//   const query = `SELECT * FROM user`;
//   conn.query(query, (err, result) => {
//     if (err) {
//       res.status(500).send(err);
//     }
//     const lstUser = result;
//     const rs = lstUser.find((item) => item.user_id == id);
//     res.status(200).send(rs);
//   });
//   //async - await
// });
// //POST
// userRouter.post("/api/addUser", (req, res) => {
//   const { full_name, email, pass_word } = req.body;
//   const query = `INSERT INTO user(full_name,email,pass_word) VALUES ('${full_name}','${email}','${pass_word}')`;
//   conn.query(query, (err, result) => {
//     if (err) {
//       res.status(500).send(err);
//     }
//     res.status(200).send(result);
//   });
// });

// //LOGIN
// userRouter.post("/api/login", async (req, res) => {
//   const { email, pass_word } = req.body;
//   const query = `SELECT * FROM user WHERE email='${email}' AND pass_word ='${pass_word}'`;
//   //   conn.query(query, (err, result) => {
//   //     if (err) {
//   //       res.status(500).send(err);
//   //     }
//   //     res.status(200).send(result);
//   //   });
//   try {
//     const result = await conn.promise().query(query);
//     if (result[0].length > 0) {
//       res.status(200).send(result[0]);
//     } else {
//       res.status(200).send("INVALID ACCOUNT");
//     }
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });
