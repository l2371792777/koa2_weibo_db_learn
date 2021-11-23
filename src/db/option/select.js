const { User, Blog } = require('../model/index')

!(async function () {
    const ayanami = await User.findAll({
        order: [
            ['id', 'desc']
        ]
    })

    const blogData = await Blog.findAll({

    })

    console.log(ayanami.map(blog => {
        blogval = blog.dataValues
        return blogval
    }
    ))
    console.log(blogData.map(blog => {
        blogval = blog.dataValues
        return blogval
    }
    ))
})()