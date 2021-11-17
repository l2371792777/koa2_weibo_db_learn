/**
 * @description 登录验证
 */
const { ErrorModel } = require('../model/ResModel')
const { loginCheckFailInfo, loginRedirectFailInfo } = require('../model/ErrorInfo')

/**
 * api登录验证
 * @param {Objext} ctx 
 * @param {function} next 
 */
async function loginCheck(ctx, next) {
    if (ctx.session.userInfo) {
        //已登录
        await next()
        return 
    }
    ctx.body = new ErrorModel(loginCheckFailInfo)
}

/**
 * 页面登录验证
 * @param {Objext} ctx 
 * @param {function} next 
 */
async function loginRedirect(ctx, next) {
    if (ctx.session.userInfo) {
        //已登录
        await next()
    }
    //未登录
    //页面跳转
    const url=ctx.url
    ctx.redirect('/login?url='+encodeURIComponent(url))

}

module.exports = {
    loginCheck,
    loginRedirect
}