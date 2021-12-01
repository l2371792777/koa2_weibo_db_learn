const { UserRelation } = require('../model/index')
const { Sequelize } = require('sequelize')

!(async function () {
    await UserRelation.create({
        userId:1,
        followerId:1
    })
    await UserRelation.create({
        userId:9,
        followerId:9
    })
})()