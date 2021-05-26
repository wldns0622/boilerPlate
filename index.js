const express = require("express");
const app = express();
const port = 5000;

// 몽구스를 이용해 앱과 몽고디비를 연결
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://quokka:0000@boilerplate.aguen.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log(":::MongoDB CONNECT:::"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
