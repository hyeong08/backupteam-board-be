const jwt = require('jsonwebtoken');
const {jwtConfig} = require("../config/config")
const {getArticles, getArticle, createArticle} = require('../repository/article')

const allArticle = async (req, res) => {
    const { page } = req.query
    const perPage = 20
    const startIndex = ((page || 1) -1 ) * perPage
    const {lastPage,rows} = await getArticles(perPage, startIndex)
    return res.json({pageInfo : {perPage,lastPage,currentPage: page || 1}, articles: rows})
}

const detailArticle = async (req, res) => {
    const { id } = req.params
    const article = await getArticle(id)
        if (!article) {
            return res.json({message: "게시글 조회 실패"})
        }
    return res.json(article)
}

const postArticle = async (req, res) => {
    if(!req.cookies.jwt) {
      return res.json({message: "로그인 이후 이용 가능합니다"})
    }
    const {id} = jwt.verify(req.cookies.jwt, jwtConfig.secretKey)
    const {title, contents} = req.body
    await createArticle(id,title,contents)
    return res.json({message: "작성 완료"})
}

// const putArticle = async (req, res) => {
//     if (!req.cookies.jwt) {
//       return res.status(401).json({message : "로그인해주세요"})
//     }
//     const { id } = req.params
//     const {title, contents} = req.body
//     await updateArticle(title,contents,id)
//     return res.json({message: "수정 완료"})
// }

// const delArticle = async (req, res) => {
//     if (!req.cookies.jwt) {
//       return res.status(401).json({message : "로그인해주세요"})
//     }
//     const { id } = req.params
//     await deleteArticle(id)
//     return res.json({message : "삭제 완료"})
// }

module.exports = {allArticle, detailArticle, postArticle}