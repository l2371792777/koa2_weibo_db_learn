/**
 * @description utils controller
 */

const fpath = require('path')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { fileOverMaxSizeInfo } = require('../model/ErrorInfo')
const fse = require('fs-extra')

//最大体积2M
const MAX_SIZE = 2 * 1024 * 1024
//文件路径
const FOLDER_PATH = fpath.join(__dirname, '..', '..', 'uploadFiles')


// 是否需要创建目录
fse.pathExists(DIST_FOLDER_PATH).then(exist => {
    if (!exist) {
        fse.ensureDir(DIST_FOLDER_PATH)
    }
})

/**
 * 保存文件
 * @param {Object} param0 图片信息
 */
async function saveFile({ name, path, type, size }) {
    if (size > MAX_SIZE) {
        await fse.remove(path)
        return new ErrorModel(fileOverMaxSizeInfo)
    }

    //移动文件
    const fileName = Date.now() + '.' + name
    console.log('fileName... ' + fileName)
    const filePath = fpath.join(FOLDER_PATH, fileName)
    console.log('filePath... ' + filePath)
    await fse.move(path, filePath)

    return new SuccessModel({ url: '/' + fileName })
}

module.exports = {
    saveFile
}