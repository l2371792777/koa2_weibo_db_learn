const Sequelize=require('sequelize')
const seq=require('../seq')
const User=require('./user')
const Blog=require('./blog')
const AtRelation=require('./atRelation')
const userRelation=require('./userRelation')

User.hasMany(Blog,{
    foreignKey:'userId'
})

userRelation.belongsTo(User,{
    foreignKey:'userId'
})

userRelation.belongsTo(User,{
    foreignKey:'followerId'
})

AtRelation.belongsTo(User,{
    foreignKey:'userId'
})

AtRelation.belongsTo(Blog,{
    foreignKey:'blogId'
})

module.exports={
    User,
    userRelation,
    Blog,
    AtRelation
}