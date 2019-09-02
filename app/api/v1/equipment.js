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
    let param = ctx.request.body; //  query
    var sql = "  select * from T_MDA_EQUIPMENT where 1=1  ";
    let sqlCount = `select count(id) as count  from T_MDA_EQUIPMENT where 1=1 `;
    let sqlVal = [];
    let countVal = [];
    if (param.SUB_PRO_NAME) {
        let like = `%${param.SUB_PRO_NAME}%`;
        sql += ` and SUB_PRO_NAME like ?`;
        sqlCount += ` and SUB_PRO_NAME like ?`;
        sqlVal.push(like);
        countVal.push(like);
    }
    if (param.pageSize && param.index) {
        sql += `limit ${(param.index - 1) * param.pageSize},${param.pageSize}`;
    }

    let [list, [{ count }]] = await db.execTransaction([{
        sql: sql,
        param: sqlVal
    }, {
        sql: sqlCount,
        param: countVal
    }])
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json({ list, count })
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
//删除
router.post('/listdel', async (ctx) => {
    let obj = ctx.request.body //  query
    console.log(obj);
    let list = await db.remove('T_MDA_EQUIPMENT', obj);
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json(list)
})
//编辑页面首次加载根据id查询
router.post('/listByid', async (ctx) => {
    let param = ctx.request.body; //  query
    let list = await db.find('T_MDA_EQUIPMENT', param)
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json(list)
})


//编辑页面首次加载根据id查询
router.post('/listEditid', async (ctx) => {
    let param = ctx.request.body; //  query
    let { id, ...obj } = param;
    // update(table, moduleBean, whereParam)
    // db.update(tableName, {level:'12', nick:'jerry'}, {id:'115', name:'hou'});
    let list = await db.update('T_MDA_EQUIPMENT', obj, { id })
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json(list)
})

module.exports = router