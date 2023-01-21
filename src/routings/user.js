const express = require("express")
const router = express.Router()
const {login,userInfo,logout} = require("../controller/user")

// 로그인
router.post("/login", login)
// 유저 상세조회
router.get("/userInfo", userInfo)
// 로그아웃
router.get("/logout", logout)

module.exports = router