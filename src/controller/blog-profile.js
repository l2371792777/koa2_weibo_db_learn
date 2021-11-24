/**
 * @description 个人主页 controller
 */

const { getBlogListByUser } = require('../servers/blog')
const { PAGE_SIZE } = require('../conf/constants')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { } = require('../model/ErrorInfo')


/**
 * 获取个人主页blog列表
 * @param {*} userName 获取的用户名 
 * @param {*} pageIndex 页数
 */
async function getProfileBlogList({ userName, pageIndex = 0 }) {
    const result = await getBlogListByUser({ userName, pageIndex, pageSize: PAGE_SIZE })
    const blogList = result.blogList
    return new SuccessModel({
        isEmpty: blogList.length == 0,
        blogList,
        pageSize: PAGE_SIZE,
        pageIndex,
        count: result.count
    })
}

module.exports = {
    getProfileBlogList
}