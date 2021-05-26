const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const { User } = require("./models/User");
const config = require("./config/key");

// application/x-www-form-urlencoded를 분석
app.use(bodyParser.urlencoded({ extended: true }));
// application/json 타입의 데이터를 분석
app.use(bodyParser.json());

// 몽구스를 이용해 앱과 몽고디비를 연결
const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log(":::MongoDB CONNECT:::"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Connected Server");
});

app.post("/register", (req, res) => {
  // 회원가입 할때 필요한 정보들을 client에서 가져오면 그것들을 데이터 베이스에 넣어준다.
  const user = new User(req.body);

  // save라는 mongo 메서드를 이용해 user에 저장
  user.save((err, doc) => {
    //저장시 에러가 있다면... err메세지와 같이 실패 정보 전송
    if (err) return res.json({ success: false, err });

    //성공 했다면 상태코드 200과 성공했다는 메세지를 넘겨준다
    return res.status(200).json({ success: true });
  });
});

app.listen(port, () => {
  console.log(`Connected Server::: localhost:${port}`);
});
