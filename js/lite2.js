const readline=require('readline')
let s=[]
// while(s=readline())
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/*rl.question('你如何看待 Node.js 中文网？', (answer) => {
  // TODO：将答案记录在数据库中。
  console.log(`感谢您的宝贵意见：${answer}`);

  rl.close();
});*/
rl.on('line', function (str) {
    // body...
    /*while(str!='exit'){
        console.log(s.push(str))

    }
    rl.close()*/
    console.log(`接收到：${str}`);
})
