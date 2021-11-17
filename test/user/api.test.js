/**
 * @description 测试user api
 */

const server = require('../server')

//用户信息
const userName = `u_${Date.now()}`
const password = `p_${Date.now()}`

const testUser = {
    userName,
    password,
    nickName: userName,
    gender: 1
}

let COOKIE = ''

test('注册用户，注册应成功', async () => {
    const res = await server.post('/api/user/register').send(testUser)
    expect(res.body.errno).toBe(0)
})

test('重复注册用户,注册应该失败', async () => {
    const res = await server.post('/api/user/register').send(testUser)
    expect(res.body.errno).not.toBe(0)
})

test('查询用户名是否存在，用户应存在', async () => {
    const res = await server.post('/api/user/isExist').send({userName})
    expect(res.body.errno).toBe(0)
})

test('schema检测非法格式，注册失败', async () => {
    const res = await server.post('/api/user/register').send({
        userName: '123-',
        password: '1',
        gender: 4
    })
    expect(res.body.errno).not.toBe(0)
})

test('登录，应该成功', async () => {
    const res = await server
        .post('/api/user/login')
        .send({
            userName,
            password
        })
    expect(res.body.errno).toBe(0)

    // 获取 cookie
    COOKIE = res.headers['set-cookie'].join(';')
    console.log("cookie:.."+COOKIE)
})

test('删除用户，应该成功', async () => {
    const res = await server
        .post('/api/user/delete')
        .set('cookie', COOKIE)
    console.log("del..res.."+JSON.stringify(res.body))
    expect(res.body.errno).toBe(0)
})

test('再次查询用户名是否存在，用户应不存在', async () => {
    const res = await server.post('/api/user/isExist').send({userName})
    expect(res.body.errno).not.toBe(0)
})



