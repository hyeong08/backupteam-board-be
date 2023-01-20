const express = require("express")
const router = express.Router()
const {userInfo,login} = require("../controller/user")

// 로그인
router.post("/login", login)
// 유저 상세조회
router.get("/users/:id", userInfo)

module.exports = router