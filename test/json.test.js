/**
 * @description http 测试
 */

const server = require('./server')

test('request json', async () => {
    const val=await server.get('/json')
    expect(val.body).toEqual({
        title: 'koa2 json'
    })
})