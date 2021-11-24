/**
 * @description blog view router
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginCheck')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { isExist } = require('../../controller/user')

router.get('/', loginRedirect, async (ctx, next) => {
    await ctx.render('index', { blogData: '' })
})

router.get('/profile', loginRedirect, async (ctx, next) => {
    const { userName } = ctx.session.userInfo
    await ctx.redirect(`profile/${userName}`,)
})

router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
    // 已登录用户的信息
    const myUserInfo = ctx.session.userInfo
    const myUserName = myUserInfo.userName
    
    let curUserInfo
    const { userName } = ctx.params
    const isMe = myUserName === userName
    if (isMe) {
        // 是当前登录用户
        curUserInfo = myUserInfo
    } else {
        // 不是当前登录用户
        const existResult = await isExist(userName)
        if (existResult.errno !== 0) {
            // 用户名不存在
            return
        }
        // 用户名存在
        curUserInfo = existResult.data
    }

    const result = await getProfileBlogList({ userName, pageIndex: 0 })
    const { isEmpty, count, blogList, pageIndex, pageSize } = result.data

    await ctx.render('profile',
        {
            userData: {
                userInfo: curUserInfo,
                isMe
            },
            blogData: {
                isEmpty, count, blogList, pageIndex, pageSize
            }
        }
    )
})

module.exports = router