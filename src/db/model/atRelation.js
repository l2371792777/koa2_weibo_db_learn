const Sequelize=require('sequelize')
const seq=require('../seq')

const AtRelation=seq.define('atRelation',{
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment:'用户id,外键'
    },
    blogId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment:'博客id，外键'
    },
    isRead: {
        type: Sequelize.TINYINT,
        comment:'已读',
    }
})

module.exports=AtRelation