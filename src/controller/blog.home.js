/**
 * @description blog 首页 controller
 * @author xxx
 */

const { createBlog } = require('../servers/blog')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlogFailInfo } = require('../model/ErrorInfo')

/**
 * 创建微博
 * @param {int} id 用户id 
 * @param {text} content blog内容
 * @param {string} image 图片
 */
async function create({ id, content, image }) {
    try {
        const result = await createBlog({ id, content, image })
        return new SuccessModel(result)
    }
    catch (ex) {
        console.error(ex.message, ex.stack)
        return new ErrorModel(createBlogFailInfo)
    }
}

module.exports = {
    create
}