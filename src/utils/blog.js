/**
 * @description 渲染bloglist
 */
const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

//获取blog-list.ejs内容
const BLOG_LIST_TPL = fs.readFileSync(
    path.join(__dirname, '..', 'views', 'widgets', 'blog-list.ejs')
).toString()

/**
 * 
 * @param {*} blogList 列表
 * @param {*} canReply 能否回复
 */
function getBlogListStr(blogList = [], canReply = true) {
    return ejs.render(BLOG_LIST_TPL,{
        blogList,
        canReply
    })
}

module.exports = {
    getBlogListStr
}