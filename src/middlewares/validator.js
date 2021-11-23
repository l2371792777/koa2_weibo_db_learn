/**
 * @description validator schema检验非法数据
 */

const { ErrorModel } = require('../model/ResModel')
const { jsonValidatorErrorInfo } = require('../model/ErrorInfo')


/**
 * 数据校验
 * @param {function} validatorfunc 校验函数 
 * @returns 中间件函数
 */
function genValidator(validatorfunc) { 
    async function validator(ctx, next) {
        const error = validatorfunc(ctx.request.body)
        if (error) {
            ctx.body = new ErrorModel(jsonValidatorErrorInfo)
            return
        }
        //执行下一个中间件
        await next()
    }
    return validator
}

module.exports = {
    genValidator
}