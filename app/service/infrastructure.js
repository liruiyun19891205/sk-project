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
            ID,
            ...obj
        } = param
        return infrastructureDao.update(ID, obj);
    }

    static async remove(id) {
        return infrastructureDao.remove({
            id: id
        });
    }

    static async getInfo(id) {
        return infrastructureDao.getInfo({
            id: id
        });
    }
}

module.exports = {
    infrastructureManger
}