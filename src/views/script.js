document.querySelector("#btn-user").onclick = function () {
  ketQua = "";
  axios({
    method: "POST",
    url: "http://localhost:8080/api/login",
    data: {
      email: document.querySelector("#email").value,
      pass_word: document.querySelector("#password").value,
    },
  }).then((result) => {
    if (typeof result.data == "string") {
      document.querySelector("#ketQua").innerHTML = result.data;
    } else {
      ketQua += JSON.stringify(result.data);
      console.log(result.data);
      document.querySelector("#ketQua").innerHTML = ketQua;
    }
  });
};
