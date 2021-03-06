/**
 * @description user API 路由
 */
const router = require('koa-router')()
const { isExist, register, login, deleteCurUser, changeInfo, changePassword, loginOut } = require('../../controller/user')
const userValidator = require('../../validator/user')
const { genValidator } = require('../../middlewares/validator')
const { isTest } = require('../../utils/env')
const { loginCheck } = require('../../middlewares/loginCheck')
const { getFollowers } = require('../../controller/user.relation')

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

//获取关注人列表
router.get('/getAtList', loginCheck, async (ctx, next) => {
    const { id: userId } = ctx.session.userInfo
    const result = await getFollowers(userId)
    const { userList } = result.data
    const list = userList.map(user => {
        return `${user.nickName} - ${user.userName}`
    })

    ctx.body = list
})

//修改个人信息
router.patch('/changeInfo', loginCheck, genValidator(userValidator), async (ctx, next) => {
    const { nickName, city, picture } = ctx.request.body
    ctx.body = await changeInfo(ctx, { nickName, city, picture })

})

//修改密码
router.patch('/changePassword', loginCheck, genValidator(userValidator), async (ctx, next) => {
    const { password, newPassword } = ctx.request.body
    ctx.body = await changePassword(ctx, { password, newPassword })
})

//退出登录
router.post('/logout', loginCheck, async (ctx, next) => {
    ctx.body = await loginOut(ctx)
})

module.exports = router