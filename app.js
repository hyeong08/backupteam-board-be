const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const users = require('./db/users');
const articles = require('./db/articles');
const cors = require('cors');
const { at } = require('./db/users');

const app = express();
const port = 7100;

app.use(cookieParser());
app.use(express.json());

let corsOptions = {
  origin: 'http://localhost:7000',
  credentials: true,
};

app.use(cors(corsOptions));

const jwtConfig = {
  secretKey: 'YoUrSeCrEtKeY',
  options: {
    algorithm: 'HS256',
    expiresIn: '30m',
    issuer: 'hs',
  },
};

// 메인페이지 게시글 (완료)
app.get('/', (req, res) => {
  res.send([...articles].splice(0,10));
});

// 로그인 (완료)
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!user) {
    return res.send('아이디를 찾지 못하였습니다');
  }

  if (user.password !== password) {
    return res.send('비밀번호를 확인해주세요');
  }

  const token = jwt.sign({ name: user.name, id: user.id }, jwtConfig.secretKey, jwtConfig.options);
  res.cookie('jwt', token); // res.cookie('만들고싶은이름', 만들고싶은값)
  // res.send({ result: true });
  res.json("로그인 완료")
});

// 유저 정보 확인 (완료)
app.get('/users', (req, res) => {

  const userToken = jwt.verify(req.cookies.jwt, jwtConfig.secretKey);
  if (!userToken) {
    return res.send('로그인부터 해주세요');
  }

  const user = users.find(user => user.id === userToken.id);
  if (!user) {
    return res.send('회원 정보가 잘못되었습니다');
  }
  res.json(user);
});

// 게시글 상세조회 (완료)
app.get('/articles/:id', (req, res) => {
  const { id } = req.params
  const article = articles.find(art => art.id == id)

  if (!article) {
    return res.json({message: "게시글 조회 실패"})
  }

  res.json(article);
});

// 게시글 작성 (완료)
app.post('/articles', (req, res) => {
  const {title, contents} = req.body
  const created_at = new Date()
  console.log({title, contents})

  if(!req.cookies.jwt) {
    return res.json({message: "로그인 이후 이용 가능합니다."})
  }
  
  const user = users.find(user => user.id === jwt.verify(req.cookies.jwt, jwtConfig.secretKey).id)

  // 게시글 id값에 +1 시켜서 적용하는 방법이긴 한데 db를 연결했을때 어떻게 될지 잘 모르겠음.
  const maxObjArr = articles.reduce( (prev, value) => {
    return prev.guildMemberCount >= value.guildMemberCount ? prev : value
  });
  articles.push({id : maxObjArr.id + 1,title, contents, user_id: user.id,created_at,count:0 })

  res.send('게시글 작성 완료');
});

// 게시글 수정 (완료)
app.put('/articles/:id', (req, res) => {

  // 로그인 여부 판단
  if (!req.cookies.jwt) {
    return res.status(401).json({message : "로그인해주세요"})
  }

  const { id } = req.params
  const article = articles.find(art => art.id == id)

  const user = users.find(user => user.id === jwt.verify(req.cookies.jwt, jwtConfig.secretKey).id)

  if (user.id !== article.user_id) {
    return res.json({message: "권한 없음"})
  }

  const title = req.body.title || article.title
  const contents = req.body.contents || article.contents

  article.title = title
  article.contents = contents
  
  res.json({message: "수정 완료"})
});


// 게시글 삭제 (완료)
app.delete('/articles/:id', (req, res) => {

  // 로그인 여부 판단
  if (!req.cookies.jwt) {
    return res.status(401).json({message : "로그인해주세요"})
  }

  const { id } = req.params
  const article = articles.find(art => art.id == id)

  const user = users.find(user => user.id === jwt.verify(req.cookies.jwt, jwtConfig.secretKey).id)

  if (user.id !== article.user_id) {
    return res.json({message: "권한 없음"})
  }

  const index = articles.indexOf(article);
    articles.splice(index, 1);

  res.send('게시글 삭제');
});

app.listen(port, () => {
  console.log(port, '서버 실행');
});

// // 쿠키파서 사용 등록
// const cookieParser = require("cookie-parser")
// app.use(cookieParser())

// // 쿠키 가져오기
// const email = req.cookies.email

// // 쿠키 만들기
// res.cookie("email", email)
