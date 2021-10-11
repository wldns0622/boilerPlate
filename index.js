const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

mongoose.connect(`mongodb+srv://daramjwi:1q2w3e4r!1@boilerplate.itvuc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
  // useNewUrlParse: true,
  // useUnifiedTopology: true,
  // useCreateIndex: true,
  // useFindAndModify: false
})
.then(() => console.log('MongoDB Connected...'))
.catch((err) => console.log(err));

app.get('/', (req, res) => res.send('Hello, World!'));

app.listen(port, () => console.log(`Server Conneted... Port: ${port}`));