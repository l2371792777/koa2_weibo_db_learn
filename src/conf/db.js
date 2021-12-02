/**
 * @description 存储配置
 * @author ayanami
 */
const { isProd } = require("../utils/env")

let REDIS_CONF = {
    host: 'localhost',
    port: '6379'
}

let MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'ayanami',
    port: '3306',
    database: 'koa2_weibo_db'
}
console.log("isProd... " + isProd)
if (isProd) {
    REDIS_CONF = {
        host: 'localhost',
        port: '6379'
    }

    MYSQL_CONF = {
        host: 'localhost',
        user: 'ayanami',
        password: 'ayanami',
        port: '3306',
        database: 'koa2_weibo_db'
    }
}

module.exports = {
    REDIS_CONF,
    MYSQL_CONF
}