const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('sparta_backup', 'sparta', 'tmvkfmxk2022', {
    host: 'caredog-test.c0o6spnernvu.ap-northeast-2.rds.amazonaws.com',
    dialect: 'mysql'
});

const a = sequelize.define('hs1_articles', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: DataTypes.STRING,
    contents: DataTypes.STRING,
    count: {
        type : DataTypes.INTEGER,
        defaultValue : 0
    },
    created_at: DataTypes.DATE
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

module.exports = {a}