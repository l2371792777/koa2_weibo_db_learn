/**
 * @description user API controller
 */

const { updateUser, getUserInfo, createUser, deleteUser } = require('../servers/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {
    UserPasswordErrorInfo, updateUserPasswordFailInfo, updateUserFailInfo, registerUserNameNotExistInfo, registerUserNameExistInfo, registerFailInfo, userLoginFailInfo, deleteUserFailInfo
} = require('../model/ErrorInfo')
const { doCrypto } = require('../utils/cryp')
const { userRelation } = require('../db/model')

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
async function deleteCurUser(userName) {
    const result = await deleteUser(userName)
    if (result) {
        return new SuccessModel()
    }

    return new ErrorModel(deleteUserFailInfo)

}

/**
 * 修改用户信息
 * @param {Object} koa ctx
 * @param {Object} param0 待修改信息
 */
async function changeInfo(ctx, { nickName, city, picture }) {
    const { userName } = ctx.session.userInfo
    if (!nickName) {
        nickName = userName
    }
    const result = await updateUser({
        newNickName: nickName,
        newCity: city,
        newPicture: picture
    }, { userName })

    if (result) {
        Object.assign(ctx.session.userInfo, {
            nickName,
            city,
            picture
        })
        return new SuccessModel()
    }
    return new ErrorModel(updateUserFailInfo)
}

/**
 * 修改密码
 * @param {Object} ctx koa ctx
 * @param {Object} param1 用户密码
 * @returns 
 */
async function changePassword(ctx, { password, newPassword }) {
    const userName = ctx.session.userInfo.userName
    const curPassword = ctx.session.userInfo.password
    if (curPassword != doCrypto(password)) {
        return new ErrorModel(UserPasswordErrorInfo)
    }

    const result = await updateUser(
        {
            newPassword: doCrypto(newPassword)
        },
        {
            userName,
            password: doCrypto(password)
        })
    if (result) {
        return new SuccessModel()
    }
    return new ErrorModel(updateUserPasswordFailInfo)
}

/**
 * 退出登录
 * @param {Object} ctx 
 * @returns 
 */
async function loginOut(ctx){
    delete ctx.session.userInfo
    return new SuccessModel()
}

module.exports = {
    isExist,
    register,
    login,
    deleteCurUser,
    changeInfo,
    changePassword,
    loginOut
}