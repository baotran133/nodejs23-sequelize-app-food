const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
const config = require("../src/config/index");
app.use(express.json());
app.use(cors());
app.use(express.static("."));
const conn = mysql.createConnection({
    host: config.db_host,
    user: config.db_user,
    password: config.db_password,
    database: config.db_name
});

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");

//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin,X-Requested-With,Content-Type,Accept"
//   );
//   next();
// });
app.listen("8080", () => {
    conn.connect((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("DB ORDER CONNECTED!!!");
        }
    });
});

const rootRouter = require("./routers/index");

app.use("/api", rootRouter);
