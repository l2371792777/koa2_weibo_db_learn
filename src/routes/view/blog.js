/**
 * @description blog view router
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginCheck')

router.get('/', loginRedirect, async (ctx, next) => {
    await ctx.render('index', { blogData: '' })
})

module.exports = router