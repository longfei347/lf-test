let fs = require('fs')
let files = fs.readdirSync('./')
/*files.forEach(v => {
  // 将图片重命名,eg. img-abcde.png
  if (/(\d+\.(png|jpg|gif))/i.test(v)) {
    fs.rename(v, 'img-' +Math.random().toString(36).substr(2,5)+ RegExp.$1.slice(-4), () => {}) // fs.renameSync 同步
  }
  // 将图片复制,eg. img-abcde.png
  if (/(\d+\.(png|jpg|gif))/i.test(v)) {
    // fs.rename(v, 'img-' +Math.random().toString(36).substr(2,5)+ RegExp.$1.slice(-4), () => {})
    fs.copyFile(v, 'img-' +Math.random().toString(36).substr(2,5)+ RegExp.$1.slice(-4), () => {}); // fs.copyFileSync 同步
  }
})
*/
/*// 创建文件 覆盖写入
fs.writeFile('name.txt','今天天气不错123',(err)=>{
  console.log(err)
})
// 写入文件
fs.appendFile('name.txt','你好呀!!',(err)=>{
  console.log(err)
})
// 读取文件
fs.readFile('name.txt','utf8',(err,msg)=>{
  console.log(err)
  console.log(msg)
  // console.log(msg.toString('utf8'))
  //默认读取二进制数据流 buffer
})
// 删除文件
fs.unlink('./name.txt',(err)=>{
  console.log(err)
})*/
// console.log(process.argv.splice(2))
// 创建,增
/*const data = new Uint8Array(Buffer.from('Node.js 中文网'));
fs.writeFile('1.txt', 'longfei', (err) => {
  if (err) throw err;
  console.log('文件已被保存');
});
fs.readFile('1.txt', 'utf8', (err, data)=>{
  if (err) throw err;
  console.log(data);
});
// 删除
if (fs.statSync('./文件.txt').isFile()) {
  fs.unlink('./文件.txt', (err, d)=>{
      if (err) throw err;
      console.log('文件已被删除');
  })
}*/

// 1. fs.stat 检测是文件还是目录
// 2. fs.mkdir创建目录
// 3. fs.writeFile 创建写入文件
// 4. fs.appendFile 追加文件
// 5. fs.readFile 读取文件
// 6. fs.readdir 读取目录
// 7. fs.rename 重命名, 可移动文件
// 8. fs.rmdir 删除目录
// 9. fs.unlink 删除文件

/*let path = './';
let files = fs.readdirSync(path);
for (let i = 0; i < files.length; i++) {
  // fs.readFile(`${path}/${files[i]}`,function(err,data){
  // let newname = data.toString().split('\n')[1].split(' ')[1] + '-' + data.toString().split('\n')[0].split(' ')[1].replace(/['|']/g,'')
  console.log(files[i])
  let newname = files[i];
  if (newname.startsWith('long')) {
    fs.rename(`${path}/${newname}`, `${path}/龙`,()=>{})
  }
}*/

/*var readStream=fs.createReadStream('./js/demo.js')
var count=0;
var str='';
readStream.on('data', (data)=>{
  str+=data;
  count++;
})
readStream.on('end', (data)=>{
  console.log(str)
  console.log(count)
})

var writeStream=fs.createWriteStream('./output.txt')
// writeStream.write(str)
// writeStream.end()
// writeStream.on('finish', ()=>{
//   console.log('写入完成')
// })
readStream.pipe(writeStream)

console.log('写入完成')*/



