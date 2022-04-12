
let fs = require('fs');

let files = [],len=__dirname.length;
function ScanDir(path) {
  if (fs.statSync(path).isFile()) {
    let temPath = path.substr(len);
    if (/\.html$/.test(temPath)) {
      // console.log('path:',path)
      let p = path.substr(len+1)
      return files.push(`<a href="${p}">${p.slice(0, -5)}</a>`);
    }
  }
  try {
    fs.readdirSync(path).forEach(function (file) {
      ScanDir(path + '/' + file)
    })
  } catch (e) {}
}
// ScanDir(process.cwd())
ScanDir(__dirname)
// files = files.map(i => `<a href="${i}">${i.slice(0, -5)}</a>`);
// console.log(files)
fs.writeFileSync('index.html', `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<style>.link a {margin-right: 10px;display: inline-block;}</style>
<body>
  <h2>所有链接</h2>
  <div class="link">${files.join('')}</div>
</body>
</html>`)

