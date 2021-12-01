/**
 * @description user servers 数据处理
 */

const { User } = require('../db/model/index')
const { formatUser } = require('./_format')
const { addFollower } = require('./user.relation')

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

    const data = result.dataValues
    //自己关注自己(获取首页微博列表)
    await addFollower(data.id, data.id)

    return result.dataValues
}

/**
 * 删除用户
 * @param {*} userName 
 * return 删除行数是否大于0
 */
async function deleteUser(userName) {
    const result = await User.destroy({
        where: {
            userName
        }
    })
    return result > 0
}

/**
 * 修改用户信息
 * @param {Object} param0 待修改数据
 * @param {Object} param1 where 筛选字段
 */
async function updateUser({ newNickName, newCity, newPassword, newPicture }, { userName, password }) {
    //修改数据
    const data = {}
    if (newNickName) {
        data.nickName = newNickName
    }
    if (newCity) {
        data.city = newCity
    }
    if (newPassword) {
        data.password = newPassword
    }
    if (newPicture) {
        data.picture = newPicture
    }

    //查询条件
    const whereOpt = {
        userName
    }
    if (password) {
        whereOpt.password = password
    }

    const result = await User.update(data,
        {
            where: whereOpt
        })
    return result[0] > 0
}

module.exports = {
    getUserInfo,
    createUser,
    deleteUser,
    updateUser
}