/**
 * @description user relation controllor
 */

const { getUsersByFollowerId, addFollower,deleteFollower,getUsersByUserId } = require('../servers/user.relation')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { addFollowerFailInfo,deleteFollowerFailInfo } = require('../model/ErrorInfo')

/**
 * 获取粉丝列表
 * @param {int} userId 
 */
async function getFans(userId) {
    const { count, userList } = await getUsersByFollowerId(userId)

    return new SuccessModel({ count, userList })
}

/**
 * 获取关注人列表
 * @param {*} userId 
 * @returns 
 */
async function getFollowers(userId) {
    const { count, userList } = await getUsersByUserId(userId)

    return new SuccessModel({ count, userList })
}

/**
 * 关注用户
 * @param {*} myuserId 当前登录用户
 * @param {*} curUserId 待关注用户
 */
async function follow(myuserId, curUserId) {
    try {
        const result = await addFollower(myuserId, curUserId)
        return new SuccessModel()
    }
    catch (ex) {
        console.error(ex)
        return new ErrorModel(addFollowerFailInfo)
    }
}

/**
 * 关注用户
 * @param {*} myuserId 当前登录用户
 * @param {*} curUserId 待关注用户
 */
 async function unFollow(myuserId, curUserId) {
    try {
        const result = await deleteFollower(myuserId, curUserId)
        return new SuccessModel()
    }
    catch (ex) {
        console.error(ex)
        return new ErrorModel(deleteFollowerFailInfo)
    }
}

module.exports = {
    getFans,
    follow,
    unFollow,
    getFollowers
}