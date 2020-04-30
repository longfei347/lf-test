//# sourceURL=ttt.js
//# sourceURL=ttt.js
// export var long ="long";
// export var fei = "fei";
/*var users = [
	{ 'user': 'barney', 'age': 36 },
	{ 'user': 'fred', 'age': 40 },
	{ 'user': 'pebbles', 'age': 18 }
];
// 1. 获取所有用户名字，并以”，“分割
var names = _.chain(users)
	.map(function(user) {
		return user.user;
	})
	.join(" , ")
	.value();
// console.log(names);

// 2. 获取最年轻的用户
var youngest = _.chain(users)
	.min(function(user) {
		return user.age;
	})
	.value();
// console.log(youngest);

// 3. 获取最年长的用户
var oldest = _.chain(users)
	.max(function(user) {
		return user.age;
	})
	.value();

// console.log(oldest);

// 4. 用户数组到用户Map的转换
var userObj = _.chain(users)
	.map(function(user) {
		return [user.user, user.age];
	})
	.zipObject()
	.value();
// console.log(userObj);

class Language {
	constructor(name, founder, year) {
		this.name = name;
		this.founder = founder;
		this.year = year;
	}

	summary() {
		return this.name + "由" + this.founder + "在" + this.year + "创造";
	}
}
var lang = new Language("lf","find",2014)*/

if (document.getElementById("file")) {
  document.getElementById("file").addEventListener("change", function(e) {
    if (this.files.length && this.files[0].type.indexOf("image/") > -1) {
      var fr = new FileReader();
      fr.readAsDataURL(this.files[0]);
      fr.onload = function() {
        var oImg = document.getElementsByClassName("img")[0];
        oImg.src = this.result;
      };
    }
  })
}

function testWindow(key) {
  var windowKeys = Object.getOwnPropertyNames(window),
    len = windowKeys.length,
    i = 0;
  for (; i < len; i++) {
    if (/event/ig.test(windowKeys[i])) {
      console.info(windowKeys[i]);
    }
    // windowKeys[i].indexOf("")
  }
  return windowKeys.indexOf(key);
}
/*function fun() {
  var str = "朱晓芬我爱你",
    ss = "",
    sss, tt, mm, nn;

  for (var i = 0; i < str.length; i++) {
    ss += str.charCodeAt(i);
  }
  tt = encodeURIComponent(str).replace(/%/g, "").toString().toLowerCase();
  console.log(ss, tt);

  //console.log(str.replace(/([\u4e00-\u9fa5]{3})([\u4e00-\u9fa5]{3})/g,"$2,$1"));
  // console.log(str.replace(/(.{3})(.+)/g,"$2,$1"));
  // str.replace(/(?<=.{3})/,',') // 同上

  // 不准确,unicode不一定是5位
  sss = ss.replace(/\d{5}/g, function(val, i) {
    return String.fromCharCode(+val);
  })
  console.log(sss);

  for (i = 0, sss = ""; 5 * i < ss.length; i++) {
    sss += String.fromCharCode(ss.substr(i * 5, 5));
  }
  console.log(sss);

  mm = tt.replace(/\w{2}/g, function(val, i) {
    return "%" + val;
    //console.log(arguments)
  })
  console.log(mm, decodeURIComponent(mm));

  nn = tt.replace(/\w/g, function(val, i) {
    if (i % 2 == 0) {
      return "%" + val;
    } else {
      return val;
    }
  })
  console.log(nn);
}
*/
/*function sumFn(a,b,c) {
  return a+b+c
}
let sum=curry(sumFn);

console.log(sum(2))
console.log(sum(2)(3))
console.log(sum(2)(3)(5))
console.log(sum(2,3,5))*/
/*let ary = [1, [2, [3, [4, 5]]], 6];
while (ary.some(Array.isArray)) {
  ary = [].concat(...ary);
  console.log(ary)
}*/
// alert('width:'+window.screen.width+' height:'+window.screen.height+' ratio:'+window.devicePixelRatio)
//
/*
// 使a==1&&a==2&&a==3为真
// 方法1
let a=[1,2,3]
a.join=a.shift
console.log(a==1&&a==2&&a==3)
//方法2
let aa={
  [Symbol.toPrimitive]:(function (argument) {
    let i=1;
    return function () {
      return i++
    }
  })()
}
console.log(aa==1&&aa==2&&aa==3)
// 方法3
let aaa=new Proxy({}, {
  i:1,
  get: function() {
    return ()=>this.i++;
  }
})
console.log(aaa==1&&aaa==2&&aaa==3)
// 方法4
let a4={
  i: 1,
  valueOf(){
    return this.i++
  }
}
console.log(a4==1&&a4==2&&a4==3)
// 方法5
let a5={
  i: 1,
  toString(){
    return this.i++
  }
}
console.log(a5==1&&a5==2&&a5==3)*/
/*
// https://www.nowcoder.com/practice/539054b4c33b4776bc350155f7abd8f5?tpId=37&tqId=21263&tPage=2&rp=&ru=%2Fta%2Fhuawei&qru=%2Fta%2Fhuawei%2Fquestion-ranking
// 该题本地可以,牛客网不行
// 分别统计字母,空格,数字,其他字符的个数
let n='1qazxsw23 edcvfr45tgbn hy67uj m,ki89ol.\\/;p0-=\\]['
let arr=[0,0,0,0]
arr[0]=n.match(/[a-z]/g)&&n.match(/[a-z]/g).length
console.log(arr[0])
arr[1]=n.match(/\s/g)&&n.match(/\s/g).length
console.log(arr[1])
arr[2]=n.match(/\d/g)&&n.match(/\d/g).length
console.log(arr[2])
arr[3]=n.length-arr[0]-arr[1]-arr[2]
console.log(arr[3])*/
/*let n='I am a student'
let arr=n.split(/[^a-z]+/i).reverse()
console.log(arr.join(' '))*/

