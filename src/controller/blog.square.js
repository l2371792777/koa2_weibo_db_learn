/**
 * @description blog square controller
 * @author xxx
 */

const {getSquareCacheList}=require('../cache/blog')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { PAGE_SIZE } = require('../conf/constants')


/**
 * 获取广场页博客列表
 * @param {*} pageIndex 
 * @param {*} pageSize 
 */
async function getSquareBlogList(pageIndex=0) {
    const result=await getSquareCacheList(pageIndex,PAGE_SIZE)

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
    getSquareBlogList
}