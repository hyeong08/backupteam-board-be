const {u} = require("../models/user.js")
const {a} = require("../models/article.js")

// 로그인 
const getUserByEmailAndPassword = async (email, password) => {
    return await u.findOne({where: {email, password}})
}
  
// 유저 정보 확인
 const getUserInfo = async (id) => {
    return await u.findByPk(id, {include: [{
        model: a,
        limit: 3
    }]})
}

module.exports = {getUserByEmailAndPassword,getUserInfo}