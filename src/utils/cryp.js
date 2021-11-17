/**
 * @description 加密
 */

const crypto=require('crypto')
const {CRYPTO_SECRET_KEY}=require('../conf/constants')

/**
 * md5加密
 * @param {string} content 明文密码
 */
function md5(content){
    const md5=crypto.createHash('md5')
    return md5.update(content).digest('hex')
}

/**
 * 加密
 * @param {string} content 
 */
function doCrypto(content){
    const str=`password=${content}&secret=${CRYPTO_SECRET_KEY}`
    return md5(str)
}

module.exports={
    doCrypto
}