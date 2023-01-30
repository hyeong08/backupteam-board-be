const express = require("express")
const router = express.Router()

const {tags, tagArticles} = require("../controller/tag")


// 태그 페이지
router.get("/tags", tags)
// 해당 태그 게시글 목록
router.get("/tags/:tagId", tagArticles)


module.exports = router