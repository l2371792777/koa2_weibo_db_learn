/**
 * @description 创建at关系
 */

const { User, Blog, AtRelation } = require('../db/model/index')
const { formatUser, formatBlog } = require('./_format')

/**
 * 创建@ relation
 * @param {*} blogId 
 * @param {*} userId 
 */
async function createAtRelation(blogId, userId) {
    const result = AtRelation.create({
        blogId,
        userId
    })
    return result.dataValues
}

/**
 * 获取@ 用户数量
 * @param {*} userId 
 */
async function getAtRelationCount(userId) {
    const result = await AtRelation.findAndCountAll({
        where: {
            userId,
            isRead: false
        }
    })

    return result.count
}

/**
 * 获取@ 用户列表
 * @param {*} userId 
 * @param {*} pageIndex 
 * @param {*} pageSize 
 */
async function getAtUserBlogList({ userId, pageIndex, pageSize = 10 }) {
    const result = await Blog.findAndCountAll({
        limit: pageSize,
        offset: pageSize * pageIndex,
        order:[
            ['id','desc']
        ],
        include: [
            {
                model: AtRelation,
                attributes: ['userId', 'blogId'],
                where: {
                    userId
                }
            },
            {
                model: User,
                attributes: ['id', 'userName', 'password', 'nickName', 'picture', 'city'],
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
 * 标记为已读
 * @param {*} param0 要更新内容 
 * @param {*} param1 查询条件
 */
async function updateAtRelation({ newIsRead }, { userId, isRead }) {
    const result = await AtRelation.update({
        isRead: newIsRead
    }, {
        where: {
            userId,
            isRead
        }
    })

    return result[0] > 0
}

module.exports = {
    createAtRelation,
    getAtRelationCount,
    getAtUserBlogList,
    updateAtRelation
}