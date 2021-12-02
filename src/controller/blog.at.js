/**
 *  @description 获取at信息
 */

const { getAtRelationCount, getAtUserBlogList, updateAtRelation } = require('../servers/at.relation')
const { SuccessModel ,ErrorModel} = require('../model/ResModel')
const {updateAtMeReadFailInfo}=require('../model/ErrorInfo')
const { PAGE_SIZE } = require('../conf/constants')

async function getAtMeCount(userId) {
    const count = await getAtRelationCount(userId)
    return new SuccessModel({
        count
    })
}

/**
 * 获取@ 用户微博列表
 * @param {*} userId 
 * @param {*} pageIndex 
 */
async function getAtMeBlogList(userId, pageIndex = 0) {
    const result = await getAtUserBlogList({ userId, pageIndex, pageSize: PAGE_SIZE })

    const blogList = result.blogList
    return new SuccessModel({
        isEmpty: blogList.length == 0,
        blogList,
        pageSize: PAGE_SIZE,
        pageIndex,
        count: result.count
    })
}

async function markAsRead(userId) {
    try {
        await updateAtRelation({ newIsRead: true }, { userId, isRead: false })
        return new SuccessModel()
    }
    catch (ex) {
        console.error(ex)
        return new ErrorModel(updateAtMeReadFailInfo)
    }
}

module.exports = {
    getAtMeCount,
    getAtMeBlogList,
    markAsRead
}