/*// https://www.nowcoder.com/practice/d3d8e23870584782b3dd48f26cb39c8f?tpId=37&tqId=21253&tPage=2&rp=&ru=%2Fta%2Fhuawei&qru=%2Fta%2Fhuawei%2Fquestion-ranking
// 该题本地可以,牛客网不行, 貌似对replace解析问题
// 下标为奇数的字符和下标为偶数的字符分别从小到大排序。这里的下标意思是字符在字符串中的位置。
// 对排序后的字符串进行操作，如果字符为‘0’——‘9’或者‘A’——‘F’或者‘a’——‘f’，则对他们所代表的16进制的数进行BIT倒序的操作，并转换为相应的大写字符
let n='dec fab'
n=n.replace(' ', '')
let a1=[],a2=[]
for (let i=0;i<n.length;i++){
    if (i%2==0){
        a1.push(n[i])
    } else {
        a2.push(n[i])
    }
}
let sort=(a,b)=> a>b?1:-1
a1.sort(sort)
a2.sort(sort)
let nn=''
a1.forEach((itm,index)=> {
    nn+=itm+(a2[index]?a2[index]:'')
})
let ss=nn.replace(/[0-9a-f]/gi, function(item){
    let reStr = parseInt(item,item>'9'?16:10).toString(2).split('').reverse().join('')
    return parseInt(reStr,2).toString(16).toUpperCase()
})
console.log(ss) //5D37BF*/
/*
// 较大整数相加,转成字符串相加
let n=3,
n2=['1111111111111111111111111111', '23413412323452345', '2222222222222222222'];
let sum='0'
while(n>0){
    sum=stringAdd(sum, n2[n-1])
    n--
}
console.log(sum)*/
/*let arr=[],n='123123'
for(let i=0;i<n.length;i++){
    if(n.substr(i+1).indexOf(n.charAt(i))==-1){
        arr.push(n.charAt(i))
    }
}

console.log(arr)*/
/*
// 第一种方式 找出连续字符串长度最大且ascii值最小的字符串,
let n='aaabbbbbacccccccccbbzzzzzzzzz',arr=[] //ccccccccc
let len=n.length, i=len-1;
while(i>0) {
    if (n[i]==n[i-1]){
        let ind=i;
        while(n[i--]==n[i]) {
          ind = i
        }
        arr.push(n.substr(ind))
        n=n.slice(0,ind)
        i=n.length-1;
    } else {
      n=n.slice(0,i-1)
      i--
    }
}
let max=1, str='';
arr.forEach((itm,s)=>{
    if(itm.length>max){
        max=itm.length;
        str=itm
    } else if (itm.length==max && str[0]>itm[0]) {
        str=itm
    }
})
console.log(str)*/
/*
// 第二种方式
let n='aaabbbbbacccccccccbbzzzzzzzzz'

let arr1=[...new Set(n.split(''))],len=arr1.length, i=0,max;
for (;i<len;i++){
  n.match(new RegExp(arr1[i]+'+','g')).forEach(itm=> {
    if (!max) {
      max={}
      max.n=itm.length
      max.str=itm
    } else if(max.n == itm.length && max.str[0]>itm[0]){
      max.str=itm
    } else if (max.n < itm.length) {
      max.str=itm
      max.n=itm.length
    }
  })
}*/
/*
// 输入年月日计算到这个日期的天数
let year=2000,month=5,day=31
let monthArr=[31,28,31,30,31,30,31,31,30,31,30,31]
let sum=day;
for (let i=0;i<month-1;i++){
    sum+=monthArr[i]
}
year=+year
if (year%4==0&&year%400!==0){
    sum+=1
}
console.log(year, month, day)
console.log(sum)*/
/*let str='xcopy /s  "c:\\" d:\\'
let arr=str.split(/\s+/)
console.log(arr.length)
arr.map(itm=> {
  let a=itm.replace(/['"]/g, '')
  console.log(a)
  return a
})*/
// let arrA=[...new Set(stra.split(''))]
// arrA.filter(itm=>strb.includes(itm))
/*
// 计算两个字符串中最大公共字符串个数
let stra='aaasdfas', strb='werasdfawer'
let len=stra.length
let lenb=strb.length
len>lenb && ([stra,strb]=[strb,stra])
function fn() {
  // body...
  let i=len
  let j;
  for (;i>0;i--) {
    for (j=0;j<=len-i;j++) {
      console.log(stra.substr(j,i))
      if (strb.includes(stra.substr(j,i))) {
        console.log(i)
        return i
      }
    }
  }
}
fn()*/
/*//验证尼科彻斯定理，即：任何一个整数m的立方都可以写成m个连续奇数之和。
let n=7
let s=Math.pow(n, 3)
let min,sum=0
if (n%2==0) {
    min=s/n+1-2*(n/2)
} else {
  min=s/n-(n-1)
}
sum=min
let arr=[min]
for (let i=1;i<n;i++){
    sum+=min+2*i
    arr.push(min+2*i)
}
if (sum==s){
    console.log(arr.join('+'))
}*/
/*
// 数组排列种数
let n=3;
let arr=[]
if(n>0){
  let str='1 2 3 5'
  // arr.push(str)
  let src=str.split(' ')
  let len =src.length
  src.sort((a,b)=>+a- +b)
  let getFn=(a1, a2)=>{
    // let result=[]
    if (a2.length==1) {
      let a3=a1.concat(a2)
      console.log(a3.join(' '))
      arr.push(a3)
      return a3
    } else {
      for (let i=0;i<a2.length;i++) {
        let aa=[...a2]
        aa.splice(i,1)
        // a1.push(a2[i])
        getFn(a1.concat(a2[i]), aa)
      }
    }
  }
  src.forEach((itm,i)=>{
    let a=[...src]
    a.splice(i,1)
    getFn([itm], a)
    // arr.push(getFn([itm], a))
  })
}
*/
/**
 *
 * @param {*} source 源数组
 * @param {*} count 要取出多少项
 * @param {*} isPermutation 是否使用排列的方式
 * @return {any[]} 所有排列组合,格式为 [ [1,2], [1,3]] ...
 */
