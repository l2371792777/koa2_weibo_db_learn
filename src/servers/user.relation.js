/**
 * @description userRelation servers 数据处理
 */

const { UserRelation, User } = require('../db/model/index')
const { formatUser } = require('./_format')

/**
 * 获取关注人列表
 * @param {*} followerId 被关注人id 
 */
async function getUsersByFollowerId(followerId) {
    const result = await User.findAndCountAll({
        attributes: ['id', 'userName', 'nickName', 'picture'],
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: UserRelation,
                where: {
                    followerId
                }
            }
        ]
    })

    let userList = result.rows.map(row => row.dataValues)
    userList = formatUser(userList)

    return {
        count: result.count,
        userList
    }
}

async function addFollower(userId, followerId) {
    const result = await UserRelation.create({
        userId,
        followerId
    })

    return result.dataValues
}

async function deleteFollower(userId, followerId) {
    const result = await UserRelation.destroy({
        where: {
            followerId,
            userId
        }
    })

    return result.dataValues
}

module.exports = {
    getUsersByFollowerId,
    addFollower,
    deleteFollower
}
