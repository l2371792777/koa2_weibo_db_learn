/**
 * @description 模型测试
 */

const {User}=require('../../src/db/model/index')

test('User模型的属性',()=>{
    const user=User.build({
        userName:'aya',
        password:'aya',
        nickName:'aya',
        gender:1,
        picture:'xxx',
        city:'shanghai'
    })
    //验证各个属性
    expect(user.userName).toBe('aya')
    expect(user.password).toBe('aya')
    expect(user.nickName).toBe('aya')
    expect(user.gender).toBe(1)
    expect(user.picture).toBe('xxx')
    expect(user.city).toBe('shanghai')
})