/*function getNumbers(source, count, isPermutation = true) {
  //如果只取一位，返回数组中的所有项，例如 [ [1], [2], [3] ]
  let currentList = source.map((item) => [item]);
  if (count === 1) {
    return currentList;
  }
  let result = [];
  //取出第一项后，再取出后面count - 1 项的排列组合，并把第一项的所有可能（currentList）和 后面count-1项所有可能交叉组合
  for (let i = 0; i < currentList.length; i++) {
    let current = currentList[i];
    //如果是排列的方式，在取count-1时，源数组中排除当前项
    let children = [];
    if (isPermutation) {
      children = getNumbers(source.filter(item => item !== current[0]), count - 1, isPermutation);
      // console.log({children})
    } else {
    //如果是组合的方法，在取count-1时，源数组只使用当前项之后的
      children = getNumbers(source.slice(i + 1), count - 1, isPermutation);
    }
    for (let child of children) {
      result.push([...current, ...child]);
    }
  }
  return result;
}

let arr = [1, 2, 3];

const result = getNumbers(arr, 3);
console.log(result);*/


/*function fun(str){
    let flag=0;
    let len=str.length;
    if (len<8){
        return 'NG'
    }
    for (let i=0;i<len-3;i++) {
        let sub=str.substring(i,i+3)
        if(str.substr(i+3).indexOf(sub)>-1){
          return 'NG'
        }
    }
    if (/[a-z]/.test(str)) {
        flag++
    }
    if (/[A-Z]/.test(str)) {
        flag++
    }
    if (/\d/.test(str)) {
        flag++
    }
    if (/[^a-zA-Z0-9]/.test(str)) {
        flag++
    }
    if (flag<3) {
        return 'NG'
    }
    return 'OK'
}
fun('S^fc8G5-78hlgV3Xfc8')*/
// let n= readline()
/*let n='CJFRR8pYzTjcMy860OS96WRU9C9XjNW178n1FnFmpNcUvrS'
let arr=n.split('')
let len=arr.length
for (let i=0;i<len;i++) {
    let code=arr[i].charCodeAt()
    if(code>64&&code<91) {
        arr[i]=String.fromCharCode(code+33)
    }else if (code>96&&code<100){
        arr[i]=2
    }else if (code>99&&code<102){
        arr[i]=3
    }else if (code>101&&code<104){
        arr[i]=4
    }else if (code>103&&code<106){
        arr[i]=5
    }else if (code>105&&code<108){
        arr[i]=6
    }else if (code>107&&code<111){
        arr[i]=7
    }else if (code>110&&code<113){
        arr[i]=8
    }else if (code>112&&code<116){
        arr[i]=9
    }
}
console.log(arr.join(''))*/

