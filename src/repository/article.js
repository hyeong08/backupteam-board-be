const {Article} = require("../models/article.js")
const { findOneById } = require("./db.js")

// 전체 게시글 (홈)
const getArticles = async (perPage, startIndex) => {
    const [articlesCount] = await conn.execute('select count(*) as count from articles')
    const [articles] = await conn.execute("select * from articles order by id desc limit ? OFFSET ?", [perPage, startIndex])
    const lastPage = Math.ceil(articlesCount[0].count / perPage)
    return {
        perPage, 
        lastPage, 
        currentPage: page || 1
    },
    articles
}

// 게사글 상세조회
const getArticle = async (id) => {
    return await findOneById("articels", id)
}

// 게시글 작성
const createArticle = async (title, contents, user_id) => {
    return await conn.execute(
        "insert into articles (title, contents, user_id) values (?,?,?)", 
        [title, contents, user_id]
    )
}

// 게시글 수정
const updateArticle = async (title, contents, id) => {
    return await conn.execute(
        "update articles set title = ?, contents = ? where id = ?",
        [title, contents, id]
    )
}

// 게시글 삭제
const deleteArticle = async (id) => {
    return await conn.execute(
        "delete from articles where id = ?",
        [id]
    )
}

module.exports = {getArticles, getArticle, createArticle, updateArticle, deleteArticle}