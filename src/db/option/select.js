const { User } = require('../model/index')

!(async function () {
    const ayanami = await User.findAll({
        order: [
            ['id', 'desc']
        ]
    })

    console.log(ayanami.map(blog=>{
        blogval=blog.dataValues
        return blogval
    }
    ))
})()