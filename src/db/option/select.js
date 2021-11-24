const { User, Blog } = require('../model/index')

!(async function () {
    // const ayanami = await User.findAll({
    //     order: [
    //         ['id', 'desc']
    //     ]
    // })

    // const blogData = await Blog.findAll({

    // })

    

    // console.log(ayanami.map(blog => {
    //     blogval = blog.dataValues
    //     return blogval
    // }
    // ))
    // console.log(blogData.map(blog => {
    //     blogval = blog.dataValues
    //     return blogval
    // }
    // ))

    
    const result = await Blog.findAndCountAll({
        limit: 10,
        offset: 0,
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: User,
                attributes: ['userName', 'nickName', 'picture'],
                where:{
                    userName:'ayanami'
                }
            }
        ]
    })
    console.log(JSON.stringify(result))

})()