/**
 * @description 测试blog home api
 */

const server = require('../server')

const { COOKIE } = require('../testUserInfo')

let blogId
test('创建blog,应该成功', async () => {
    const result = await server.post('/api/blog/create')
        .send({
            image: '/image.png',
            content: 'test content' + Date.now(),
            userId: 1
        })
        .set('cookie', COOKIE)
    expect(result.body.errno).toBe(0)
    blogId = result.body.data.id
})