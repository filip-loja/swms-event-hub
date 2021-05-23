const fs = require('fs')
fs.writeFileSync('./src/build-date.js', `module.exports = '${(new Date()).toString()}'`)
