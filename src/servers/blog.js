/**
 * @description blog server
 */

const { Blog } = require('../db/model/index')


/**
 * 创建blog
 * @param {*} param0 
 * @returns 
 */
async function createBlog({ id, content, image }) {
    const result = await Blog.create({
        userId: id,
        content,
        image
    })
    return result.dataValues
}

module.exports = {
    createBlog
}