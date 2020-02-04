let fs = require('fs');

let files = [],len=__dirname.length;
function ScanDir(path) {
  if (fs.statSync(path).isFile()) {
    let temPath = path.substr(len);
    if (/\.aac$|\.mp3$/.test(temPath)) {
      return files.push(path.substr(len));
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
// console.log(files)
fs.writeFileSync('list.js', 'var list=' + JSON.stringify(files))
