const {Sequelize, Op} = require('sequelize')
const {Admin } = require('../models/admin');


class userDao {

    // 删除用户
    static async destroyUser(id) {
        // 检测是否存在文章
        const admin = await Admin.findOne({
            where: {
                id,
                deleted_at: null
            }
        });
        // 不存在抛出错误
        if (!admin) {
            throw new global.errs.NotFound('没有找到相关文章');
        }
        // 软删除文章
        admin.destroy()
    }
    // 更新用户
    static async updateSave(id, v) {
        // 查询文章
        const admin = await Admin.findByPk(id);
        if (!admin) {
            throw new global.errs.NotFound('没有找到相关文章');
        }
        // 更新文章
        admin.email = v.get('body.email');
        admin.password = v.get('body.password');
        admin.nickname = v.get('body.nickname');
        admin.save();
    }
    // 创建用户
    static async createUser(v) {
        const hasAdmin = await Admin.findOne({
            where: {
                email: v.get('body.email'),
                deleted_at: null
            }
        });

        if (hasAdmin) {
            throw new global.errs.Existing('管理员已存在');
        }

        const admin = new Admin();
        admin.email = v.get('body.email');
        admin.password = v.get('body.password');
        admin.nickname = v.get('body.nickname');

        admin.save();
    }
    // 获取用户列表
    static async getUserList(page = 1, desc = 'updated_at', keyword) {
        const pageSize = 10;

        // 筛选方式
        let filter = {
            deleted_at: null
        };
        // 筛选方式：存在搜索关键字
        if (keyword) {
            filter.email = {
                [Op.like]: `%${keyword}%`
            };
        }
        const user = await Admin.scope('iv').findAndCountAll({
            limit: pageSize, //每页10条
            offset: (page - 1) * pageSize,
            where: filter,
            order: [
                [desc, 'DESC']
            ]
        });
        const r = user.rows;

        return {
            data: r,
            // 分页
            meta: {
                current_page: parseInt(page),
                per_page: 10,
                count: user.count,
                total: user.count,
                total_pages: Math.ceil(user.count / 10),
            }
        };
    }
}

module.exports = {
    userDao
}