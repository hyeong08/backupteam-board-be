const express = require('express')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken') // npm i jsonwebtoken
const users = require('./db/users')
const articles = require('./db/articles')
const cors = require('cors')

const app = express()
const port = 7100

// app.use(cors()) // npm i cors
//CORS(Cross-Origin Resource Sharing)란 자신이 속하지 않은 다른 도메인, 다른 프로토콜, 혹은 다른 포트에 있는 리소스를 요청하는 cross-origin HTTP 요청 방식이다.
app.use(cookieParser())
app.use(express.json())

let corsOptions = {
    origin: 'http://localhost:7000',
    credentials: true
}

app.use(cors(corsOptions))

const jwtConfig = {
    secretKey : 'YoUrSeCrEtKeY', // 원하는 시크릿 ㅍ키
    options : {
        algorithm : "HS256", // 해싱 알고리즘
        expiresIn : "30m",  // 토큰 유효 기간
        issuer : "hs" // 발행자
    }
}


// 게시글 가져오는 API
//     - 게시글 가져와서 상위 10개 응답
app.get('/', (req,res) => {
    const pageArticles = [...articles]
    res.send(pageArticles.splice(0,10))
})

// 로그인 API
//     - email, password 받아서 해당하는 유저가 존재하는지 확인
//     - 존재 한다면 jwt sign 으로 토큰 만들어서 쿠키 생성
//     - 존재 하지 않는다면 404 로 리턴
app.post('/login', (req,res) => {
    const { email, password } = req.body
    const user = users.find(user => user.email === email && user.password === password)

    if (!user) {
        return res.send("아이디를 찾지 못하였습니다")
    }

    if (user.password !== password) {
        return res.send("비밀번호를 확인해주세요")
    }

    // console.log(user)
    const token = jwt.sign({name : user.name, id : user.id}, jwtConfig.secretKey, jwtConfig.options)
    res.cookie('jwt', token) // res.cookie('만들고싶은이름', 만들고싶은값)
    console.log(req.cookies)
    res.send({result:true})
})

// 쿠키로 특정 사용자 정보를 가져오는 API (JWT)
//     - 쿠키에서 jwt 토큰으로 verify 결과로 user 정보 가져옴
//     - verify 실패하면 예외 처리
//     - 성공하면 user 정보 응답
app.get('/profile', (req,res) => {
    const userToken = jwt.verify(req.cookies.jwt, jwtConfig.secretKey)
    
    if (!userToken) {
        return res.send("로그인부터 해주세요")        
    }
    const user = users.find(user => user.email === email)
    if (!user) {
        return res.send("회원 정보가 잘못되었습니다")
    }
    res.json(user)
})

// 특정 게시글 하나만 가져오는 API
//     - query/path param 받은 아이디로 게시글 find 해서 응답 
app.get('/articles/:id', (req,res) => {
    res.send('게시글 상세 조회')
})


// 게시글 등록 API 
//     - 로그인 했는지 확인 
//     - 로그인 안되어있으면 예외처리
//     - 로그인 되어있으면 받은 body json 으로 aricles push
app.post('/articles', (req,res) => {
    res.send('게시글 작성')
})

// 게시글 수정 API 
//    - 로그인 되엉있는지 확인
//    - 로그인 된 사용자가 수정될글 user_id 와 같은지 확인
//    - 위에 둘중 하나라도 실패하면 예외
//    - 받은 게시글 id 의 글을 수정
app.put('/articles/:id', (req,res) => {
    res.send('게시글 수정')
})

// 게시글 삭제 API
//    - 로그인 되엉있는지 확인
//    - 로그인 된 사용자가 수정될글 user_id 와 같은지 확인
//    - 위에 둘중 하나라도 실패하면 예외
//    - 받은 아이디에 해당하는 게시글을 삭제
app.delete('/articles/:id', (req,res) => {
    res.send('게시글 삭제')
})


app.listen(port, () => {
    console.log(port, '서버 실행')
} )


// // 쿠키파서 사용 등록
// const cookieParser = require("cookie-parser")
// app.use(cookieParser())

// // 쿠키 가져오기
// const email = req.cookies.email

// // 쿠키 만들기
// res.cookie("email", email)