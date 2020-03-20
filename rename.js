// 1. fs.stat 检测是文件还是目录
// 2. fs.mkdir创建目录
// 3. fs.writeFile 创建写入文件
// 4. fs.appendFile 追加文件
// 5. fs.readFile 读取文件
// 6. fs.readdir 读取目录
// 7. fs.rename 重命名, 可移动文件
// 8. fs.rmdir 删除目录
// 9. fs.unlink 删除文件

const fs = require('fs');
let path = './';
/*let files = fs.readdirSync(path);
for (let i = 0; i < files.length; i++) {
	// fs.readFile(`${path}/${files[i]}`,function(err,data){
	// let newname = data.toString().split('\n')[1].split(' ')[1] + '-' + data.toString().split('\n')[0].split(' ')[1].replace(/['|']/g,'')
	console.log(files[i])
	let newname = files[i];
	if (newname.startsWith('long')) {
		fs.rename(`${path}/${newname}`, `${path}/龙`,()=>{})
	}
  // console.log('files:', files[i])
	// })
}*/

var readStream=fs.createReadStream('./aa.txt')
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
/*for (var i=0;i<10;i++) {
  str+="看得见浪费时间了\n";
}*/
var writeStream=fs.createWriteStream('./output.txt')
/*writeStream.write(str)
writeStream.end()
writeStream.on('finish', ()=>{
  console.log('写入完成')
})*/
readStream.pipe(writeStream)

console.log('写入完成')

