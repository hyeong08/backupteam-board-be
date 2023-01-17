const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 7100;

const connection = mysql.createConnection({
  host: "caredog-test.c0o6spnernvu.ap-northeast-2.rds.amazonaws.com",
  user: "sparta",
  password: "tmvkfmxk2022",
  database: "sparta_backup"
})

connection.connect()

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

// 메인페이지 게시글
app.get('/articles', (req, res) => {
  const { page } = req.query
  const perPage = 10
  const startIndex = ((page || 1)  -1 ) * perPage
  connection.query(`select count(*) from hs1_articles`, (error, rows, fields) => {
    const lastPage = Math.ceil(rows[0]['count(*)'] / perPage)
    connection.query(`select * from hs1_articles order by id desc limit ${perPage} offset ${startIndex}`, (error, rows, fields) => {
      res.json({
          pageInfo : {
            perPage,
            lastPage,
            currentPage: page || 1
          },
          rows})
    })
  })
})


// 로그인 
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  connection.query(`select * from users where email = "${email}" and password = "${password}"`, (error, rows, fields) => {

    if (!rows[0]) {
      return res.json({message: "찾지 못하였습니다"});
    }

    const token = jwt.sign({ email : rows[0].email }, jwtConfig.secretKey, jwtConfig.options);
    res.cookie('jwt', token); 
    // res.cookie('만들고싶은이름', 만들고싶은값)
    // res.send({ result: true });

    res.json({message: "로그인 완료"})
  }) 
});

// 유저 정보 확인
app.get('/users', (req, res) => {
  
  if (!req.cookies.jwt) {
    return res.json({message: "로그인부터 해주세요"});
  }
  
  const userToken = jwt.verify(req.cookies.jwt, jwtConfig.secretKey);
  
  const {email} = userToken
  connection.query(`select name, email from users where email = "${email}"`, (error, rows, fields) => {

    res.send(rows[0])
  })
});

// 게시글 상세조회
app.get('/articles/:id', (req, res) => {
  const { id } = req.params
  connection.query(`select * from articles where id = "${id}"`, (error, rows, fields) => {
    if (!rows[0]) {
      return res.json({message: "게시글 조회 실패"})
    }
  res.json(rows[0])
  })
});

// 게시글 작성 
app.post('/articles', (req, res) => {
  
  if(!req.cookies.jwt) {
    return res.json({message: "로그인 이후 이용 가능합니다"})
  }

  const {title, contents} = req.body
  // const created_at = new Date()

  connection.query(`insert into hs1_articles (title, contents) values("${title}", "${contents}")`, (error, rows, fields) => {

  res.json({message: "작성 완료"})
  })
});

// 게시글 수정 
app.put('/articles/:id', (req, res) => {

  if (!req.cookies.jwt) {
    return res.status(401).json({message : "로그인해주세요"})
  }
  const { id } = req.params
  const {title, contents} = req.body

  connection.query(`update hs1_articles set title = "${title}" , contents = "${contents}" where id = ${id}`, (error, rows, fields) => {

  res.json({message: "수정 완료"})
  })
});


// 게시글 삭제 
app.delete('/articles/:id', (req, res) => {

  if (!req.cookies.jwt) {
    return res.status(401).json({message : "로그인해주세요"})
  }

  const { id } = req.params

  connection.query(`delete from hs1_articles where id = "${id}"`, (error, rows, fields) => {
  
    res.json("삭제 완료")
  })
});

app.listen(port, () => {
  console.log(port, "서버 실행");
});
