const { User } = require("../models/user")

// 로그인 
const getUserByEmailAndPassword = async (email, password) => {
    return await User.findOne({where: {email, password}})
}
  
// 유저 정보 확인
 const getUserInfo = async (id) => {
    return await User.findByPk(id)
}

module.exports = {
    getUserByEmailAndPassword,
    getUserInfo
}