const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// salt가 몇글자인지 나타냄 -> 10자리인 암호화 salt를 생성함
const saltRounds = 10;

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
  }
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
