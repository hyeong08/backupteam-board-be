const jwt = require("jsonwebtoken");
const {jwtConfig} = require('../config/config');
const {getUserByEmailAndPassword,getUserInfo} = require('../repository/user.js')

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await getUserByEmailAndPassword(email, password)
    if(!user) {
      return res.json({message: "찾지 못하였습니다"})
    }
    const token = jwt.sign({ id: user.id }, jwtConfig.secretKey, jwtConfig.options);
    res.cookie('jwt', token);
    res.json({message: "로그인 완료"})
}
const userInfo = async (req, res) => {
    if (!req.cookies.jwt) {
      return res.json({message: "로그인부터 해주세요"});
    }
    const userToken = jwt.verify(req.cookies.jwt, jwtConfig.secretKey);
    const {id} = userToken
    const inFo = await getUserInfo(id)
    res.json(inFo)
}
const logout = (req, res) => {
    res.clearCookie('jwt')
    res.json({message: "로그아웃"})
}

module.exports = {login,userInfo,logout}