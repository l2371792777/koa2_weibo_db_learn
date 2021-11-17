const Sequelize=require('sequelize')
const seq=require('../seq')

const userRelation=seq.define('userRelation',{
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment:'用户id,外键'
    },
    followerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment:'关注id,外键'
    }
})

module.exports=userRelation