const express = require("express")
const router = express.Router()

const {allArticle, detailArticle} = require("../controller/article")

// 게시글 홈
router.get("/", allArticle)
// 게시글 상세조회
router.get("/:id", detailArticle)
// // 게시글 작성
// router.post("/", postArticle)
// // 게시글 수정
// router.put("/:id", putArticle)
// // 게시글 삭제
// router.delete("/:id", delArticle)

module.exports = router