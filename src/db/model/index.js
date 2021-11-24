
const User=require('./user')
const Blog=require('./blog')
const AtRelation=require('./atRelation')
const UserRelation=require('./userRelation')


Blog.belongsTo(User,{
    foreignKey:'userId'
})

UserRelation.belongsTo(User,{
    foreignKey:'userId'
})

UserRelation.belongsTo(User,{
    foreignKey:'followerId'
})

User.hasMany(UserRelation, {
    foreignKey: 'userId'
})


Blog.belongsTo(UserRelation, {
    foreignKey: 'userId',
    targetKey: 'followerId'
})

Blog.hasMany(AtRelation, {
    foreignKey: 'blogId'
})

module.exports={
    User,
    UserRelation,
    Blog,
    AtRelation
}