const Router = require('koa-router');

const {
    infrastructureManger
} = require('../../service/infrastructure');

const {
    Resolve
} = require('../../lib/helper');

const res = new Resolve();


const router = new Router({
    prefix: '/v1/infrastructure'
})

/**
 * 获取用户列表
 */
router.get('/getList', async (ctx) => {
    const {
        page,
        pageSize,
        param
    } = ctx.query;
    // 查询文章列表
    const list = await infrastructureManger.getList(page, pageSize, JSON.parse(param));
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json(list);
});

/**
 * 获取用户列表
 */
router.post('/save', async (ctx) => {
    const {
        ...param
    } = ctx.request.body;
    // 查询文章列表
    const list = await infrastructureManger.save(param);
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json(list);
});
/**
 * 获取用户列表
 */
router.put('/update', async (ctx) => {
    const {
        ...param
    } = ctx.request.body;
    // 查询文章列表
    const list = await infrastructureManger.update(param);
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json(list);
});
/**
 * 获取用户列表
 */
router.post('/remove', async (ctx) => {
    const {
        id
    } = ctx.request.body;
    // 查询文章列表
    const list = await infrastructureManger.remove(id);
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json(list);
});
/**
 * 获取用户列表
 */
router.post('/getInfo', async (ctx) => {
    const {
        id
    } = ctx.request.body;
    // 查询文章列表
    const list = await infrastructureManger.getInfo(id);
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json(list);
});
module.exports = router