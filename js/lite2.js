const readline=require('readline')
const fs = require('fs');


let s=[]
// while(s=readline())
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/*rl.question('你如何看待 Node.js 中文网？', (answer) => {
  // TODO：将答案记录在数据库中。
  console.log(`感谢您的宝贵意见：${answer}`);
  // rl.close();
});
rl.on('line', function (str) {
    console.log(`接收到：${str}`);
    console.log(s.push(str))
    if (str==='exit'){
      rl.close()
    }
})
*/
/*async function processLineByLine() {
  const fileStream = fs.createReadStream('rename.js');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // 注意：我们使用 crlfDelay 选项将 input.txt 中的所有 CR LF 实例（'\r\n'）识别为单个换行符。

  for await (const line of rl) {
    // input.txt 中的每一行在这里将会被连续地用作 `line`。
    console.log(`Line from file: ${line}`);
  }
  // rl.close();
}

processLineByLine();*/
