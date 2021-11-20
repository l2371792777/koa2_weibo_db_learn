/**
 * @description user API controller
 */

const { getUserInfo, createUser,deleteUser } = require('../servers/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { registerUserNameNotExistInfo, registerUserNameExistInfo, registerFailInfo, userLoginFailInfo ,deleteUserFailInfo} = require('../model/ErrorInfo')
const { doCrypto } = require('../utils/cryp')

/**
 * 用户是否存在
 * @param {string} userName 用户名
 * @returns    
 */
async function isExist(userName) {
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        return new SuccessModel(userInfo)
    }
    else {
        return new ErrorModel(registerUserNameNotExistInfo)
    }
}

/**
 * 注册用户
 * @param {*} userName 名字
 * @param password 密码
 * @param gender 性别
 */
async function register({ userName, password, gender }) {
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        return new ErrorModel(registerUserNameExistInfo)
    }
    try {
        createUser({ userName, password: doCrypto(password), gender })
        return new SuccessModel()
    }
    catch (ex) {
        console.error(ex.message, ex.stack)
        return new ErrorModel(registerFailInfo)
    }
}

/**
 * 登录
 * @param {Object} ctx koa2 ctx 存储session 
 * @param {string} userName 用户名
 * @param {string} passowrd 密码
 */
async function login(ctx, userName, password) {
    const userInfo = await getUserInfo(userName, doCrypto(password))
    if (!userInfo) {
        return new ErrorModel(userLoginFailInfo)
    }

    if (ctx.session.userInfo == null) {
        ctx.session.userInfo = userInfo
    }
    return new SuccessModel()
}

/**
 * 删除当前用户
 * @param {string} userName 
 */
async function deleteCurUser(userName)
{
    const result=await deleteUser(userName)
    if(result)
    {
        return new SuccessModel()
    }

    return new ErrorModel(deleteUserFailInfo)
    
}

module.exports = {
    isExist,
    register,
    login,
    deleteCurUser
}