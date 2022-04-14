let fs = require('fs');

let files = {},len=__dirname.length;
function ScanDir(path) {
  if (fs.statSync(path).isFile()) {
    let temPath = path.substr(len+1);
    let n=temPath.split('/')[0]

    if (/\.aac$|\.mp3$/.test(temPath)) {
      if(!files[n]) {
        files[n]=[]
      }
      files[n].push(temPath);
    }
  }
  try {
    fs.readdirSync(path).forEach(function (file) {
      ScanDir(path + '/' + file)
    })
  } catch (e) {
  }
}

// ScanDir(process.cwd())
ScanDir(__dirname)
// console.log(__dirname)
fs.writeFileSync('list2.js', 'var list=' + JSON.stringify(files))
