const { Sequelize, DataTypes } = require('sequelize');
const { u } = require('./user');

const sequelize = new Sequelize('sparta_backup', 'sparta', 'tmvkfmxk2022', {
    host: 'caredog-test.c0o6spnernvu.ap-northeast-2.rds.amazonaws.com',
    dialect: 'mysql'
});

const a = sequelize.define('articles', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: DataTypes.STRING,
    contents: DataTypes.STRING,
    count: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    created_at: DataTypes.DATE
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

a.u = a.belongsTo(u, {
    foreignKey: 'user_id'
})

u.a = u.hasMany(a, {
    foreignKey: 'user_id'
})
// 순환참조로 인해 user.js에 넣으면 무한루프로 돌기때문에 article.js에 넣어줌

module.exports = {a}