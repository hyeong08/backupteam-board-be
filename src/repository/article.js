const {a} = require("../models/article.js")

// 전체 게시글 (홈)
const getArticles = async (perPage, startIndex) => {
    const {count, rows} = await a.findAndCountAll({order: [['id', 'desc']], offset: startIndex, limit: perPage})
    const lastPage = Math.ceil(count / perPage)
    return {lastPage,rows}
}

// 게사글 상세조회
const getArticle = async (id) => {
    return await a.findOne({id})
}

// // 게시글 작성
// const createArticle = async (title, contents, user_id) => {
//     return await conn.execute(
//         "insert into articles (title, contents, user_id) values (?,?,?)", 
//         [title, contents, user_id]
//     )
// }

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

module.exports = {getArticles, getArticle}