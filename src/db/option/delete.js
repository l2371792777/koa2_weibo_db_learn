const { User } = require('../model/index')
const { Sequelize } = require('sequelize')

!(async function () {
    User.destroy({
        where: {
            userName: { [Sequelize.Op.like]: '%u%' }
        }
    })
})()