(function() {
  var cmdColors = {
      // 'bold': ['\x1B[1m', '\x1B[22m'], valid
      // 'italic': ['\x1B[3m', '\x1B[23m'],
      // 'underline': ['\x1B[4m', '\x1B[24m'],
      // 'strikethrough': ['\x1B[9m', '\x1B[29m'],
      'white': ['\x1B[37m', '\x1B[39m'],
      'grey': ['\x1B[90m', '\x1B[39m'],
      'black': ['\x1B[30m', '\x1B[39m'],
      'blue': ['\x1B[34m', '\x1B[39m'],
      'cyan': ['\x1B[36m', '\x1B[39m'],
      'green': ['\x1B[32m', '\x1B[39m'],
      'magenta': ['\x1B[35m', '\x1B[39m'],
      'red': ['\x1B[31m', '\x1B[39m'],
      'yellow': ['\x1B[33m', '\x1B[39m'],
      'inverse': ['\x1B[7m', '\x1B[27m'],
      'whiteBG': ['\x1B[47m', '\x1B[49m'],
      'greyBG': ['\x1B[49;5;8m', '\x1B[49m'],
      'blackBG': ['\x1B[40m', '\x1B[49m'],
      'blueBG': ['\x1B[44m', '\x1B[49m'],
      'cyanBG': ['\x1B[46m', '\x1B[49m'],
      'greenBG': ['\x1B[42m', '\x1B[49m'],
      'magentaBG': ['\x1B[45m', '\x1B[49m'],
      'redBG': ['\x1B[41m', '\x1B[49m'],
      'yellowBG': ['\x1B[43m', '\x1B[49m']
    },
    browserColors = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'purple', 'white', 'grey', 'black'];
  if (typeof window !== "undefined") {
    // in browser
    browserColors.forEach(function(item) {
      return console.log[item] = function() {
        var str = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          str[_i] = arguments[_i];
        }
        console.log("%c" + str.join(" "), "color:" + item);
      };
    });
    browserColors.forEach(function(item) {
      return console.log[item]("longfei");
    });
  } else {
    var _loop_1 = function(i) {
      console.log[i] = function() {
        var str = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          str[_i] = arguments[_i];
        }
        console.log(cmdColors[i][0] + str.join(" ") + cmdColors[i][1]);
      };
    };
    // in cmd
    for (var i in cmdColors) {
      _loop_1(i);
    }
    Object.keys(cmdColors).forEach(function(item) {
      return console.log[item]("longfei", "haha", "hei", 1, 3, 5);
    });
  }
})();
var styles = {
  'bold': ['\x1B[1m', '\x1B[22m'],
  'italic': ['\x1B[3m', '\x1B[23m'],
  'underline': ['\x1B[4m', '\x1B[24m'],
  'inverse': ['\x1B[7m', '\x1B[27m'],
  'strikethrough': ['\x1B[9m', '\x1B[29m'],
  'white': ['\x1B[37m', '\x1B[39m'],
  'grey': ['\x1B[90m', '\x1B[39m'],
  'black': ['\x1B[30m', '\x1B[39m'],
  'blue': ['\x1B[34m', '\x1B[39m'],
  'cyan': ['\x1B[36m', '\x1B[39m'],
  'green': ['\x1B[32m', '\x1B[39m'],
  'magenta': ['\x1B[35m', '\x1B[39m'],
  'red': ['\x1B[31m', '\x1B[39m'],
  'yellow': ['\x1B[33m', '\x1B[39m'],
  'whiteBG': ['\x1B[47m', '\x1B[49m'],
  'greyBG': ['\x1B[49;5;8m', '\x1B[49m'],
  'blackBG': ['\x1B[40m', '\x1B[49m'],
  'blueBG': ['\x1B[44m', '\x1B[49m'],
  'cyanBG': ['\x1B[46m', '\x1B[49m'],
  'greenBG': ['\x1B[42m', '\x1B[49m'],
  'magentaBG': ['\x1B[45m', '\x1B[49m'],
  'redBG': ['\x1B[41m', '\x1B[49m'],
  'yellowBG': ['\x1B[43m', '\x1B[49m']
};
let info = '我是青色'
let path = '我是黄色'
/*console.log('\x1B[36m%s\x1B[0m', info); //cyan
console.log('\x1B[33m%s\x1b[0m:', path); //yellow

console.log('\x1b[40m red \x1b[0m')
console.log('\x1b[40mred\x1b[31m')
//\x1b 是十六进制表示 等于八进制表示的 033,也可以写为

console.log('\u001b[31m red \u001b[39m');
console.log('\033[31m red \033[39m');
//\033[31m、\033[39m 就是特殊的控制序列，\033[31m 表示红色的前景（文字）色，\033[39m 表示默认的前景（文字）色

// console.log('\x1b[31m long \x1b[39m')
console.log('\x1b[0mlongfei\x1b[0m')*/
let util = require('util')
console.log(Object.keys(util))
