const { User, Blog, UserRelation } = require('../model/index')

!(async function () {
//     const ayanami = await User.findAll({
//         order: [
//             ['id', 'desc']
//         ]
//     })

//    console.log(ayanami.map(data=>{
//        return data
//    }))



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


    // const result = await Blog.findAndCountAll({
    //     limit: 10,
    //     offset: 0,
    //     order: [
    //         ['id', 'desc']
    //     ],
    //     include: [
    //         {
    //             model: User,
    //             attributes: ['userName', 'nickName', 'picture'],
    //             where:{
    //                 userName:'ayanami'
    //             }
    //         }
    //     ]
    // })
    // console.log(JSON.stringify(result))

    const result = await UserRelation.findAndCountAll({
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: User,
                attributes: ['id', 'userName', 'nickName', 'picture'],
            }
        ],

    })
    result.rows.map(res => {
        console.log(JSON.stringify(res))
    })

})()