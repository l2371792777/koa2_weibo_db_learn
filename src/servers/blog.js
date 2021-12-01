/**
 * @description blog server
 */

const { Blog, User, UserRelation } = require('../db/model/index')
const { formatUser, formatBlog } = require('./_format')

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


async function getBlogListByUser({ userName, pageIndex = 0, pageSize = 10 }) {
    const whereUserOpt = {}
    if (userName) {
        whereUserOpt.userName = userName
    }

    //查询
    const result = await Blog.findAndCountAll({
        limit: pageSize,
        offset: pageSize * pageIndex,
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: User,
                attributes: ['userName', 'nickName', 'picture'],
                where: whereUserOpt
            }
        ]
    })

    // 获取 dataValues
    let blogList = result.rows.map(row => row.dataValues)

    blogList = formatBlog(blogList)
    blogList = blogList.map(blogItem => {
        const user = blogItem.user.dataValues
        blogItem.user = formatUser(user)
        return blogItem
    })

    return {
        count: result.count,
        blogList
    }
}

/**
 * 获取关注人微博
 * @param {*} param0 查询条件
 */
async function getBlogListByFollower({ userId, pageIndex = 0, pageSize = 10 }) {
    const result = await Blog.findAndCountAll({
        limit: pageSize,
        offset: pageSize * pageIndex,
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: User,
                attributes: ['userName', 'nickName', 'picture']
            },
            {
                model: UserRelation,
                attributes: ['userId', 'followerId'],
                where: {
                    userId
                }
            }
        ]
    })

    // 获取 dataValues
    let blogList = result.rows.map(row => row.dataValues)

    blogList = formatBlog(blogList)
    blogList = blogList.map(blogItem => {
        const user = blogItem.user.dataValues
        blogItem.user = formatUser(user)
        return blogItem
    })

    return {
        count: result.count,
        blogList
    }
}

module.exports = {
    createBlog,
    getBlogListByUser,
    getBlogListByFollower
}