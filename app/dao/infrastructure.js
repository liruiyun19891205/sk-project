const allConfig = require('../../config/config');
const db = require('../../core/db-util')(allConfig.db)


class infrastructureDao {
    /**
     * 获取列表
     * @param {*} page 
     * @param {*} desc 
     * @param {*} keyword 
     */
    static async getList(page = 1, pageSize = 10, param) {
        let start = (page - 1) * pageSize;
        let {
            ID
        } = param;
        let whereSql = ``;  // 在这里添加where条件
        if (ID) {
            whereSql += ` and ID=?`;
        }
        let sql = `select * from T_MDA_INFRASTRUCTURE where 1=1 ${whereSql} limit ?,?`;
        let values = [ID].filter(item => item); // 过滤掉假值\
        let [list, [{
            total
        }]] = await Promise.all([
            db.execSql(sql, [...values, start, pageSize]),
            db.count('T_MDA_INFRASTRUCTURE', param)
        ]);
        return {
            list: list || [],
            total: total || 0
        };
    }
    /**
     * 保存数据
     * @param {*} param 
     */
    static async save(param) {
        return db.save('T_MDA_INFRASTRUCTURE', param)
    }
    /**
     * 更新数据
     * @param {*} param 
     */
    static async update(id, param) {
        return db.update('T_MDA_INFRASTRUCTURE', param, {
            id: id
        })
    }
    /**
     * 删除数据
     * @param {*} param 
     */
    static async remove(id, param) {
        return db.remove('T_MDA_INFRASTRUCTURE', {
            id: id
        })
    }
    /**
     * 获取数据
     * @param {*} param 
     */
    static async getInfo(param) {
        let [info] = await db.find("T_MDA_INFRASTRUCTURE", param);
        return {
            data: info
        }
    }
}


module.exports = {
    infrastructureDao
};