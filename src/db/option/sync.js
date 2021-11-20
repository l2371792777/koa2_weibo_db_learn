const seq = require('../seq')
require('./model/index')

// seq.authenticate().then(() => {
//     console.log('ok')
// }).catch(() => {
//     console.log('error')
// })

seq.sync({ force: true }).then(() => {
    process.exit()
})