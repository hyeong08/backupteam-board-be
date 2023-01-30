const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const {corsOptions} = require("./src/config/config")
const articleRouter = require('./src/routings/article')
const userRouter = require('./src/routings/user')
const tagRouter = require('./src/routings/tag')

const app = express();
const port = 7100;

app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));
app.use('/articles', [articleRouter, tagRouter])
app.use(userRouter)


app.listen(port, () => {
  console.log(port, "서버 실행");
});
