/*
 * @Author: andy 
 * @Date: 2019-06-30 23:10:17 
 * @Last Modified by: andy
 * @Last Modified time: 2019-06-30 23:18:20
 */

const bcrypt = require('bcryptjs')
const {
    sequelize
} = require('../../core/db')
const {
    Sequelize,
    Model
} = require('sequelize')

// 定义管理员模型
class Admin extends Model {

}

// 初始用户模型
Admin.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // 登录名称
    name: Sequelize.STRING,
    flag: Sequelize.INTEGER(2),
    phone: Sequelize.INTEGER(11),
    // 管理员昵称
    nickname: Sequelize.STRING,
    // 管理员邮箱
    email: {
        type: Sequelize.STRING(128),
        unique: true
    },
    // 管理员密码
    password: {
        type: Sequelize.STRING,
        set(val) {
            // 加密
            const salt = bcrypt.genSaltSync(10);
            // 生成加密密码
            const psw = bcrypt.hashSync(val, salt);
            this.setDataValue("password", psw);
        }
    }
}, {
    sequelize,
    tableName: 'user'
})


module.exports = {
    Admin
}