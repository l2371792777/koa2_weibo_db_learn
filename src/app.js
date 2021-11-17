const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const redisStore = require('koa-redis')
const session = require('koa-generic-session')
const jwtKoa = require('koa-jwt')

const { isProd } = require('./utils/env')
const { REDIS_CONF } = require('./conf/db')
const { SESSION_SECRET_KEY } = require('./conf/constants')

const index = require('./routes/index')
const users = require('./routes/users')
const userViewRouter = require('./routes/view/user')
const userApiRouter=require('./routes/api/user')
const errorViewRouter = require('./routes/view/error')

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
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

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
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(userApiRouter.routes(), userApiRouter.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
