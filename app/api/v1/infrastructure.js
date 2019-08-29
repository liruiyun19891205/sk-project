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
    // 获取页码，排序方法，分类ID，搜索关键字
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
    // 获取页码，排序方法，分类ID，搜索关键字
    const {
        param
    } = ctx.body;
    // 查询文章列表
    const list = await infrastructureManger.save(param);
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json(list);
});
/**
 * 获取用户列表
 */
router.post('/update', async (ctx) => {
    // 获取页码，排序方法，分类ID，搜索关键字
    const {
        param
    } = ctx.body;
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
    // 获取页码，排序方法，分类ID，搜索关键字
    const {
        param
    } = ctx.body;
    // 查询文章列表
    const list = await infrastructureManger.remove(param);
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json(list);
});
/**
 * 获取用户列表
 */
router.get('/getInfo', async (ctx) => {
    // 获取页码，排序方法，分类ID，搜索关键字
    const {
        param
    } = ctx.body;
    // 查询文章列表
    const list = await infrastructureManger.getInfo(param);
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json(list);
});
module.exports = router