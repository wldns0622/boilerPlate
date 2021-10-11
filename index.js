// module
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// model
const { User } =require("./models/User");

const app = express();
const port = 5000;

// application/x-ww-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// pplication/json
app.use(bodyParser.json());

mongoose.connect(`mongodb+srv://daramjwi:1q2w3e4r!1@boilerplate.itvuc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
.then(() => console.log('MongoDB Connected...'))
.catch((err) => console.log(err));

app.get('/', (req, res) => res.send('wow!'));

app.post('/register', (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if(err) return res.json({success: false, err});
    return res.status(200).json({success: true});
  });
})

app.listen(port, () => console.log(`Server Conneted... Port: ${port}`));