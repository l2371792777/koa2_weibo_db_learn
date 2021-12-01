/**
 * @description blog 首页 controller
 * @author xxx
 */

const { createBlog,getBlogListByFollower } = require('../servers/blog')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlogFailInfo } = require('../model/ErrorInfo')
const {PAGE_SIZE}=require('../conf/constants')
const xss = require('xss')

/**
 * 创建微博
 * @param {int} id 用户id 
 * @param {text} content blog内容
 * @param {string} image 图片
 */
async function create({ id, content, image }) {
    try {
        const result = await createBlog({
            id,
            content: xss(content),
            image
        })
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
async function getHomeBlogList(userId,pageIndex=0)
{
    const result=await getBlogListByFollower({pageIndex,pageSize:PAGE_SIZE,userId})
    const {count,blogList}=result

    return new SuccessModel({
        isEmpty:blogList.length==0,
        count,
        blogList,
        pageIndex,
        pageSize:PAGE_SIZE
    })
}

module.exports = {
    create,
    getHomeBlogList
}