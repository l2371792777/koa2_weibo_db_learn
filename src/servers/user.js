/**
 * @description user servers 数据处理
 */

const { User } = require('../db/model/index')
const { formatUser } = require('./_format')

/**
 * 获取用户信息
 * @param {string} userName 用户名
 * @param {*string} password 密码
 * @returns 
 */
async function getUserInfo(userName, password) {
    const whereOpt = {
        userName
    }
    if (password) {
        Object.assign(whereOpt, { password })
    }
    const result = await User.findOne({
        attributes: ['id', 'userName', 'password', 'nickName', 'picture', 'city'],
        where: whereOpt
    })
    if (result == null) {
        return result
    }

    const formatRes = formatUser(result.dataValues)
    return formatRes
}

/**
 * 插入用户信息
 * @param {*} param0 用户信息
 */
async function createUser({ userName, password, gender = 3, nickName }) {
    const result = await User.create({
        userName,
        password,
        nickName: nickName ? nickName : userName,
        gender
    })
    return result.dataValues
}

/**
 * 删除用户
 * @param {*} userName 
 * return 删除行数是否大于0
 */
async function deleteUser(userName) {
    const result=await User.destroy({
        where:{
            userName
        }
    })
    return result>0
}

module.exports = {
    getUserInfo,
    createUser,
    deleteUser
}