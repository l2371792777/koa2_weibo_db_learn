/**
 * @description 测试blog 个人主页 api
 */

const server = require('../server')

const { COOKIE, USER_NAME } = require('../testUserInfo')

test('加载个人主页，第一页，应该成功', async () => {
    const result = await server.get(`/api/profile/loadMore/${USER_NAME}/0`)
        .set('cookie', COOKIE)
    expect(result.body.errno).toBe(0)
    const data=result.body.data
    expect(data).toHaveProperty('isEmpty')
    expect(data).toHaveProperty('count')
    expect(data).toHaveProperty('blogList')
    expect(data).toHaveProperty('pageSize')
    expect(data).toHaveProperty('pageIndex')

})