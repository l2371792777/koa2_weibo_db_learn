/**
 * @description blog 个人主页 api
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginCheck')
const { follow,unFollow } = require('../../controller/user.relation')
const { getProfileBlogList } = require('../../controller/blog.profile')
const { getBlogListStr } = require('../../utils/blog')


router.prefix('/api/profile')


router.get('/loadMore/:userName/:pageIndex', loginCheck, async (ctx, next) => {
    let { userName, pageIndex } = ctx.params
    pageIndex = parseInt(pageIndex)

    const result = await getProfileBlogList({ userName, pageIndex })

    result.data.blogListTpl = getBlogListStr(result.data.blogList)

    ctx.body = result
})

router.post('/follow', loginCheck,async (ctx, next) => {
    const { id: myUserId } = ctx.session.userInfo
    const { userId: curUserId } = ctx.request.body

    const result = await follow(myUserId, curUserId)
    ctx.body = result

})

router.post('/unFollow', loginCheck,async (ctx, next) => {
    const { id: myUserId } = ctx.session.userInfo
    const { userId: curUserId } = ctx.request.body

    const result = await unFollow(myUserId, curUserId)
    ctx.body = result

})

module.exports = router