/*//删除字符串中出现次数最少的字符后的字符串
let n='rrnnqqzzzz'
let arr=n.split('')
let ns=[...new Set(arr)]
if (ns.length==n.length) {
    console.log('')
} else {
    let str='',min=20;
    let nss=ns.map((itm)=>({val:itm,length: n.match(new RegExp(itm, 'g')).length}))
    for(let i of nss ) {
      if (i.length<min) {
        min=i.length
        str=i.val
      } else if (i.length==min) {
        str+=i.val
      }
    }
    console.log(n.replace(new RegExp('['+str+']', 'g'), ''))
}*/
/*let sort=function(a,b) {
    let codeA=a.toLowerCase().charCodeAt()
    let codeB=b.toLowerCase().charCodeAt()
    console.log({a, b})
    if (codeA>96&&codeA<123 && codeB>96&&codeB<123){
        console.log({codeA, codeB})
        if (codeA>codeB){
            return 1
        } else {
            return -1
        }

    } else {
        return 0
    }
}*/
/*// 将输入字符串中的字母按顺序排列,不分大小写,其他字符不变,
//&~#FUyTtAfZhCs&Dly%M@(muOI@Le^mydvc((w$x-cP&t-f$R%CCp)bCck@P-ag
let n='A Famous Saying: Much Ado About Nothing (2012/8).'
let nn=n.replace(/[^a-z]/gi,'').split('')
nn=nn.sort((a,b)=>{
  return a.toLowerCase()>b.toLowerCase()?1:a.toLowerCase()==b.toLowerCase()?0:-1
})
n=n.replace(/[a-z]/gi, function(i,aa){
  //console.log({i,aa})
  return nn.shift()
})
console.log('A aaAAbc dFgghh: iimM nNn oooos Sttuuuy (2012/8).')
console.log(n)*/


/*let aa=[1,3,5,7,2,4]
aa.sort((a,b)=>{
  console.count()
  console.log({a,b})
  return a>b?1:-1
})
console.log(aa)*/
/*function encrypt(str) {
  str=str.replace(/[0-9a-z]/gi, function(s,i){
    let code=s.charCodeAt()
    if (s=='9'){
      return '0'
    } else if (code>=48 && code<57) {
      return ''+(+s+1)
    } else if (code>=65&&code<90) {
      return String.fromCharCode(code+33)
    } else if (code==90) {
      return 'a'
    } else if (code>=97&&code<122) {
      return String.fromCharCode(code-31)
    } else if (code==122) {
      return 'A'
    }
  })
  return str
}
function uncrypt(str) {
  str=str.replace(/[0-9a-z]/gi, function(s,i){
    let code=s.charCodeAt()
    if (s=='0'){
      return '9'
    } else if (code>48 && code<=57) {
      return ''+(+s-1)
    } else if (code>65&&code<=90) {
      return String.fromCharCode(code+31)
    } else if (code==65) {
      return 'z'
    } else if (code>97&&code<=122) {
      return String.fromCharCode(code-33)
    } else if (code==97) {
      return 'Z'
    }
  })
  return str
}
console.log(encrypt('aBcDefg'))*/

