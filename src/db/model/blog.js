const sequelize = require('sequelize')
const Sequelize=require('sequelize')
const seq=require('../seq')

const Blog=seq.define('blog',{
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment:'用户id,外键'
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false,
        comment:'内容'
    },
    slug:{
        type:sequelize.STRING,
        comment:'关键字'
    },
    image: {
        type: Sequelize.STRING,
        comment:'??'
    }
})

module.exports=Blog