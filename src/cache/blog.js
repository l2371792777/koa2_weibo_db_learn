/**
 * @description blog square cache
 */

const { get, set } = require('./_redis')
const { getBlogListByUser } = require('../servers/blog')

//session前缀，识别bloglist
const BLOG_PREFIX = "weibo:square:"

async function getSquareCacheList(pageIndex, pageSize) {
    const key = `${BLOG_PREFIX}${pageIndex}_${pageSize}`
    const cacheResult = await get(key)
    //获取缓存成功
    if (cacheResult != null) {
        return cacheResult
    }

    //读取数据库
    const result = await getBlogListByUser({ pageIndex, pageSize })
    set(key, result, 60)
    return result
}

module.exports = {
    getSquareCacheList
}