/**
 * @description 错误信息
 */

module.exports={
    //注册失败
    registerFailInfo:{
        errno:10001,
        message:'注册失败'
    },
    //用户名已存在
    registerUserNameExistInfo:{
        errno:10002,
        message:'用户名已存在'
    },
    //用户名不存在
    registerUserNameNotExistInfo:{
        errno:10003,
        message:'用户名不存在'
    },
    jsonValidatorErrorInfo:{
        errno:10004,
        message:'数据校验出错'
    },
    userLoginFailInfo:{
        errno:10005,
        message:'登录失败,用户信息错误'
    },
    loginCheckFailInfo:{
        errno:10006,
        message:'登录失败，无用户信息'
    },
    loginRedirectFailInfo:{
        errno:10007,
        message:'跳转失败，无用户信息'
    },
    deleteUserFailInfo:{
        errno:10008,
        message:'删除用户失败'
    },
    fileOverMaxSizeInfo:{
        errno:10009,
        message:'图片大于2M'
    },
    updateUserFailInfo:{
        errno:10010,
        message:'更新信息失败'
    },
    updateUserPasswordFailInfo:{
        errno:10011,
        message:'修改密码失败'
    },
    userPasswordErrorInfo:{
        errno:10012,
        message:'密码输入错误'
    },
    createBlogFailInfo:{
        errno:10013,
        message:'创建博客失败'
    },
    addFollowerFailInfo:{
        errno:10014,
        message:'添加关注失败'
    },
    deleteFollowerFailInfo:{
        errno:10015,
        message:'取消关注失败'
    },
    updateAtMeReadFailInfo:{
        errno:10016,
        message:'更新已读信息失败'
    }
}