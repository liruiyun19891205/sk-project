const {
    infrastructureDao
} = require('../dao/infrastructure')

class infrastructureManger {
    // 管理员登录
    static async getList(page, pageSize, param) {
        // 验证账号密码是否正确
        const infrastructur = await infrastructureDao.getList(page, pageSize, param);

        return infrastructur;
    }

    static async save(param) {
        return infrastructureDao.save(param)
    }


    static async update(param) {
        let {
            id,
            ...obj
        } = param
        return infrastructureDao.update(id, obj);
    }

    static async remove(param) {
        let {
            id,
            ...obj
        } = param
        return infrastructureDao.remove(id);
    }

    static async getInfo(param) {
        return infrastructureDao.getInfo(param);
    }
}

module.exports = {
    infrastructureManger
}