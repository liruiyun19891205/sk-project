const Router = require('koa-router');

const {
    Auth
} = require('../../../middlewares/auth');
const {
    RegisterValidator,
    AdminLoginValidator,
    PositiveIdParamsValidator
} = require('../../validators/admin')
const {
    userDao
} = require('../../dao/user');

const {
    Resolve
} = require('../../lib/helper');

const res = new Resolve();

const AUTH_ADMIN = 16;

const router = new Router({
    prefix: '/v1'
})
/**
 * 更新用户信息
 */
router.put('/user/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {

    // 通过验证器校验参数是否通过
    const v = await new AdminLoginValidator().validate(ctx);

    // 获取用户ID参数
    const id = v.get('path.id');
    // 更新文章
    await userDao.updateSave(id, v);
    ctx.response.status = 200;
    ctx.body = res.success('更新文章成功');
})

/**
 * 创建用户信息
 */
router.post('/user', new Auth(AUTH_ADMIN).m, async (ctx) => {

    // 通过验证器校验参数是否通过
    const v = await new RegisterValidator().validate(ctx);
    // 创建用户
    await userDao.createUser(v);

    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.success('创建用户成功');
});

/**
 * 删除用户
 */
router.delete('/user/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {

    // 通过验证器校验参数是否通过
    const v = await new PositiveIdParamsValidator().validate(ctx);

    // 获取文章ID参数
    const id = v.get('path.id');
    // 删除文章
    await userDao.destroyUser(id);

    ctx.response.status = 200;
    ctx.body = res.success('删除文章成功');
})



/**
 * 获取用户列表
 */
router.get('/getUserList', async (ctx) => {
    // 获取页码，排序方法，分类ID，搜索关键字
    const {
        page,
        desc,
        keyWord
    } = ctx.query;
    // 查询文章列表
    const getUserList = await userDao.getUserList(page, desc, keyWord);
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json(getUserList);
});


module.exports = router