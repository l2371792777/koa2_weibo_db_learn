/**
 * @description blog view router
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginCheck')
const { getProfileBlogList } = require('../../controller/blog.profile')
const { getSquareBlogList } = require('../../controller/blog.square')
const { getHomeBlogList } = require('../../controller/blog.home')
const { getFans, getFollowers } = require('../../controller/user.relation')
const { isExist } = require('../../controller/user')

router.get('/', loginRedirect, async (ctx, next) => {
    // 已登录用户的信息
    const myUserInfo = ctx.session.userInfo

    //获取第一页博客
    const result = await getHomeBlogList(myUserInfo.id, 0)
    const { isEmpty, count, blogList, pageIndex, pageSize } = result.data

    //获取粉丝
    const fansData = await getFans(myUserInfo.id)
    const { count: fansCount, userList: fansList } = fansData.data

    //获取关注人列表
    const followersData = await getFollowers(myUserInfo.id)
    const { count: followersCount, userList: followersList } = followersData.data

    await ctx.render('index',
        {
            userData: {
                userInfo: myUserInfo,
                isMe: true,
                fansData: {
                    count: fansCount,
                    list: fansList
                },
                followersData: {
                    count: followersCount,
                    list: followersList
                },
                amIFollowed: false
            },
            blogData: {
                isEmpty, count, blogList, pageIndex, pageSize
            }
        }
    )
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

    //获取第一页博客
    const result = await getProfileBlogList({ userName, pageIndex: 0 })
    const { isEmpty, count, blogList, pageIndex, pageSize } = result.data

    //获取粉丝
    const fansData = await getFans(curUserInfo.id)
    const { count: fansCount, userList: fansList } = fansData.data

    //是否关注当前用户
    const amIFollowed = fansList.some(data => {
        return data.userName == myUserName
    })

    //获取关注人列表
    const followersData = await getFollowers(curUserInfo.id)
    const { count: followersCount, userList: followersList } = followersData.data

    await ctx.render('profile',
        {
            userData: {
                userInfo: curUserInfo,
                isMe,
                fansData: {
                    count: fansCount,
                    list: fansList
                },
                followersData: {
                    count: followersCount,
                    list: followersList
                },
                amIFollowed
            },

            blogData: {
                isEmpty, count, blogList, pageIndex, pageSize
            }
        }
    )
})

// 广场
router.get('/square', loginRedirect, async (ctx, next) => {
    // 获取微博数据，第一页
    const result = await getSquareBlogList(0)
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data || {}
    await ctx.render('square', {
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        }
    })
})

module.exports = router