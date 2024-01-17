const EXCEL = class {
  construct() {}
  /**
   * [exportsCSV 导出数据到CSV]
   * @param  {Array}  [headers=[]]   [表头]
   * @param  {Array}  [body=[]]      [内容]
   * @param  {String} [name='excel'}] [文件名]
   * @return {[type]}                 [无]
   */
  exportsCSV({ headers = [], body = [], name = 'csv', callback = function () {} }) {
    // _headers = ['id', 'age', 'sex']
    // _body = [
    //   {
    //     'id': '1',
    //     'age': 12,
    //     'sex': '男'
    //   },
    //   {
    //     'id': '2',
    //     'age': 24,
    //     'sex': '女'
    //   },
    //   ......
    // ]
    name = name || 'test';
    const h = headers.join(',') + '\n'; // 格式化表头
    const b = body
      .map(item => {
        // 格式化表内容
        return Object.values(item).join(',');
      })
      .join('\n');
    const output = h + b; // 合并

    const BOM = '\uFEFF';
    // 创建一个文件CSV文件
    var blob = new Blob([BOM + output], { type: 'text/csv' });
    // IE
    if (navigator.msSaveOrOpenBlob) {
      // 解决大文件下载失败
      // 保存到本地文件
      navigator.msSaveOrOpenBlob(blob, `${name}.csv`);
    } else {
      // let uri = encodeURI(`data:text/csv;charset=utf-8,${BOM}${output}`)
      let downloadLink = document.createElement('a');
      // downloadLink.href = uri
      downloadLink.setAttribute('href', URL.createObjectURL(blob)); // 因为url有最大长度限制，encodeURI是会把字符串转化为url，超出限制长度部分数据丢失导致下载失败,为此我采用创建Blob（二进制大对象）的方式来存放缓存数据，具体代码如下：
      downloadLink.download = `${name}.csv`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
    callback();
  }
};
function getDownloadUri(data) {
  const mimeType = 'attachment/csv';
  const charset = ';charset=utf-8,';
  const _utf = '\uFEFF'; // 为了使文件以utf-8的编码模式，同时也是解决中文乱码的问题
  return 'data:' + mimeType + charset + _utf + encodeURIComponent(data);
}
function getDownloadUri(data) {
  const _utf = '\uFEFF'; // 为了使文件以utf-8的编码模式，同时也是解决中文乱码的问题
  if (window.Blob && window.URL && window.URL.createObjectURL) {
    const blob = new Blob([_utf + data], {
      type: 'text/json' // 写自己需要的数据格式
    });
    return URL.createObjectURL(blob);
  }
}
function saveFileByExecCommand(data, fileName) {
  const newWindow = window.top.open('about:blank', '_blank');
  newWindow.document.write('sep=,\r\n' + data);
  newWindow.document.close();
  newWindow.document.execCommand('SaveAs', false, fileName);
  newWindow.close();
}

function saveData2File(data, fileName) {
  const bw = getBrowser(); // 获取浏览器信息
  if (!bw['edge'] || !bw['ie']) {
    const element = document.createElement('a');
    const uri = getDownloadUri(data);
    element.href = uri;
    element.download = fileName;
    const a = document.body.appendChild(element);
    const evt = document.createEvent('HTMLEvents');
    evt.initEvent('click', false, false); // 不加后面两个参数在Firefox上报错
    a.dispatchEvent(evt);
    document.body.removeChild(element);
  } else if (bw['ie'] >= 10 || bw['edge'] === 'edge') {
    const _utf = '\uFEFF'; // 为了使文件以utf-8的编码模式，同时也是解决中文乱码的问题
    const blob = new Blob([_utf + data], {
      type: 'text/json' // 自己需要的数据格式
    });
    navigator.msSaveBlob(blob, fileName);
  }
}

function getBrowser() {
  const sys = {};
  const ua = navigator.userAgent.toLowerCase();
  if (ua.indexOf('edge') !== -1) {
    sys.edge = 'edge';
  } else if (ua.match(/rv:([\d.]+)\) like gecko/)) {
    sys.ie = ua.match(/rv:([\d.]+)\) like gecko/)[1];
  } else if (ua.match(/msie ([\d.]+)/)) {
    sys.ie = ua.match(/msie ([\d.]+)/)[1];
  } else if (ua.match(/firefox\/([\d.]+)/)) {
    sys.firefox = ua.match(/firefox\/([\d.]+)/)[1];
  } else if (ua.match(/chrome\/([\d.]+)/)) {
    sys.chrome = ua.match(/chrome\/([\d.]+)/)[1];
  } else if (ua.match(/opera.([\d.]+)/)) {
    sys.opera = ua.match(/opera.([\d.]+)/)[1];
  } else if (ua.match(/version\/([\d.]+).*safari/)) {
    sys.safari = ua.match(/version\/([\d.]+).*safari/)[1];
  }
  return sys;
}
const getAuthCode = () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const txt = 'txt';
  ctx.fillText(txt, 10, 10);
  console.log(canvas.toDataURL());
};
// 生成uuid 第一种
function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
// 第二种;
function uuid() {
  var s = [];
  var hexDigits = '0123456789abcdef';
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-';

  var uuid = s.join('');
  return uuid;
}
// uuid(); // "ffb7cefd-02cb-4853-8238-c0292cf988d5"
// 第三种
function guid2() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
}
// guid2() // "748eea29-f842-4af9-a552-e1e1aa3ed979"
// 第四种
const getUuid = () => {
  return crypto.randomUUID(); //'51147a43-7488-499e-8dfe-ed54f5dd2127'
  // return crypto.randomUUID().replace(/\-/g, ''); //'51147a437488499e8dfeed54f5dd2127'
};
function uuid2() {
  var uuid = '',
    i,
    random;
  for (i = 0; i < 32; i++) {
    random = (Math.random() * 16) | 0;
    if (i == 8 || i == 12 || i == 16 || i == 20) {
      uuid += '-';
    }
    uuid += (i == 12 ? 4 : i == 16 ? (random & 3) | 8 : random).toString(16);
  }
  return uuid;
}

