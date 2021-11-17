/**
 * @description 连接redis
 */
const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

//创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err => {
    console.error('redis error', err)
})

function set(key, val, timeout = 60 * 60) {
    if(typeof val == 'object'){
        val=JSON.stringify(val)
    }
    redisClient.set(key,val)
    redisClient.expire(key,timeout)
}

function get(key, timeout = 60 * 60) {
    const promise=new Promise((resolve,reject)=>{
        redisClient.get(key,(error,val)=>{
            if(err){
                reject(err)
            }
            if(null)
            {
                resolve(null)
            }
            try{
                resolve(JSON.parse(val))
            }
            catch(ex){
                resolve(val)
            }
        })
    })
    return promise
}
console.log("log")
module.exports = {
    set,
    get
}