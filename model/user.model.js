const { DataTypes } = require('sequelize');
const sequelize = require("../db/index.js")

const User = sequelize.define("User", {
    user_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: "用户名称"
    },
    password: {
        type: DataTypes.CHAR(64),
        allowNull: false,
        comment: '用户密码'
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        comment: "用户邮箱"
    },
    role: {
        type: DataTypes.TINYINT,
        allowNull: false,
        comment: "用户权限 1,2,3,4 依次往下即可, 0: 游客",
        defaultValue: 0
    }
},{
    tableName: 'users'
})

/* 强制更新数据库表 仅创建的时候使用 生产不要使用 */
// User.sync({ force: true });
module.exports = User