function equalObjects(a, b) {
  // 1 判断键相等
  let aKeys = Object.keys(a);
  let bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false;
  }
  let res = aKeys.every(item => bKeys.includes(item));
  if (!res) {
    return false;
  }
  // 2 键对应的值相等
  for (const k in a) {
    if (a[k] !== b[k]) {
      return false;
    }
  }
  return true;
}
function toThousands(n) {
  let num = n.toString();
  let result = '';
  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  return result;
}

function downloadFile(content, fileName) {
  //下载base64图片
  var base64ToBlob = function (code) {
    let parts = code.split(';base64,');
    let contentType = parts[0].split(':')[1];
    let raw = window.atob(parts[1]);
    let rawLength = raw.length;
    let uInt8Array = new Uint8Array(rawLength);
    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], {
      type: contentType
    });
  };
  let aLink = document.createElement('a');
  let blob = base64ToBlob(content); //new Blob([content]);
  let evt = document.createEvent('HTMLEvents');
  evt.initEvent('click', true, true); //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
  aLink.download = fileName;
  aLink.href = URL.createObjectURL(blob);
  aLink.click();
}

function toJson(str) {
  return (
    str
      // .replace(/[\n\s\t]+/g, '')
      .replaceAll("'", '"')
      .replaceAll(/(?<!")\w+(?=(\s*:\s*\d+,?|\s*:\s*"))/g, s => `"${s}"`)
  );
}
// 将复制的表单数据转对象, 数字会变字符串 a=1&b=2
window._getFormData = s => {
  if (/: \n?/.test(s)) {
    s = s.replace(/: \n?/g, '=').replace(/\n/g, '&');
  }
  return s.split('&').reduce((a, b) => {
    let tmp = b.split('=');

    if (Array.isArray(a[tmp[0]])) {
      a[tmp[0]].push(tmp[1]);
    } else if (a[tmp[0]] !== undefined) {
      a[tmp[0]] = [a[tmp[0]]];
    } else {
      a[tmp[0]] = tmp[1];
    }
    return a;
  }, {});
};
function fetchApi({ data, serviceId, roarand, url }) {
  return fetch(url, {
    method: 'POST',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: JSON.stringify({ ...data, serviceId, roarand }),
    referrer: 'client'
  });
}
function saveLocalstorage() {
  let obj = {};
  for (let i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    console.log(key);
    obj[key] = JSON.parse(localStorage.getItem(key));
  }

  function saveContent(content, fileName) {
    let aTag = document.createElement('a');
    aTag.setAttribute('download', fileName);
    let blob = new Blob([content], {
      type: ''
    });
    aTag.setAttribute('href', URL.createObjectURL(blob));
    document.body.appendChild(aTag);
    aTag.click();
    document.body.removeChild(aTag);
  }
  saveContent('let local = ' + JSON.stringify(obj), 'Localstorage.js');
}
function isIncludedChinese(value) {
  const chinesePunctuations = '“”‘’；：《》？、（）！￥—…，【】';
  const chinesePunctuationSArr = chinesePunctuations.split('').map(item => escape(item));
  const valueArr = escape(value).match(/%u.{4}/g) ?? [];
  if (new Set(valueArr.concat(chinesePunctuationSArr)).size !== chinesePunctuationSArr.length) {
    return true;
  } else {
    return false;
  }
}
function getCodes() {
  // 查提交代码行数, 打开https://scmt.rnd.huawei.com/CompassWeb/codeQuery/personal, 在控制台输入该函数并执行, 可自己存在油猴脚本或chrome代码片段里
  let tm = [
    { employeeId: 'z30014695', fullname: '赵小明 z30014695' },
    { employeeId: 'mWX1131070', fullname: '毛鹏飞 mWX1131070' },
    { employeeId: 'lWX1155146', fullname: '刘定成 lWX1155146' },
    { employeeId: 'mWX1090572', fullname: '马燕燕 mWX1090572' },
    { employeeId: 'wWX975549', fullname: '王维涛 wWX975549' },
    { employeeId: 'pWX598461', fullname: '潘鑫 pWX598461' },
    { employeeId: 'l30003589', fullname: '龙飞 l30003589' },
    { employeeId: 'l00642367', fullname: '李柱鹏 l00642367' },
    { employeeId: 'wWX322236', fullname: '王洪 wWX322236' },
    { employeeId: 'rWX596527', fullname: '任明 rWX596527' },
    { employeeId: 'zWX877482', fullname: '张桢 zWX877482' },
    { employeeId: 'y30008968', fullname: '杨少伟 y30008968' },
    { employeeId: 'wWX607471', fullname: '温定福 wWX607471' },
    { employeeId: 'wWX603081', fullname: '韦鑫 wWX603081' },
    { employeeId: 'yWX5324771', fullname: '殷浩文 yWX5324771' },
    { employeeId: 'yWX1134827', fullname: '杨雷刚 yWX1134827' },
    { employeeId: 'y30016721', fullname: '严伟东 y30016721' },
    { employeeId: 'tWX707839', fullname: '涂亚光 tWX707839' },
    { employeeId: 'z30026785', fullname: '张明亮 z30026785' }
  ];
  let startDate = '2023-05-01';
  let endDate = '2023-05-31';
  Promise.all(
    tm.map(itm => $.get(`/CompassWeb/v1/compass/v1/person/commits?userName=${itm.employeeId}&startDate=${startDate}&endDate=${endDate}&type=code&pageNo=1&pageSize=1`))
  ).then(r => {
    console.table(
      r.map((item, i) => ({
        fullname: tm[i].fullname,
        提交行数: item.result.statistics.allCommitSize,
        提交次数: item.result.statistics.allCommitNumber,
        文件数: item.result.statistics.fileNumber
      }))
    );
  });
}

