const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const util = require('util')
const verify = util.promisify(jwt.verify)
const { SECRET } = require('../conf/constants')

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.get('/login', async (ctx, next) => {
  const { username, password } = ctx.request.body
  //模拟登录验证
  let userInfo
  if (username == "aya" && password == "aya") {
    userInfo = {
      username: "aya",
      nickname: "ton",
      userid: 1,
      gender: 1
    }
  }

  if (userInfo == null) {
    ctx.body = {
      errno: -1,
      msg: "error",
    }
    return
  }

  //加密userInfo
  let token
  if (userInfo) {
    token = jwt.sign(userInfo, SECRET, { expiresIn: '1h' })
  }

  ctx.body = {
    errno: 0,
    data: token
  }
})

router.get('/getUserInfo', async (ctx, next) => {
  let token = ctx.header.authorization
  try {
    let data = await verify(token.split(' ')[1], SECRET)
    ctx.body = {
      errno: 0,
      data: data
    }
  }
  catch (ex) {
    ctx.body = {
      errno: -1,
      mes: "jwt verify error"
    }
  }

})
module.exports = router
