/**
 * @description user API 路由
 */
const router = require('koa-router')()
const { isExist, register, login, deleteCurUser } = require('../../controller/user')
const userValidator = require('../../validator/user')
const { genValidator } = require('../../middlewares/validator')
const { isTest } = require('../../utils/env')
const { loginCheck } = require('../../middlewares/loginCheck')


router.prefix('/api/user')

//注册
router.post('/register', genValidator(userValidator),
    async (ctx, next) => {
        const { userName, password, gedner } = ctx.request.body
        ctx.body = await register({ userName, password, gedner })
    }
)

//登录
router.post('/login', async (ctx, next) => {
    const { userName, password } = ctx.request.body
    ctx.body = await login(ctx, userName, password)
})

//用户是否存在
router.post('/isExist', async (ctx, next) => {
    const { userName } = ctx.request.body
    
    ctx.body = await isExist(userName)
})

//删除
router.post('/delete', loginCheck, async (ctx, next) => {
    if (isTest) {
        //测试环境下，删除当前账号
        const { userName } = ctx.session.userInfo
        ctx.body = await deleteCurUser(userName)
    }
})

module.exports = router