// Array.from({length: 5}, (v,i)=>i)
// Array.from(new Array(5), (v,i)=>i)
// new Array(5).fill(0).map((v,i)=>i)

function launchFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullScreen();
  } else {
    document.exitFullscreen();
  }
}

// launchFullscreen(document.documentElement);

function groupArrayByKey(arr = [], key) {
  return arr.reduce((t, v) => (!t[v[key]] && (t[v[key]] = []), t[v[key]].push(v), t), {});
}
// const arr = [
//   { classId: "1", name: "Jack", age: 16 },
//   { classId: "1", name: "Jon", age: 15 },
//   { classId: "2", name: "Jenny", age: 16 },
//   { classId: "3", name: "Jim", age: 15 },
//   { classId: "2", name: "Zoe", age: 16 }
// ];
// groupArrayByKey(arr, "classId");

/**
 * 浏览器下载静态文件
 * @param {String} name 文件名
 * @param {String} content 文件内容
 */
function downloadFile(name, content) {
  if (typeof name == 'undefined') {
    throw new Error('The first parameter name is a must');
  }
  if (typeof content == 'undefined') {
    throw new Error('The second parameter content is a must');
  }
  if (!(content instanceof Blob)) {
    content = new Blob([content]);
  }
  const link = URL.createObjectURL(content);
  download(link, name);
}
//下载一个链接
function download(link, name) {
  if (!name) {
    //如果没有提供名字，从给的Link中截取最后一坨
    name = link.slice(link.lastIndexOf('/') + 1);
  }
  let eleLink = document.createElement('a');
  eleLink.download = name;
  eleLink.style.display = 'none';
  eleLink.href = link;
  document.body.appendChild(eleLink);
  eleLink.click();
  document.body.removeChild(eleLink);
}
// 转tree结构
function listToTree(list, parentIp = null) {
  return list
    .filter(item => item.parentIp === parentIp)
    .map(item => ({
      ...item,
      children: listToTree(list, item.name)
    }));
}
// 转list结构
function treeToArray(list, newArr = []) {
  list.forEach(item => {
    const { children } = item;
    if (children) {
      delete item.children;

      if (children.length) {
        newArr.push(item);
        return treeToArray(children, newArr);
      }
    }
    newArr.push(item);
  });
  return newArr;
}
// 好评
function star(n) {
  if (n < 0 || n > 5) {
    n = 0;
  }
  const StartScore = rate => '★★★★★☆☆☆☆☆'.slice(5 - rate, 10 - rate);
  return StartScore(n);
}

