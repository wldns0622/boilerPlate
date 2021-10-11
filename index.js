// module
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// model
const { User } =require("./models/User");
const config = require('./config/key');

const app = express();
const port = 5000;

// application/x-ww-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// pplication/json
app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect(config.mongoURI)
.then(() => console.log('MongoDB Connected...'))
.catch((err) => console.log(err));

/** 루트 라우터 */
app.get('/', (req, res) => res.send('hello, world!'));

/** 회원가입 라우터 */
app.post('/register', (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if(err) return res.json({success: false, err});
    return res.status(200).json({success: true});
  });
})

/** 로그인 라우터 */
app.post('/login', (req, res) => {
  // 요청된 이메일을 데이터베이스에서 찾기
  User.findOne({ email: req.body.email }, (err, user) => {
    if(!user) {
      return res.json({
        loginSuccess: false, 
        message: "제공된 이메일에 해당하는 유저가 없습니다"
      })
    }
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch) return res.json({loginSuccess: false, message: "비밀번호 틀림"});
      
      user.generateToken((err, user) => {
        if(err) return res.status(400).send(err);

        // 토큰을 쿠키에 저장
        res.cookie("x_auth", user.token)
        .status(200)
        .json({ loginSuccess: true, userId: user._id})
      })
    })
  });
  // 이메일이 있다면 비밀번호를 확인하기
  // 비밀번호가 같다면 Token생성

})

app.listen(port, () => console.log(`Server Conneted... Port: ${port}`));