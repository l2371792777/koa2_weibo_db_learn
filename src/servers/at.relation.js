/**
 * @description 创建at关系
 */

const { AtRelation } = require('../db/model/index')

/**
 * 创建@ relation
 * @param {*} blogId 
 * @param {*} userId 
 */
async function createAtRelation(blogId, userId) {
    const result = AtRelation.create({
        blogId,
        userId
    })
    return result.dataValues
}

module.exports = {
    createAtRelation
}