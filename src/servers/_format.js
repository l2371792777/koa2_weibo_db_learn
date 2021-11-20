/**
 * @description 数据格式化
 */

const {DEFAULT_PICTURE}=require('../conf/constants')

/**
 * 格式化图片信息
 * @param {Object} obj 
 * @returns 
 */
function _formatUserPicture(obj) {
    if (obj.picture == null) {
        //默认图片
        obj.picture = DEFAULT_PICTURE
    }
    return obj
}

/**
 * 格式化用户信息
 * @param {Array|Objext} list 
 */
function formatUser(list) {
    if (list == null) {
        return list
    }

    if (list instanceof Array) {
        //用户数组
        return list.map(_formatUserPicture)
    }

    //单个用户
    return _formatUserPicture(list)
}

module.exports = {
    formatUser
}