/*
// 输入两个数,一个为总页面n,一个为当前页面k,其中当前页需显示前后2页,页码需显示首页与尾页,其余页面显示省略号
function fun(n, k) {
  let arr=[],i=1;
  if (n<=7) {
    for (;i<=n;i++) {
      arr.push(i)
    }
  } else {
    if (k<=4) {
      for (i=1;i<=k+2;i++) {
        arr.push(i)
      }
      if (n>k+2) {
        arr.push('...')
      }
      arr.push(n)
    } else if (k>4 && n>k+2) {
      arr.push(1, '...', k-2,k-1,k,k+1,k+2, '...',n)
    } else if (n<=k+2) {
      arr.push(1, '...')
      for (i=k-2;i<=n;i++) {
        arr.push(i)
      }
    }
  }
  console.log(arr.join(','))
  return arr
}
fun(7,4)
fun(8,3)
fun(8,4)
fun(94, 2)
fun(94, 5)
fun(94, 92)*/
/*// 计算数值a=1,a-z,aa,ab=27, ...
function fn(s) {
  s = s.toUpperCase()
  let len=s.length,i=0,sum=0;
  for (i=len;i>0;i--) {
    sum+=(s.charCodeAt(len-i)-64)*26**(i-1)
  }
  console.log(sum)
  // return sum
  // 方法2,使用进制转化, 注意边界值如Z 刚好26即Q,转为26进制为NaN
  let ss=s.replace(/\w/g, (s)=>{
    return s.charCodeAt()-65<10?s.charCodeAt()-65: String.fromCharCode(s.charCodeAt()-10)

  })
  let n=parseInt(ss, 26)
  n+=parseInt(new Array(s.length).fill(1).join(''), 26)
  console.log(n)
  return n
}
fn('A')
fn('Z')
fn('AB')
fn('ABC')
fn('ABCD')*/

/*function compose(...funcs) {
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
function a(a) {
  console.log('a')
  return a+'a'
}
function b(b) {
  console.log('b')
  return b+'b'
}
function c(c) {
  console.log('c')
  return 'c'
}
console.log(compose(a,b,c)())*/

// [1,3,4,5].reduce((a,b)=>a+b)
/*let obj={a:1,b:2,
  __proto__: {
    c:3
  }
}
for (let aa in obj) {
  // in 表示在原型链查找,如果用 hasOwnProperty 是有问题的，它只能找私有属性
  console.log(aa)
}*/
// 深拷贝对象 使用messagechannel不能含有函数
/*function fun1 (obj) {
  return new Promise(function(resolve, reject) {
    var { port1, port2 } = new MessageChannel();
    port1.onmessage = function(e) {
      resolve(e.data);
    };
    port2.postMessage(obj);
  });
}*/
// var a = { a: 1 };
// fun1(a).then(e => console.log(a, a == e));
/*let aa = [
    ["a", "aa", "aaa", "aaaa"],
    ["b", "bb", "bbb"],
    ["a", "ab", "aba"],
    ["a", "aa", "aab"]
]
aa=[...new Set(aa.flat(2))].sort()
function fun2(arr) {
  let max=1,j=1,ar=[];
  aa.forEach(itm=> itm.length>max && (max=itm.length))
  let arrMap = arr.map(itm=>({name: itm, child:[]}))
  for (;j<=max;j++){
    ar.push(arrMap.filter(itm=>itm.name.length==j))
  }
  for (j=max-1;j>0;j--) {
    ar[j].forEach(itm=> {
      if (ar[j-1].filter(ii=>ii.name == itm.name.slice(0, -1)).length) {
        ar[j-1].find(ii=>ii.name == itm.name.slice(0, -1)).child.push(itm)
      }
    })
  }
  // console.log(ar[0])
  return ar[0]
}*/
// console.log(fun2(aa))

/*[
    {
        "name" : "a",
        "child" : [
            {
                "name" : "aa",
                "child" : [
                    {
                        "name" : "aaa",
                        "child" : [
                            {
                                "name" : "aaaa",
                                "child" : []
                            }
                        ]
                    },
                    {
                        "name" : "aab",
                        "child" : []
                    }
                ]

            },
            {
                "name" : "ab",
                "child" : [
                    {
                        "name": "aba",
                        "child" : []
                    }
                ]

            }
        ]
    },
    {
        "name": "b",
        "child" : [
            {
                "name" : "bb",
                "child" : [
                    {
                        "name" : "bbb",
                        "child" : []
                    }
                ]
            }
        ]
    }
]*/

