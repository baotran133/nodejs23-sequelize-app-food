console.log("abc");
const express = require("express");
const app = express();

app.listen("8080", () => {
    console.log("Success!!!!");
});

//GET
//url bat dau bang dau "/" ket thuc khong co dau "/"
//req: request nhan gia tri tu FE
//res: response: BE tra gia tri ve FE

app.get("/test", (req, res) => {
    res.send("Sample1");
});
//GET WHERE
//url sau dau "/" la ":param"
app.get("/test/:hoTen/:lop", (req, res) => {
    const { hoTen, lop } = req.params;

    res.send([hoTen, lop]);
});

app.use(express.json());

const lstData = [
    {
        id: "1",
        hoTen: "Nguyen Van A",
        lop: "1A"
    },
    {
        id: "2",
        hoTen: "Nguyen Van B",
        lop: "1B"
    }
];

//POST
app.post("/them", (req, res) => {
    const { username, password } = req.body;
    lstData.push(req.body);
    console.log(lstData);
    res.status(200).send(lstData);
});
//PUT
app.put("/update/:id", (req, res) => {
    const { id } = req.params;
    const { hoTen, lop } = req.body;
    const index = lstData.findIndex((i) => i.id == id);
    lstData[index].hoTen = hoTen;
    lstData[index].lop = lop;
    //   lstData.map((item) => {
    //     if (item.id == id) {
    //       item.hoTen = hoTen;
    //       item.lop = lop;
    //     }
    //   });
    res.status(200).send(lstData);
});
//DELETE
app.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    const index = lstData.findIndex((i) => i.id == id);
    console.log(index);
    if (index >= 0) {
        lstData.splice(index, 1);
    }

    res.status(200).send(lstData);
});
