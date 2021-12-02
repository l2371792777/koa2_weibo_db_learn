/**
 * @description blog 首页 controller
 * @author xxx
 */

const { createBlog, getBlogListByFollower } = require('../servers/blog')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlogFailInfo } = require('../model/ErrorInfo')
const { PAGE_SIZE, REG_FOR_AT_WHO } = require('../conf/constants')
const { getUserInfo } = require('../servers/user')
const { createAtRelation } = require('../servers/at.relation')
const xss = require('xss')

/**
 * 创建微博
 * @param {int} id 用户id 
 * @param {text} content blog内容
 * @param {string} image 图片
 */
async function create({ id, content, image }) {
    //分析content中@ 用户
    const atUserNameList = []
    content = content.replace(
        REG_FOR_AT_WHO,
        (matchStr, nickName, userName) => {
            atUserNameList.push(userName)
            return matchStr
        }
    )

    //根据userName获取userInfo
    const atUserList = await Promise.all(atUserNameList.map(userName => {
        return getUserInfo(userName)
    }))

    //获取userId
    const atUserIdList = atUserList.map(user => user.id)


    try {
        const result = await createBlog({
            id,
            content: xss(content),
            image
        })

        //创建@ 关系
        await Promise.all(atUserIdList.map(userId => {
            return createAtRelation(result.id, userId)
        }))

        return new SuccessModel(result)
    }
    catch (ex) {
        console.error(ex.message, ex.stack)
        return new ErrorModel(createBlogFailInfo)
    }
}

/**
 * 获取首页微博列表
 * @param {*} userName 
 * @param {*} pageIndex 
 */
async function getHomeBlogList(userId, pageIndex = 0) {
    const result = await getBlogListByFollower({ pageIndex, pageSize: PAGE_SIZE, userId })
    const { count, blogList } = result

    return new SuccessModel({
        isEmpty: blogList.length == 0,
        count,
        blogList,
        pageIndex,
        pageSize: PAGE_SIZE
    })
}

module.exports = {
    create,
    getHomeBlogList
}