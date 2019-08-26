const Router = require('koa-router')
// const {
//     equipmentDao
// } = require('../../dao/equipment');

const {
    Resolve
} = require('../../lib/helper');

const res = new Resolve();
// 设置接口统一地址
const router = new Router({
    prefix: '/v1/equipment'
})
const allConfig = require('../../../config/config')
const db = require('../../../core/db-util')(allConfig.db)

// 管理员注册

router.post('/list', async (ctx) => {
    let param = ctx.body; //  query

    let list = await db.execSql(`select * from T_MDA_EQUIPMENT `, [])
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json(list)
})

router.post('/listadd', async (ctx) => {
    let obj = ctx.request.body //  query
    let list = await db.save('T_MDA_EQUIPMENT', obj);
  
    // db.find
    // db.update
    // db.save
    // db.execSql
    // db.execTransaction

    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json(list)
})

module.exports = router