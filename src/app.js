const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const redisStore = require('koa-redis')
const session = require('koa-generic-session')
const path=require('path')
const koaStatic=require('koa-static')
const jwtKoa = require('koa-jwt')

const { isProd } = require('./utils/env')
const { REDIS_CONF } = require('./conf/db')
const { SESSION_SECRET_KEY } = require('./conf/constants')

const userViewRouter = require('./routes/view/user')
const blogViewRouter = require('./routes/view/blog')
const errorViewRouter = require('./routes/view/error')
const userApiRouter = require('./routes/api/user')
const utilsApiRouter = require('./routes/api/utils')


// error handler
const onerrorConf = {}
if (isProd) {
  onerrorConf = {
    redirect: '/error'
  }
}
onerror(app, onerrorConf)

// app.use(jwtKoa({
//   secret:SECRET
// }).unless({
//   path:[/^\/users\/login/]
// }))

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(koaStatic(path.join(__dirname+'/public')))
app.use(koaStatic(path.join(__dirname,'..','uploadFiles')))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))


//session
app.keys = [SESSION_SECRET_KEY]
app.use(session({
  key: 'cookie.sid',
  prefix: 'weibo-learn:session:',
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000
  },
  store: redisStore({
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))

// routes
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(blogViewRouter.routes(), blogViewRouter.allowedMethods())
app.use(userApiRouter.routes(), userApiRouter.allowedMethods())
app.use(utilsApiRouter.routes(), utilsApiRouter.allowedMethods())
//error最后注册
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
