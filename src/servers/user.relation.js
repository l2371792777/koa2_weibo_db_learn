/**
 * @description userRelation servers 数据处理
 */

const { UserRelation, User } = require('../db/model/index')
const { formatUser } = require('./_format')
const Sequelize=require('sequelize')

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
                    followerId,
                    userId:{
                        [Sequelize.Op.ne]:followerId
                    }
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

/**
 * 获取被关注人列表
 * @param {*} userId 当前用户id 
 */
async function getUsersByUserId(userId) {
    const result = await UserRelation.findAndCountAll({
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: User,
                attributes: ['id', 'userName', 'nickName', 'picture'],
            }
        ],
        where: {
            userId,
            followerId:{
                [Sequelize.Op.ne]:userId
            }
        }
    })

    let userList = result.rows.map(row => row.user.dataValues)
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
    deleteFollower,
    getUsersByUserId
}
