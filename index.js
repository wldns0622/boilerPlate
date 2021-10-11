// express 받아오기
const express = require('express');
// app 만들기
const app = express();
// server port번호 지정
const port = 5000;

app.get('/', (req, res) => res.send('Hello, World!'));

app.listen(port, () => console.log(`Server Conneted... Port: ${port}`));