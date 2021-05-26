const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// salt가 몇글자인지 나타냄 -> 10자리인 암호화 salt를 생성함
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

// save가 일어나기전에 콜백을 실핸한다.
userSchema.pre('save', function (next) {
  // user는 현재 입력된 user
  var user = this;

  if (user.isModified('password')) {
    // save가 일어나기전에 여기서 비밀번호를 암호화 시킨 후 보낸다.
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
    // next();
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, callback) {
  // 플레인 패스워드와 데이터베이스에 있는 암호화된 비밀번호와 비교를 해야한다.
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

userSchema.methods.generateToken = function (callback) {
  var user = this;
  //jsoswebtoken을 이용해서 token을 생성하기
  let token = jwt.sign(user._id.toHexString(), 'secretToken');
  user.token = token;
  user.save(function (err, user) {
    if (err) return callback(err);
    callback(null, user);
  });
};

const User = mongoose.model('User', userSchema);

module.exports = { User };