function formatNum(num) {
  const ThousandNum = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return ThousandNum(num);
  // const money = ThousandNum(20190214); // money => "20,190,214"
}
// 可判断类型：undefined、null、string、number、boolean、array、object、symbol、date、regexp、function、asyncfunction、arguments、set、map、weakset、weakmap
function dataType(tgt, type) {
  const dataType = Object.prototype.toString
    .call(tgt)
    .replace(/\[object (\w+)\]/, '$1')
    .toLowerCase();
  return type ? dataType === type : dataType;
}
// 1.使用HTML5 的 File API 和 Blob 对象：
function saveFile(content, filename) {
  const blob = new Blob([content], { type: 'text/plain' });
  const anchorElement = document.createElement('a');
  anchorElement.href = window.URL.createObjectURL(blob);
  anchorElement.download = filename;
  anchorElement.click();
}
// 2.使用文件下载链接
function saveFile2(content, filename) {
  const link = document.createElement('a');
  link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(content);
  link.download = filename;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
function groupBy() {
  const arr = [
    { name: 'i', sex: '男', age: 12 },
    { name: 'ie', sex: '男', age: 12 },
    { name: 'iq', sex: '女', age: 12 },
    { name: 'iw', sex: '男', age: 12 },
    { name: 'ie', sex: '女', age: 12 },
    { name: 'ir', sex: '男', age: 12 },
    { name: 'it', sex: '女', age: 12 }
  ];
  //这个时候有一个需求，将性别为要求，性别相同的分到一组，并且以对象的格式显示他们
  //正常情况下我们会创建一个对象，然后遍历数组，在使用判断条件进行分组
  //但是使用Object.groupBy只需要一行代码
  //第二个回调需要返回要分组的属性
  let newObj = Object.groupBy(arr, v => v.sex);
  let map = Map.groupBy(arr, v => (v.sex === '男' ? 'nan' : 'nv'));
  let newObj2 = Object.groupBy(arr, v => (v.sex === '男' ? 'nan' : 'nv'));
  console.log(newObj); //这里打印一下看看
}

// flatMap() 方法对数组中的每个元素应用给定的回调函数，然后将结果展开一级，返回一个新数组。它等价于在调用 map() 方法后再调用深度为 1 的 flat()
