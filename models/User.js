const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    minlength: 5
  },
  lastname: {
    type: String,
    maxlength: 50
  },
  role: {
    type: Number,
    default: 0
  },
  image: String,
  token: {
    type: String
  },
  tokenExp: {
    type: Number
  }
})

  // 저장을 하기전에 실행되는 메서드
userSchema.pre('save', function( next ) {
  // 비밀번호를 암호화 시킨다.
  var user = this;
  if(user.isModified('password')) {
    // salt 생성
    bcrypt.genSalt(saltRounds, function(err, salt) {
      if(err) return next(err);

      // 비밀번호에 salt 적용하고 그 값을 패스워드에 적용
      bcrypt.hash( user.password, salt, function(err, hash) {
        if(err) return next(err);
        user.password = hash;
        next();
      })
    })
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function(plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
    if(err) return cb(err);
    return cb(null, isMatch);
  })
}

userSchema.methods.generateToken = function(cb) {
  var user = this;
  var token = jwt.sign(user._id.toHexString(), 'secretToken');

  user.token = token;
  user.save(function(err, user) {
    if(err) return cb(err);
    cb(null, user);
  })
}

const User = mongoose.model('User', userSchema);
module.exports = {User};