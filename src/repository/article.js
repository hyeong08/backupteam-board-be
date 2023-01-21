const {a} = require("../models/article.js")

// 전체 게시글 (홈)
const getArticles = async (perPage, startIndex) => {
    const {count, rows} = await a.findAndCountAll({order: [['id', 'desc']], offset: startIndex, limit: perPage})
    const lastPage = Math.ceil(count / perPage)
    return {lastPage,rows}
}

// 게사글 상세조회
const getArticle = async (id) => {
    return await a.findOne({where:{id}})
}

// 게시글 작성
const createArticle = async (id, title, contents) => {
    return await a.create({user_id : id, title, contents})
}

// // 게시글 수정
// const updateArticle = async (title, contents, id) => {
//     return await conn.execute(
//         "update articles set title = ?, contents = ? where id = ?",
//         [title, contents, id]
//     )
// }

// // 게시글 삭제
// const deleteArticle = async (id) => {
//     return await conn.execute(
//         "delete from articles where id = ?",
//         [id]
//     )
// }

module.exports = {getArticles, getArticle, createArticle}