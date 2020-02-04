let fs = require('fs')
let files = fs.readdirSync('./')
files.forEach(v => {
  if (/(\d+\.png)/.test(v)) {
    fs.rename(v, 'baluobo' + RegExp.$1.padStart(6, '0'), () => {})
  }
})
