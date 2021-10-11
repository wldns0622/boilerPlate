// module
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// model
const { User } =require("./models/User");
const config = require('./config/key');

const app = express();
const port = 5000;

// application/x-ww-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// pplication/json
app.use(bodyParser.json());

mongoose.connect(config.mongoURI)
.then(() => console.log('MongoDB Connected...'))
.catch((err) => console.log(err));

app.get('/', (req, res) => res.send('hello, world!'));

app.post('/register', (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if(err) return res.json({success: false, err});
    return res.status(200).json({success: true});
  });
})

app.listen(port, () => console.log(`Server Conneted... Port: ${port}`));