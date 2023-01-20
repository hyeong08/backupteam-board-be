const mysql = require("mysql2/promise")

const connection = async () => {
    let conn = await mysql.createConnection({
        host: "caredog-test.c0o6spnernvu.ap-northeast-2.rds.amazonaws.com",
        user: "sparta",
        password: "tmvkfmxk2022",
        database: "sparta_backup"
    })
    console.log("DB 연결 완료")
    return conn
}

module.exports = (() => {
    return connection()
})()