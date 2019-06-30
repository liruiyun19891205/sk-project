const Router = require('koa-router')

// const {
//     RegisterValidator,
//     AdminLoginValidator
// } = require('../../validators/admin')

const {
    AdminDao
} = require('../../dao/admin');

// const {
//     Auth

const {
    Resolve
} = require('../../lib/helper');

const res = new Resolve();
// 设置接口统一地址
const router = new Router({
    prefix: '/v1/product'
})
const allConfig = require('../../../config/config')
const db = require('../../../core/db-util')(allConfig.db)

// 管理员注册

router.post('/register', async (ctx) => {
    let param = ctx.body; //  query
    
    let list = await db.execSql("select * from user ", [])
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json(list)
})

module.exports = router