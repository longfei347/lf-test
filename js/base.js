var Class = function () {
  var klass = function () {
    this.init.apply(this, arguments);
  };
  //改变klass的原型
  if (parent) {
    var subclass = function () {};
    subclass.prototype = parent.prototype;
    klass.prototype = new subclass();
  }
  klass.prototype.init = function (a, b) {};
  klass.fn = klass.prototype;
  klass.fn.parent = klass;
  klass._super = klass.__proto__;
  //给类添加属性
  klass.extend = function (obj) {
    var extended = obj.extended;
    for (var i in obj) {
      klass[i] = obj[i];
    }
    if (extended) {
      extended(klass);
    }
  };

  //给实例添加属性
  klass.include = function (obj) {
    var included = obj.included;
    for (var i in obj) {
      klass.fn[i] = obj[i];
    }
    if (included) included(klass);
  };
  //添加一个proxy函数
  klass.proxy = function (func) {
    var self = this;
    return function () {
      return func.apply(self, arguments);
    };
  };
  return klass;
};
var Person = new Class();
Person.include({
  init: function (element) {
    this.element = $(element);
    //代理这个click函数
    this.element.click(this.proxy(this.click));
  },
  click: function () {}
});
//计算倒计时
function countdown(dom, timestr) {
  var a = (b = c = 0);
  var D2016 = new Date(timestr); //2016,0,1
  setInterval(function () {
    var D = new Date(),
      val = Math.round((D2016.getTime() - D.getTime()) / 1000),
      daytimes = val % 86400, //60*60*24
      days = Math.floor(val / 86400),
      hours = Math.floor(daytimes / 3600) % 24,
      minutes = Math.floor(daytimes / 60) % 60,
      seconds = daytimes % 60;
    $(dom).html('还剩' + days + '天, ' + hours + '时, ' + minutes + '分, ' + seconds + '秒');
  }, 1000);
}
/*
//解决IE8兼容可用如下代码
if (!Function.prototype.bind) {
  Function.prototype.bind = function (obj) {
    var slice = [].slice,
    args = slice.call(arguments, 1),
    self = this,
    nop = function() {},
    bound = function() {
      return self.apply(this instanceof nop ? this : (obj || {}),
      args.concat(slice.call(arguments)));
    };
    nop.prototype = self.prototype;
    bound.prototype = new nop;
    return bound;
  };
}*/
var forEach = Function.prototype.call.bind(Array.prototype.forEach);
forEach(document.querySelectorAll('.klasses'), function (el) {
  el.addEventListener('click', someFunction);
});
//在页面中显示文件与图片
function handleFiles(files) {
  if (files.length) {
    var file = files[0];
    var reader = new FileReader();
    if (/text\/\w+/.test(file.type)) {
      reader.onload = function () {
        $('<pre>' + this.result + '</pre>').appendTo('body');
      };
      reader.readAsText(file);
    } else if (/image\/\w+/.test(file.type)) {
      reader.onload = function () {
        $('<img src="' + this.result + '"/>').appendTo('body');
      };
      reader.readAsDataURL(file);
    }
  }
}
//指定范围,产生一个随机数
function selectFrom(lowerValue = 0, upperValue = 1) {
  var choices = upperValue - lowerValue + 1;
  return Math.floor(Math.random() * choices + lowerValue);
}

function getCookie(name) {
  // var search = /\?/.test(url) ? url.split('?')[1] : url;
  var reg = new RegExp('(^|; )' + name + '=([^; ]*)(; |$)');
  return reg.test(search) ? RegExp.$2 : '';
}

/*function getCookie(key) {
  var search = key + "=",
    begin = document.cookie.indexOf(search);
  if (begin != -1) {
    begin += search.length;
    end = document.cookie.indexOf(";", begin);
    if (end == -1) {
      end = document.cookie.length;
    }
    return document.cookie.substring(begin, end);
  }
}*/

(function () {
  var defaultConfig = {
    expires: '1d',
    path: '; path=/'
  };

  var VueCookies = {
    // install of Vue
    install: function (Vue) {
      Vue.prototype.$cookies = this;
      Vue.cookies = this;
    },
    config: function (expireTimes, path) {
      if (expireTimes) {
        defaultConfig.expires = expireTimes;
      }
      if (path === '') {
        defaultConfig.path = '';
      } else {
        defaultConfig.path = '; path=' + path;
      }
    },
    get: function (key) {
      var value =
        decodeURIComponent(
          document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')
        ) || null;

      if (value && value.substring(0, 1) === '{' && value.substring(value.length - 1, value.length === '}')) {
        try {
          value = JSON.parse(value);
        } catch (e) {
          return value;
        }
      }
      return value;
    },
    set: function (key, value, expireTimes, path, domain, secure) {
      if (!key) {
        throw new Error('cookie name is not find in first argument');
      } else if (/^(?:expires|max\-age|path|domain|secure)$/i.test(key)) {
        throw new Error("cookie key name illegality ,Cannot be set to ['expires','max-age','path','domain','secure']\t", 'current key name: ' + key);
      }
      // support json object
      if (value && value.constructor === Object) {
        value = JSON.stringify(value);
      }
      var _expires = '; max-age=86400'; // temp value, default expire time for 1 day
      expireTimes = expireTimes || defaultConfig.expires;
      if (expireTimes) {
        switch (expireTimes.constructor) {
          case Number:
            if (expireTimes === Infinity || expireTimes === -1) _expires = '; expires=Fri, 31 Dec 9999 23:59:59 GMT';
            else _expires = '; max-age=' + expireTimes;
            break;
          case String:
            if (/^(?:\d{1,}(y|m|d|h|min|s))$/i.test(expireTimes)) {
              // get capture number group
              var _expireTime = expireTimes.replace(/^(\d{1,})(?:y|m|d|h|min|s)$/i, '$1');
              // get capture type group , to lower case
              switch (expireTimes.replace(/^(?:\d{1,})(y|m|d|h|min|s)$/i, '$1').toLowerCase()) {
                // Frequency sorting
                case 'm':
                  _expires = '; max-age=' + +_expireTime * 2592000;
                  break; // 60 * 60 * 24 * 30
                case 'd':
                  _expires = '; max-age=' + +_expireTime * 86400;
                  break; // 60 * 60 * 24
                case 'h':
                  _expires = '; max-age=' + +_expireTime * 3600;
                  break; // 60 * 60
                case 'min':
                  _expires = '; max-age=' + +_expireTime * 60;
                  break; // 60
                case 's':
                  _expires = '; max-age=' + _expireTime;
                  break;
                case 'y':
                  _expires = '; max-age=' + +_expireTime * 31104000;
                  break; // 60 * 60 * 24 * 30 * 12
                default:
                  new Error("unknown exception of 'set operation'");
              }
            } else {
              _expires = '; expires=' + expireTimes;
            }
            break;
          case Date:
            _expires = '; expires=' + expireTimes.toUTCString();
            break;
        }
      }
      document.cookie =
        encodeURIComponent(key) +
        '=' +
        encodeURIComponent(value) +
        _expires +
        (domain ? '; domain=' + domain : '') +
        (path ? '; path=' + path : defaultConfig.path) +
        (secure ? '; secure' : '');
      return this;
    },
    remove: function (key, path, domain) {
      if (!key || !this.isKey(key)) {
        return false;
      }
      document.cookie =
        encodeURIComponent(key) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + (domain ? '; domain=' + domain : '') + (path ? '; path=' + path : defaultConfig.path);
      return this;
    },
    isKey: function (key) {
      return new RegExp('(?:^|;\\s*)' + encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=').test(document.cookie);
    },
    keys: function () {
      if (!document.cookie) return [];
      var _keys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:\=[^;]*)?;\s*/);
      for (var _index = 0; _index < _keys.length; _index++) {
        _keys[_index] = decodeURIComponent(_keys[_index]);
      }
      return _keys;
    }
  };

  if (typeof exports == 'object') {
    module.exports = VueCookies;
  } else if (typeof define == 'function' && define.amd) {
    define([], function () {
      return VueCookies;
    });
  } else if (window.Vue) {
    Vue.use(VueCookies);
  }
  // vue-cookies can exist independently,no dependencies library
  if (typeof window !== 'undefined') {
    window.$cookies = VueCookies;
  }
})();
var CookieUtil = {
  get: function (name) {
    var cookieName = encodeURIComponent(name) + '=',
      cookieStart = document.cookie.indexOf(cookieName),
      cookieValue = null,
      cookieEnd;
    if (cookieStart > -1) {
      cookieEnd = document.cookie.indexOf(';', cookieStart);
      if (cookieEnd == -1) {
        cookieEnd = document.cookie.length;
      }
      cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
    }
    return cookieValue;
  },
  set: function (name, value, expires, path, domain, secure) {
    var cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value);
    if (expires instanceof Date) {
      cookieText += '; expires=' + expires.toGMTString();
    }
    if (path) {
      cookieText += '; path=' + path;
    }
    if (domain) {
      cookieText += '; domain=' + domain;
    }
    if (secure) {
      cookieText += '; secure';
    }
    document.cookie = cookieText;
  },
  unset: function (name, path, domain, secure) {
    this.set(name, '', new Date(0), path, domain, secure);
  }
};
var EventUtil = {
  addHandler: function (element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent('on' + type, handler);
    } else {
      element['on' + type] = handler;
    }
  },

  getButton: function (event) {
    if (document.implementation.hasFeature('MouseEvents', '2.0')) {
      return event.button;
    } else {
      switch (event.button) {
        case 0:
        case 1:
        case 3:
        case 5:
        case 7:
          return 0;
        case 2:
        case 6:
          return 2;
        case 4:
          return 1;
      }
    }
  },

  getCharCode: function (event) {
    if (typeof event.charCode == 'number') {
      return event.charCode;
    } else {
      return event.keyCode;
    }
  },

  getClipboardText: function (event) {
    var clipboardData = event.clipboardData || window.clipboardData;
    return clipboardData.getData('text');
  },

  getEvent: function (event) {
    return event ? event : window.event;
  },

  getRelatedTarget: function (event) {
    if (event.relatedTarget) {
      return event.relatedTarget;
    } else if (event.toElement) {
      return event.toElement;
    } else if (event.fromElement) {
      return event.fromElement;
    } else {
      return null;
    }
  },

  getTarget: function (event) {
    return event.target || event.srcElement;
  },

  getWheelDelta: function (event) {
    if (event.wheelDelta) {
      return client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta;
    } else {
      return -event.detail * 40;
    }
  },

  preventDefault: function (event) {
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
  },

  removeHandler: function (element, type, handler) {
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false);
    } else if (element.detachEvent) {
      element.detachEvent('on' + type, handler);
    } else {
      element['on' + type] = null;
    }
  },

  setClipboardText: function (event, value) {
    if (event.clipboardData) {
      event.clipboardData.setData('text/plain', value);
    } else if (window.clipboardData) {
      window.clipboardData.setData('text', value);
    }
  },

  stopPropagation: function (event) {
    if (event.stopPropagation) {
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }
  }
};
!window.$ && (window.$ = {});
$.cookie = function (name, value, options) {
  if (typeof value != 'undefined') {
    // name and value given, set cookie
    options = options || {};
    if (value === null) {
      value = '';
      options.expires = -1;
    }
    var expires = '';
    if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
      var date;
      if (typeof options.expires == 'number') {
        date = new Date();
        date.setTime(date.getTime() + options.expires * 24 * 60 * 60 * 1000);
      } else {
        date = options.expires;
      }
      expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
    }
    var path = options.path ? '; path=' + options.path : '';
    var domain = options.domain ? '; domain=' + options.domain : '';
    var secure = options.secure ? '; secure' : '';
    document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
  } else {
    // only name given, get cookie
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = jQuery.trim(cookies[i]);
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) == name + '=') {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
};

function shuffle(aArr) {
  var iLength = aArr.length,
    i = iLength,
    mTemp,
    iRandom;
  while (i--) {
    if (i !== (iRandom = Math.floor(Math.random() * iLength))) {
      mTemp = aArr[i];
      aArr[i] = aArr[iRandom];
      aArr[iRandom] = mTemp;
    }
  }
  return aArr;
}

function shuffleUseSort(aArr) {
  return aArr.sort(function (a, b) {
    return 0.5 - Math.random();
  });
}
//var isTouch = typeof document.body.ontouchstart != "undefined"; //是否支持触摸
var Regexs = {
  email: /^[0-9a-z][0-9a-z\-\_\.]+@([0-9a-z][0-9a-z\-]*\.)+[a-z]{2,}$/i, //邮箱
  phone: /^0[0-9]{2,3}[2-9][0-9]{6,7}$/, //座机手机号码
  ydphpne: /^((13[4-9])|(15[012789])|147|182|187|188)[0-9]{8}$/, //移动手机号码
  allphpne: /^((13[0-9])|(15[0-9])|(18[0-9]))[0-9]{8}$/, //所有手机号码
  ltphpne: /^((13[0-2])|(15[56])|(186)|(145))[0-9]{8}$/, //联通手机号码
  dxphpne: /^((133)|(153)|(180)|(189))[0-9]{8}$/, //电信手机号码
  url: /^http:\/\/([0-9a-z][0-9a-z\-]*\.)+[a-z]{2,}(:\d+)?\/[0-9a-z%\-_\/\.]+/i, //网址
  num: /[^0-9]/, //数字
  cnum: /[^0-9a-zA-Z_.-]/,
  photo: /\.jpg$|\.jpeg$|\.gif$/i, //图片格式
  row: /\n/gi
};
//身份证验证
function IdentityCodeValid(code) {
  var city = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江 ',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北 ',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏 ',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外 '
  };
  var tip = '';
  var pass = true;

  if (!/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|10|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
    tip = '身份证号格式错误';
    pass = false;
  } else if (!city[code.substr(0, 2)]) {
    tip = '地址编码错误';
    pass = false;
  } else {
    //18位身份证需要验证最后一位校验位
    if (code.length == 18) {
      code = code.split('');
      //∑(ai×Wi)(mod 11)
      //加权因子
      var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      //校验位
      var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
      var sum = 0;
      var ai = 0;
      var wi = 0;
      for (var i = 0; i < 17; i++) {
        ai = code[i];
        wi = factor[i];
        sum += ai * wi;
      }
      var last = parity[sum % 11];
      if (parity[sum % 11] != code[17]) {
        tip = '校验位错误';
        pass = false;
      }
    }
  }
  return pass;
}

function Request(name) {
  return location.search.match(new RegExp(name + '=[^&]*'))[0].split('=')[1];
}

function timeStr(t) {
  if (t < 0) {
    str = '00:00:00';
    return str;
  }
  var s = t % 60;
  var m = parseInt(t / 60) % 60;
  var h = parseInt(t / 3600) % 24;
  var d = parseInt(t / 86400);

  var str = '';
  if (d > 999) {
    return '永久';
  }
  if (d) {
    str += d + '天 ';
  }
  str += ('0' + h).substr(-2, 2) + ':';
  str += ('0' + m).substr(-2, 2) + ':';
  str += ('0' + s).substr(-2, 2);
  return str;
}

//图片上传预览    IE是用了滤镜。
function previewImage(file) {
  var MAXWIDTH = 260;
  var MAXHEIGHT = 180;
  var div = document.getElementById('preview');
  if (file.files && file.files[0]) {
    div.innerHTML = '<img id=imghead>';
    var img = document.getElementById('imghead');
    img.onload = function () {
      var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
      img.width = rect.width;
      img.height = rect.height;
      //                 img.style.marginLeft = rect.left+'px';
      img.style.marginTop = rect.top + 'px';
    };
    var reader = new FileReader();
    reader.onload = function (evt) {
      img.src = evt.target.result;
    };
    reader.readAsDataURL(file.files[0]);
  } //兼容IE
  else {
    var sFilter = 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
    file.select();
    var src = document.selection.createRange().text;
    div.innerHTML = '<img id=imghead>';
    var img = document.getElementById('imghead');
    img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
    var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
    status = 'rect:' + rect.top + ',' + rect.left + ',' + rect.width + ',' + rect.height;
    div.innerHTML = "<div id=divhead style='width:" + rect.width + 'px;height:' + rect.height + 'px;margin-top:' + rect.top + 'px;' + sFilter + src + '"\'></div>';
  }
}

function clacImgZoomParam(maxWidth, maxHeight, width, height) {
  var param = {
    top: 0,
    left: 0,
    width: width,
    height: height
  };
  if (width > maxWidth || height > maxHeight) {
    rateWidth = width / maxWidth;
    rateHeight = height / maxHeight;

    if (rateWidth > rateHeight) {
      param.width = maxWidth;
      param.height = Math.round(height / rateWidth);
    } else {
      param.width = Math.round(width / rateHeight);
      param.height = maxHeight;
    }
  }

  param.left = Math.round((maxWidth - param.width) / 2);
  param.top = Math.round((maxHeight - param.height) / 2);
  return param;
}

function checkVideo() {
  if (!!document.createElement('video').canPlayType) {
    var vidTest = document.createElement('video'),
      oggTest = vidTest.canPlayType('video/ogg; codecs="theora, vorbis"');
    if (!oggTest) {
      let h264Test = vidTest.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
      if (!h264Test) {
        document.getElementById('checkVideoResult').innerHTML = 'Sorry. No video support.';
      } else {
        if (h264Test == 'probably') {
          document.getElementById('checkVideoResult').innerHTML = 'Yes! Full support!';
        } else {
          document.getElementById('checkVideoResult').innerHTML = 'Well. Some support.';
        }
      }
    } else {
      if (oggTest == 'probably') {
        document.getElementById('checkVideoResult').innerHTML = 'Yes! Full support!';
      } else {
        document.getElementById('checkVideoResult').innerHTML = 'Well. Some support.';
      }
    }
  } else {
    document.getElementById('checkVideoResult').innerHTML = 'Sorry. No video support.';
  }
}

// 获取class
function getByClass(oParent, sClass) {
  var aEle = oParent.getElementsByTagName('*');
  var aResult = [];
  for (var i = 0, tt = aEle.length; i < tt; i++) {
    if (aEle[i].className.indexOf(sClass) >= 0) {
      var arr_class = aEle[i].className.split(' ');
      for (var j = 0, len = arr_class.length; j < len; j++) {
        if (arr_class[j] == sClass) {
          aResult.push(aEle[i]);
        }
      }
    }
  }
  return aResult;
}
// 获取样式
function getStyle(obj, name) {
  if (obj.currentStyle) {
    //IE
    return obj.currentStyle[name];
  } else {
    return getComputedStyle(obj, false)[name];
  }
}
// 阻止事件冒泡
function stopBubble(e) {
  if (e && e.stopPropagation) {
    e.stopPropagation();
  } else {
    window.event.cancelBubble = true;
  }
  return false;
}
// 进入全屏
function fullScreen() {
  var el = document.documentElement;
  var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen;
  if (typeof rfs != 'undefined' && rfs) {
    rfs.call(el);
  } else if (typeof window.ActiveXObject != 'undefined') {
    // for Internet Explorer
    var wscript = new ActiveXObject('WScript.Shell');
    if (wscript != null) {
      wscript.SendKeys('{F11}');
    }
  }
}
// 退出全屏
function exitFullScreen() {
  var el = document,
    cfs = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullScreen,
    wscript;
  if (typeof cfs != 'undefined' && cfs) {
    cfs.call(el);
    return;
  }
  if (typeof window.ActiveXObject != 'undefined') {
    wscript = new ActiveXObject('WScript.Shell');
    if (wscript != null) {
      wscript.SendKeys('{F11}');
    }
  }
}

/**
 * [setTime 以指定时间格式eg.2011-1-2, 增加days后的时间格式]
 * @param {[type]} datestr [指定时间]
 * @param {[type]} days    [增加天数]
 */
function setTime(datestr, days = 0) {
  var getDate = new Date(datestr); //"2011,1,02" "2011-1-02" "2011/1/02" "2011 1 02"
  getDate.setDate(getDate.getDate() + days);
  var year = getDate.getFullYear(),
    month = getDate.getMonth();
  day = getDate.getDate();
  return year + '-' + (month > 9 ? '' : '0') + (month + 1) + '-' + (day > 9 ? '' : '0') + day;
}
//IE9下不支持getComputedStyle
if (!window.getComputedStyle) {
  window.getComputedStyle = function (el, pseudo) {
    this.el = el;
    this.getPropertyValue = function (prop) {
      var re = /(\-([a-z]){1})/g;
      if (prop == 'float') prop = 'styleFloat';
      if (re.test(prop)) {
        prop = prop.replace(re, function () {
          return arguments[2].toUpperCase();
        });
      }
      return el.currentStyle[prop] ? el.currentStyle[prop] : null;
    };
    return this;
  };
}
//ES5加入some
if (!Array.prototype.some) {
  Array.prototype.some = function (fun /*, thisArg */) {
    'use strict';
    if (this === void 0 || this === null) throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== 'function') throw new TypeError();

    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++) {
      if (i in t && fun.call(thisArg, t[i], i, t)) return true;
    }

    return false;
  };
}
//ES5加入every
if (!Array.prototype.every) {
  Array.prototype.every = function (fun) {
    'use strict';

    if (this === void 0 || this === null) throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== 'function') throw new TypeError();

    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++) {
      if (i in t && !fun.call(thisArg, t[i], i, t)) return false;
    }

    return true;
  };
}
//ES5加入filter
if (!Array.prototype.filter) {
  Array.prototype.filter = function (fun /*, thisArg */) {
    'use strict';
    if (this === void 0 || this === null) throw new TypeError();
    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== 'function') throw new TypeError();
    var res = [];
    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++) {
      if (i in t) {
        var val = t[i];
        if (fun.call(thisArg, val, i, t)) res.push(val);
      }
    }
    return res;
  };
}
//ES5加入bind
if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5 internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var aArgs = Array.prototype.slice.call(arguments, 1),
      fToBind = this,
      fNOP = function () {},
      fBound = function () {
        return fToBind.apply(this instanceof fNOP && oThis ? this : oThis || window, aArgs.concat(Array.prototype.slice.call(arguments)));
      };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}
//ES5加入indexOf
if (!Array.indexOf) {
  Array.prototype.indexOf = function (obj) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] == obj) {
        return i;
      }
    }
    return -1;
  };
}
//ES5加入forEach
// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.io/#x15.4.4.18
if (!Array.prototype.forEach) {
  Array.prototype.forEach = function (fun /*, thisp*/) {
    var len = this.length;
    if (typeof fun != 'function') throw new TypeError();
    var thisp = arguments[1];
    for (var i = 0; i < len; i++) {
      if (i in this) fun.call(thisp, this[i], i, this);
    }
  };
}
//ES5加入map
// Production steps of ECMA-262, Edition 5, 15.4.4.19
// Reference: http://es5.github.io/#x15.4.4.19
if (!Array.prototype.map) {
  Array.prototype.map = function (callback, thisArg) {
    var T, A, k;
    if (this == null) {
      throw new TypeError(' this is null or not defined');
    }
    var O = Object(this);
    var len = O.length >>> 0;
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }
    if (arguments.length > 1) {
      T = thisArg;
    }
    A = new Array(len);
    k = 0;
    while (k < len) {
      var kValue, mappedValue;

      if (k in O) {
        kValue = O[k];

        mappedValue = callback.call(T, kValue, k, O);
        A[k] = mappedValue;
      }
      k++;
    }
    return A;
  };
}

function getParams(sUrl) {
  var i = 0, //sUrl="stockapp.finance.qq.com/mstats?mod=list&id=bd012070&module=SS&type=pt012070",
    len = sUrl.split('?')[1].split('&'),
    obj = {},
    temp;
  for (; i < len.length; i++) {
    temp = len[i].split('=');
    //console.log(temp[0],temp[1]);
    obj[temp[0]] = temp[1];
  }
  return obj;
}

// 随机从数组中取出一个元素
function arrRandom(arr = []) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// 从指定的范围中取出一个随机数
function rangeRandom(min = 0, max = 100) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 生成一个从0开始到指定数字的序列
function createArr(max = 100) {
  var numbersArray = [];
  for (var i = 1; numbersArray.push(i++) < max; ); // numbers = [1,2,3 ... 100]
  return numbersArray;
}

// 生成一个随机的字母数字序列
function generateRandomAlphaNum(len) {
  var rdmString = '';
  for (; rdmString.length < len; rdmString += Math.random().toString(36).substr(2));
  return rdmString.substr(0, len);
}

// 打乱一个数字数组的顺序
function toUpset(arr = []) {
  return arr.sort(function () {
    return Math.random() - 0.5;
  });
}

// 字符串去空格
if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, '');
  };
}

// 将一个数组追加到另一个数组中
function arrContactArr(arr1 = [], arr2 = []) {
  return Array.prototype.push.apply(array1, array2); // 返回数组个数
}

/*将 argruments转换成数组
var argArray = Array.prototype.slice.call(arguments);*/

// 检验一个参数是否为数字
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

// 检验一个参数是否为数组
function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}

/*function Parent () {
  this.a = 2;
  this.b = [1,2,this.a];
  this.c = {demo: 5};
  this.show = function() {
    console.log(this.a + "" + this.c.demo + ":" + this.b);
    return this.a + ":" + this.c + ":" + this.b;
  }
}
function Child () {
  this.a = 4;
  this.change = function() {
    this.b.push(this.a);
    this.a = this.b.length;
    this.c.demo = this.a++;
    console.log(this.a,this.b,this.c);
  }
}

var parent = new Parent();
Child.prototype = new Parent;
var child1 = new Child();
var child2 = new Child();
child1.a = 10;
child2.a = 11;
child1.change();
child2.change();*/

/*function getRepeatMaxStr(arr) {
  //找字符串中重复最多的字符串与重复次数
  var aa = ["abc","bcd","ddd","dkfj","dkfj","fdk","abc","dkfj","ddf","ddd","abc"];//arr
  var result = {}, max = 2, maxStr;
  aa.sort();
  for (var i = 0;i<aa.length-1;i++) {
    if (aa[i] == aa[i+1]) {
      result[aa[i]] ? result[aa[i]]++ : result[aa[i]] = 2;
    }
  }
  for (i in result) {
    if (result[i] > max) {
      max = result[i];
      maxStr = i;
    }
  }
  return {
    num: max,
    maxStr: maxStr
  }
}*/

// 绑定在了body上，也可以绑定在其他可用元素行，但是不是所有元素都支持copy和past事件。
typeof $ == 'function' &&
  $(document.body).bind({
    copy: function (e) {
      //copy事件
      var cpTxt = '复制的数据';
      var clipboardData = window.clipboardData; //for IE
      if (!clipboardData) {
        // for chrome
        clipboardData = e.originalEvent.clipboardData;
      }
      //e.clipboardData.getData('text');//可以获取用户选中复制的数据
      clipboardData.setData('Text', cpTxt);
      alert(cpTxt);
      $('#message').text('Copy Data : ' + cpTxt);
      return false; //否则设不生效
    },
    paste: function (e) {
      //paste事件
      var eve = e.originalEvent;
      var cp = eve.clipboardData;
      var data = null;
      var clipboardData = window.clipboardData; // IE
      if (!clipboardData) {
        //chrome
        clipboardData = e.originalEvent.clipboardData;
      }
      data = clipboardData.getData('Text');
      $('#message').html(data);
    }
  });
/**
 * 获取字符串中出现次数最多的字符
 * @param  {string} str 查询字符串
 * @return {object}     返回重复的字符与次数
 */
function checkCountMax(str) {
  str = str.split('').sort();
  var i = 1,
    j = str[0],
    s = 1,
    count = 1;
  for (; i < str.length; i++) {
    if (str[i - 1] == str[i]) {
      s++;
      if (s > count) {
        count = s;
        j = str[i];
      }
    } else {
      s = 1;
    }
  }
  return {
    str: j,
    count: count
  };
}

function GetQueryString(name) {
  // location.search.match(/day=([^&]*)(&|$)/)
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  var r = location.search.substr(1).match(reg);
  return r ? unescape(r[2]) : null;
}
var toBase64 = {
  _table: [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '+',
    '/'
  ],

  encode: function (bin) {
    var codes = [];
    var un = 0;
    un = bin.length % 3;
    if (un == 1) bin.push(0, 0);
    else if (un == 2) bin.push(0);
    for (var i = 2; i < bin.length; i += 3) {
      var c = bin[i - 2] << 16;
      c |= bin[i - 1] << 8;
      c |= bin[i];
      codes.push(this._table[(c >> 18) & 0x3f]);
      codes.push(this._table[(c >> 12) & 0x3f]);
      codes.push(this._table[(c >> 6) & 0x3f]);
      codes.push(this._table[c & 0x3f]);
    }
    if (un >= 1) {
      codes[codes.length - 1] = '=';
      bin.pop();
    }
    if (un == 1) {
      codes[codes.length - 2] = '=';
      bin.pop();
    }
    return codes.join('');
  },
  decode: function (base64Str) {
    var i = 0;
    var bin = [];
    var x = 0,
      code = 0,
      eq = 0;
    while (i < base64Str.length) {
      var c = base64Str.charAt(i++);
      var idx = this._table.indexOf(c);
      if (idx == -1) {
        switch (c) {
          case '=':
            idx = 0;
            eq++;
            break;
          case ' ':
          case '\n':
          case '\r':
          case '\t':
            continue;
          default:
            throw {
              message:
                '\u0062\u0061\u0073\u0065\u0036\u0034\u002E\u0074\u0068\u0065\u002D\u0078\u002E\u0063\u006E\u0020\u0045\u0072\u0072\u006F\u0072\u003A\u65E0\u6548\u7F16\u7801\uFF1A' +
                c
            };
        }
      }
      if (eq > 0 && idx != 0)
        throw {
          message:
            '\u0062\u0061\u0073\u0065\u0036\u0034\u002E\u0074\u0068\u0065\u002D\u0078\u002E\u0063\u006E\u0020\u0045\u0072\u0072\u006F\u0072\u003A\u7F16\u7801\u683C\u5F0F\u9519\u8BEF\uFF01'
        };

      code = (code << 6) | idx;
      if (++x != 4) continue;
      bin.push(code >> 16);
      bin.push((code >> 8) & 0xff);
      bin.push(code & 0xff);
      code = x = 0;
    }
    if (code != 0)
      throw {
        message:
          '\u0062\u0061\u0073\u0065\u0036\u0034\u002E\u0074\u0068\u0065\u002D\u0078\u002E\u0063\u006E\u0020\u0045\u0072\u0072\u006F\u0072\u003A\u7F16\u7801\u6570\u636E\u957F\u5EA6\u9519\u8BEF'
      };
    if (eq == 1) bin.pop();
    else if (eq == 2) {
      bin.pop();
      bin.pop();
    } else if (eq > 2)
      throw {
        message:
          '\u0062\u0061\u0073\u0065\u0036\u0034\u002E\u0074\u0068\u0065\u002D\u0078\u002E\u0063\u006E\u0020\u0045\u0072\u0072\u006F\u0072\u003A\u7F16\u7801\u683C\u5F0F\u9519\u8BEF\uFF01'
      };

    return bin;
  }
};
const Base64 = {
  _keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
  encode: function (input) {
    var output = '';
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
    input = Base64._utf8_encode(input);

    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }

      output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
    }
    return output;
  },
  _utf8_encode: function (string) {
    string = string.replace(/\r\n/g, '\n');
    var utftext = '';
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if (c > 127 && c < 2048) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }
    return utftext;
  }
};
function fnRotateScale(dom, angle, scale) {
  if (dom && dom.nodeType === 1) {
    angle = parseFloat(angle) || 0;
    scale = parseFloat(scale) || 1;
    if (!dom.style.Transform) {
      var rad = angle * (Math.PI / 180);
      var m11 = Math.cos(rad) * scale,
        m12 = -1 * Math.sin(rad) * scale,
        m21 = Math.sin(rad) * scale,
        m22 = m11;
      dom.style.filter = 'progid:DXImageTransform.Microsoft.Matrix(M11=' + m11 + ',M12=' + m12 + ',M21=' + m21 + ',M22=' + m22 + ",SizingMethod='auto expand')";
    }
    dom.style.MozTransform = 'rotate(' + angle + 'deg) scale(' + scale + ')';
    dom.style.WebkitTransform = 'rotate(' + angle + 'deg) scale(' + scale + ')';
    dom.style.OTransform = 'rotate(' + angle + 'deg) scale(' + scale + ')';
    dom.style.Transform = 'rotate(' + angle + 'deg) scale(' + scale + ')';
  }
}
/**
 * 矩形区域碰撞检测
 * Created by Administrator on 14-4-7.
 * author: marker
 */
function Rectangle(x, y, _width, _height) {
  this.x = x;
  this.y = y;
  this.width = _width;
  this.height = _height;

  //碰撞检测(参数为此类)
  this.intersects = function (obj) {
    var a_x_w = Math.abs(this.x + this.width / 2 - (obj.x + obj.width / 2));
    var b_w_w = Math.abs((this.width + obj.width) / 2);
    var a_y_h = Math.abs(this.y + this.height / 2 - (obj.y + obj.height / 2));
    var b_h_h = Math.abs((this.height + obj.height) / 2);
    if (a_x_w < b_w_w && a_y_h < b_h_h) return true;
    else return false;
  };
}
/**
 * 圆形区域碰撞检测
 * Created by Administrator on 14-4-7.
 * author: marker
 *
 */
function RadiusRectangle(x, y, radius) {
  this.x = x;
  this.y = y;
  this.radius = radius;

  //碰撞检测(参数为此类)
  this.intersects = function (rr) {
    var maxRadius = rr.radius + this.radius;
    //  已知两条直角边的长度 ，可按公式：c²=a²+b² 计算斜边。
    var a = Math.abs(rr.x - this.x);
    var b = Math.abs(rr.y - this.y);
    var distance = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)); // 计算圆心距离
    if (distance < maxRadius) {
      return true;
    }
    return false;
  };
}

function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  var pivotIndex = Math.floor(arr.length / 2);
  var pivot = arr.splice(pivotIndex, 1)[0];
  var left = [];
  var right = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat([pivot], quickSort(right));
}
// 字符串加法
function stringAdd(num1, num2) {
  let len = Math.max(num1.length, num2.length);
  num1 = num1.padStart(len, 0);
  num2 = num2.padStart(len, 0);
  let flag = 0;
  let result = '';
  let temp = 0;
  for (let i = len - 1; i >= 0; i--) {
    temp = flag + parseInt(num1[i]) + parseInt(num2[i]);
    result = (temp % 10) + result;
    flag = parseInt(temp / 10);
  }
  result = (flag === 1 ? '1' : '') + result;
  return result;
}
// 字符串减法
function stringSub(num1, num2) {
  if (num1 === num2) return '0';
  let isMinus = false;
  if (num1.length < num2.length || (num1.length === num2.length && num1 < num2)) {
    [num1, num2] = [num2, num1];
    isMinus = true;
  }

  let len = Math.max(num1.length, num2.length);
  num1 = num1.padStart(len, 0);
  num2 = num2.padStart(len, 0);

  let flag = 0,
    result = '',
    temp;
  for (let i = len - 1; i >= 0; i--) {
    temp = parseInt(num1[i]) - flag - parseInt(num2[i]);
    if (temp < 0) {
      result = 10 + temp + result;
      flag = 1;
    } else {
      result = temp + result;
      flag = 0;
    }
  }
  result = (isMinus ? '-' : '') + result.replace(/^0+/, ''); //去掉前面多余的0，如"1324"-"1315"
  return result;
}

// 字符串乘法
function stringMul(num1, num2) {
  if (num1 === '0' || num2 === '0') return '0';
  let flag = 0,
    result = '0',
    tempResult = '',
    temp = 0;
  for (let i = num2.length - 1; i >= 0; i--) {
    flag = 0;
    tempResult = '';
    temp = 0;
    for (let j = num1.length - 1; j >= 0; j--) {
      temp = parseInt(num2[i]) * parseInt(num1[j]) + flag;
      tempResult = (temp % 10) + tempResult;
      flag = parseInt(temp / 10);
    }
    tempResult = (flag > 0 ? flag : '') + tempResult;
    result = stringAdd(result, tempResult + '0'.repeat(num2.length - 1 - i));
  }
  return result;
}
// 阶乘
function numFact(num) {
  let result = '1';

  function lte(num1, num2) {
    if (num1.length < num2.length) {
      return true;
    } else if (num1.length === num2.length) {
      return num1 <= num2;
    } else {
      return false;
    }
  }
  for (let i = '1'; lte(i, num); i = stringAdd(i, '1')) {
    result = stringMul(result, i);
  }
  return result;
}
// fetch图片
function fetchImg(url, imgDom) {
  imgDom = imgDom || document.createElement('img');
  fetch(url)
    .then(function (response) {
      return response.blob();
    })
    .then(function (response) {
      var objectURL = URL.createObjectURL(response);
      imgDom.src = objectURL;
    });
}

if ($.fn) {
  $.fn.touchwipe = function (settings) {
    var config = {
      min_move_x: 20,
      min_move_y: 20,
      wipeLeft: function () {},
      wipeRight: function () {},
      wipeUp: function () {},
      wipeDown: function () {},
      preventDefaultEvents: true
    };
    if (settings) {
      $.extend(config, settings);
    }
    this.each(function () {
      var startX;
      var startY;
      var isMoving = false;

      function cancelTouch() {
        this.removeEventListener('touchmove', onTouchMove);
        startX = null;
        isMoving = false;
      }

      function onTouchMove(e) {
        if (config.preventDefaultEvents) {
          e.preventDefault();
        }
        if (isMoving) {
          var x = e.touches[0].pageX;
          var y = e.touches[0].pageY;
          var dx = startX - x;
          var dy = startY - y;
          if (Math.abs(dx) >= config.min_move_x) {
            cancelTouch();
            if (dx > 0) {
              config.wipeLeft(e);
            } else {
              config.wipeRight(e);
            }
          } else if (Math.abs(dy) >= config.min_move_y) {
            cancelTouch();
            if (dy > 0) {
              config.wipeDown(e);
            } else {
              config.wipeUp(e);
            }
          }
        }
      }

      function onTouchStart(e) {
        if (e.touches.length == 1) {
          startX = e.touches[0].pageX;
          startY = e.touches[0].pageY;
          isMoving = true;
          this.addEventListener('touchmove', onTouchMove, false);
        }
      }
      if ('ontouchstart' in document.documentElement) {
        this.addEventListener('touchstart', onTouchStart, false);
      }
    });
    return this;
  };
}

function imgCompressUpload(fileDom, opts) {
  var eleFile = fileDom || document.querySelector('#file');

  // 压缩图片需要的一些元素和对象
  var reader = new FileReader(),
    img = new Image();

  // 选择的文件对象
  var file = null;

  // 缩放图片需要的canvas
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');

  // base64地址图片加载完毕后
  img.onload = function () {
    // 图片原始尺寸
    var originWidth = this.width;
    var originHeight = this.height;
    // 最大尺寸限制,默认400x400的限制
    var maxWidth = opts.width || 400,
      maxHeight = opts.height || 400;
    // 目标尺寸
    var targetWidth = originWidth,
      targetHeight = originHeight;
    if (originWidth > maxWidth || originHeight > maxHeight) {
      if (originWidth / originHeight > maxWidth / maxHeight) {
        // 更宽，按照宽度限定尺寸
        targetWidth = maxWidth;
        targetHeight = Math.round(maxWidth * (originHeight / originWidth));
      } else {
        targetHeight = maxHeight;
        targetWidth = Math.round(maxHeight * (originWidth / originHeight));
      }
    }

    // canvas对图片进行缩放
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    // 清除画布
    context.clearRect(0, 0, targetWidth, targetHeight);
    // 图片压缩
    context.drawImage(img, 0, 0, targetWidth, targetHeight);
    // canvas转为blob并上传
    canvas.toBlob(function (blob) {
      // 图片ajax上传
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.status == 200) {
          // xhr.responseText就是返回的数据
        }
      };
      xhr.open('POST', opts.url, true);
      xhr.send(blob);
    }, file.type || 'image/png');
  };

  // 文件base64化，以便获知图片原始尺寸
  reader.onload = function (e) {
    img.src = e.target.result;
  };
  eleFile.addEventListener('change', function (event) {
    file = event.target.files[0];
    // 选择的文件是图片
    if (file.type.indexOf('image') == 0) {
      reader.readAsDataURL(file);
    }
  });
}
// 生成唯一随机字符串，可以指定长度
function generateRandom(length) {
  let radom13chars = function () {
    return Math.random().toString(16).substring(2, 15);
  };
  let loops = Math.ceil(length / 13);
  return new Array(loops)
    .fill(radom13chars)
    .reduce((string, func) => {
      return string + func();
    }, '')
    .substring(0, length);
}

function debounce2(fn, delay) {
  let timer;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// 防抖 将多次高频操作优化为只在最后一次执行，通常使用的场景是：用户输入，只需再输入完成后做一次输入校验即可
function debounce(func, wait) {
  let timeout;
  return function () {
    let context = this;
    let args = arguments;

    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}
// 节流 每隔一段时间后执行一次，也就是降低频率，将高频操作优化成低频操作，通常使用场景: 滚动条事件 或者 resize 事件，通常每隔 100~500 ms执行一次即可
function throttle(func, wait) {
  let previous = 0;
  return function () {
    let now = Date.now();
    let context = this;
    let args = arguments;
    if (now - previous > wait) {
      func.apply(context, args);
      previous = now;
    }
  };
}
// 结合节流防抖,双剑合璧——加强版节流
function throttle2(fn, delay) {
  let last = 0,
    timer = null;
  return function (...args) {
    let context = this;
    let now = new Date();
    if (now - last < delay) {
      clearTimeout(timer);
      timer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, delay);
    } else {
      // 这个时候表示时间到了，必须给响应
      last = now;
      fn.apply(context, args);
    }
  };
}

//深拷贝

function deepClone(obj, cache = new WeakMap()) {
  if (typeof obj !== 'object') return obj; // 普通类型，直接返回
  if (obj === null) return obj;
  if (cache.get(obj)) return cache.get(obj); // 防止循环引用，程序进入死循环
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);

  // 找到所属原型上的constructor，所属原型上的constructor指向当前对象的构造函数
  let cloneObj = new obj.constructor();
  cache.set(obj, cloneObj); // 缓存拷贝的对象，用于处理循环引用的情况
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = deepClone(obj[key], cache); // 递归拷贝
    }
  }
  return cloneObj;
}

// 测试
// const obj = { name: 'Jack', address: { x: 100, y: 200 } }
// obj.a = obj // 循环引用
// const newObj = deepClone(obj)
// console.log(newObj.address === obj.address) // false

// 创建一个URLSearchParams实例
const urlSearchParams = new URLSearchParams(window.location.search);
// 把键值对列表转换为一个对象
const params = Object.fromEntries(urlSearchParams.entries());

// el.matches(selector)
// 自定义事件代理
function delegate(element, eventType, selector, fn) {
  element.addEventListener(eventType, e => {
    let el = e.target;
    while (!el.matches(selector)) {
      if (element === el) {
        el = null;
        break;
      }
      el = el.parentNode;
    }
    el && fn.call(el, e, el);
  });
  return element;
}

var BrowserInfo = {
  isAndroid: Boolean(navigator.userAgent.match(/android/gi)),
  isIphone: Boolean(navigator.userAgent.match(/iphone|ipod/gi)),
  isIpad: Boolean(navigator.userAgent.match(/ipad/gi)),
  isWeixin: Boolean(navigator.userAgent.match(/MicroMessenger/gi)),
  isAli: Boolean(navigator.userAgent.match(/AlipayClient/gi)),
  isPhone: Boolean(/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent))
};

function JSSDK(appId, appSecret) {
  this.appId = 'wx92f9746118109f92';
  this.appSecrect = appSecret;
}

JSSDK.prototype = {
  getSignPack: function (url, done) {
    const instance = this;
    this.getJsApiTicket(function (err, jsApiTicket) {
      if (err) {
        console.error('获取公众号签名异常：', err);
        return done(err);
      } else {
        console.info('jsApiTicket:', jsApiTicket);
        const timestamp = Math.round(Date.now() / 1000);
        const noncestr = instance.createNonceStr();
        // 生成签名
        const rowString = `jsapi_ticket=${jsApiTicket}&noncestr=${noncestr}&timestamp=${timestamp}&url=${url}`;
        // const hash = crypto.createHash('sha1');
        // const signature = hash.update(rowString).digest('hex');
        const signature = window.hex_sha1(rowString);
        done({
          timestamp,
          url,
          signature,
          // rowString,
          appId: instance.appId,
          nonceStr: noncestr
        });
      }
    });
  },
  //微信卡券
  getJsApiTicket: function (done) {
    const instance = this;
    this.getAccessToken(function (error, accessToken) {
      if (error) {
        console.error('getJsApiTicket.token.error', error);
        return done(error, null);
      }
      const url = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${accessToken}&type=jsapi`;
      request.get(url, function (err, res, body) {
        if (err) {
          console.error('getJsApiTicket.request.error:', err);
          done(err, null);
        }
        console.info('getJsApiTicket.request.body:', body);
        try {
          const data = JSON.parse(body);
          done(null, data.ticket);
        } catch (e) {
          console.error('getJsApiTicket.parse.error:', err, url);
          done(e, null);
        }
      });
    });
  },
  getAccessToken: function (done) {
    // const cacheFile = '.accessToken.json';
    const config = {
      appId: 'wx92f9746118109f92',
      appSecrect: '6de78602d688b89b8884d07852d1af20'
    };
    const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${config.appId}&secret=${config.appSecrect}`;
    request.get(url, function (err, res, body) {
      if (err) {
        console.error('getAccessToken.request.error', err, url);
        done(err, null);
      }
      console.info('getAccessToken', url, '\n出参', body);
      try {
        const data = JSON.parse(body);
        done(null, data.access_token);
      } catch (e) {
        console.error('getAccessToken.parse.error', e, url);
      }
    });
  },
  createNonceStr: function () {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const length = chars.length;
    var str = '';
    for (var i = 0; i < 16; i++) {
      str += chars.substr(Math.round(Math.random() * length), 1);
    }
    return str;
  }
};

// res.render("417", { title: "Express - 417" });
// const jssdk = new JSSDK()
// jssdk.getSignPack('/', function(obj) {
//   console.log(obj)
// })

// 冒泡排序 type= 'descending'降序, 默认升序
function bubble(arr, type) {
  if (!Array.isArray(arr)) {
    return false;
  }
  let i = 0,
    j = 1,
    len = arr.length;
  for (; i < len - 1; i++) {
    for (j = i + 1; j < len; j++) {
      if (type === 'descending') {
        if (arr[i] < arr[j]) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
      } else {
        if (arr[i] > arr[j]) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
      }
    }
  }
  return arr;
}
// 选择排序 type= 'descending'降序, 默认升序
function selectSort(arr, type) {
  let i = 0,
    j = 0,
    len = arr.length;
  for (; j < len; j++) {
    let minIndex = j;
    for (i = j + 1; i < len; i++) {
      if (type === 'descending') {
        if (arr[minIndex] < arr[i]) {
          minIndex = i;
        }
      } else {
        if (arr[minIndex] > arr[i]) {
          minIndex = i;
        }
      }
    }
    if (minIndex !== j) {
      [arr[minIndex], arr[j]] = [arr[j], arr[minIndex]];
    }
  }
  return arr;
}
// 插入排序 type= 'descending'降序, 默认升序
function insertSort(array, type) {
  let i = 0,
    j = 1,
    len = array.length;
  for (; j < len; j++) {
    i = j;
    let target = array[i];
    while (i > 0 && array[i - 1] > target) {
      array[i] = array[i - 1];
      i--;
    }
    array[i] = target;
  }
  return array;
}

// 快速排序 修改原数组
function quickSort(array, start = 0, end = array.length - 1) {
  function partition(array, start, end) {
    let j = start;
    let pivot = array[end];
    for (let i = start; i <= end; i++) {
      if (array[i] <= pivot) {
        if (i !== j) {
          [array[i], array[j]] = [array[j], array[i]];
        }
        j++;
      }
    }
    return j - 1;
  }
  let pivotIndex = partition(array, start, end);
  if (end - start < 1) return array;
  quickSort(array, start, pivotIndex - 1);
  quickSort(array, pivotIndex + 1, end);
  // return array;
}

function fff() {
  let array = [-3, -2, -1, -2, -3, -2, 0, -4];
  let counts = [],
    result = [];
  let min = Math.min(...array);
  for (let v of array) {
    counts[v - min] = (counts[v - min] || 0) + 1;
  }
  for (let i = 0; i < counts.length; i++) {
    let count = counts[i];
    while (count > 0) {
      result.push(i + min);
      count--;
    }
  }
  console.log(result);
}
// 密码验证
function checkPass(str) {
  let flag = 0;
  if (str.length < 10) {
    alert('密码长度不能小于10位');
    return false;
  }
  if (/\d/.test(str)) {
    flag++;
  }
  if (/[a-z]/.test(str)) {
    flag++;
  }
  if (/[A-Z]/.test(str)) {
    flag++;
  }
  if (/[`~!@#$%^&*()_+\-={}|\[\]\\:";'<>?,\./]/.test(str)) {
    flag++;
  }
  if (flag < 3) {
    alert('密码需使用大小写字母、数字、特殊字符中的三种');
    return false;
  }
  return true;
}

function type(obj) {
  let class2type = {};
  'Array Date RegExp Object Error'.split(' ').forEach(e => (class2type['[object ' + e + ']'] = e.toLowerCase()));
  if (obj == null) return String(obj);
  return typeof obj === 'object' ? class2type[Object.prototype.toString.call(obj)] || 'object' : typeof obj;
}
// 实现一个bind
Function.prototype.myBind = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error');
  }
  var _this = this;
  var args = [...arguments].slice(1);
  // 返回一个函数
  return function F() {
    // 因为返回了一个函数，我们可以 new F()，所以需要判断
    if (this instanceof F) {
      return new _this(...args, ...arguments);
    }
    return _this.apply(context, args.concat(...arguments));
  };
};

// 如何实现一个 call 函数
Function.prototype.myCall = function (context) {
  var context = context || window;
  // 给 context 添加一个属性
  // getValue.call(a, 'yck', '24') => a.fn = getValue
  context.fn = this;
  // 将 context 后面的参数取出来
  var args = [...arguments].slice(1);
  // getValue.call(a, 'yck', '24') => a.fn('yck', '24')
  var result = context.fn(...args);
  // 删除 fn
  delete context.fn;
  return result;
};
// 复制代码如何实现一个 apply 函数
Function.prototype.myApply = function (context) {
  var context = context || window;
  context.fn = this;

  var result;
  // 需要判断是否存储第二个参数
  // 如果存在，就将第二个参数展开
  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }

  delete context.fn;
  return result;
};

// 三种状态
const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';
// promise 接收一个函数参数，该函数会立即执行
function MyPromise(fn) {
  let _this = this;
  _this.currentState = PENDING;
  _this.value = undefined;
  // 用于保存 then 中的回调，只有当 promise
  // 状态为 pending 时才会缓存，并且每个实例至多缓存一个
  _this.resolvedCallbacks = [];
  _this.rejectedCallbacks = [];

  _this.resolve = function (value) {
    if (value instanceof MyPromise) {
      // 如果 value 是个 Promise，递归执行
      return value.then(_this.resolve, _this.reject);
    }
    setTimeout(() => {
      // 异步执行，保证执行顺序
      if (_this.currentState === PENDING) {
        _this.currentState = RESOLVED;
        _this.value = value;
        _this.resolvedCallbacks.forEach(cb => cb());
      }
    });
  };

  _this.reject = function (reason) {
    setTimeout(() => {
      // 异步执行，保证执行顺序
      if (_this.currentState === PENDING) {
        _this.currentState = REJECTED;
        _this.value = reason;
        _this.rejectedCallbacks.forEach(cb => cb());
      }
    });
  };
  // 用于解决以下问题
  // new Promise(() => throw Error('error))
  try {
    fn(_this.resolve, _this.reject);
  } catch (e) {
    _this.reject(e);
  }
}

MyPromise.prototype.then = function (onResolved, onRejected) {
  var self = this;
  // 规范 2.2.7，then 必须返回一个新的 promise
  var promise2;
  // 规范 2.2.onResolved 和 onRejected 都为可选参数
  // 如果类型不是函数需要忽略，同时也实现了透传
  // Promise.resolve(4).then().then((value) => console.log(value))
  onResolved = typeof onResolved === 'function' ? onResolved : v => v;
  onRejected = typeof onRejected === 'function' ? onRejected : r => r;

  if (self.currentState === RESOLVED) {
    return (promise2 = new MyPromise(function (resolve, reject) {
      // 规范 2.2.4，保证 onFulfilled，onRjected 异步执行
      // 所以用了 setTimeout 包裹下
      setTimeout(function () {
        try {
          var x = onResolved(self.value);
          resolutionProcedure(promise2, x, resolve, reject);
        } catch (reason) {
          reject(reason);
        }
      });
    }));
  }

  if (self.currentState === REJECTED) {
    return (promise2 = new MyPromise(function (resolve, reject) {
      setTimeout(function () {
        // 异步执行onRejected
        try {
          var x = onRejected(self.value);
          resolutionProcedure(promise2, x, resolve, reject);
        } catch (reason) {
          reject(reason);
        }
      });
    }));
  }

  if (self.currentState === PENDING) {
    return (promise2 = new MyPromise(function (resolve, reject) {
      self.resolvedCallbacks.push(function () {
        // 考虑到可能会有报错，所以使用 try/catch 包裹
        try {
          var x = onResolved(self.value);
          resolutionProcedure(promise2, x, resolve, reject);
        } catch (r) {
          reject(r);
        }
      });

      self.rejectedCallbacks.push(function () {
        try {
          var x = onRejected(self.value);
          resolutionProcedure(promise2, x, resolve, reject);
        } catch (r) {
          reject(r);
        }
      });
    }));
  }
};
// 规范 2.3
function resolutionProcedure(promise2, x, resolve, reject) {
  // 规范 2.3.1，x 不能和 promise2 相同，避免循环引用
  if (promise2 === x) {
    return reject(new TypeError('Error'));
  }
  // 规范 2.3.2
  // 如果 x 为 Promise，状态为 pending 需要继续等待否则执行
  if (x instanceof MyPromise) {
    if (x.currentState === PENDING) {
      x.then(function (value) {
        // 再次调用该函数是为了确认 x resolve 的
        // 参数是什么类型，如果是基本类型就再次 resolve
        // 把值传给下个 then
        resolutionProcedure(promise2, value, resolve, reject);
      }, reject);
    } else {
      x.then(resolve, reject);
    }
    return;
  }
  // 规范 2.3.3.3.3
  // reject 或者 resolve 其中一个执行过得话，忽略其他的
  let called = false;
  // 规范 2.3.3，判断 x 是否为对象或者函数
  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    // 规范 2.3.3.2，如果不能取出 then，就 reject
    try {
      // 规范 2.3.3.1
      let then = x.then;
      // 如果 then 是函数，调用 x.then
      if (typeof then === 'function') {
        // 规范 2.3.3.3
        then.call(
          x,
          y => {
            if (called) return;
            called = true;
            // 规范 2.3.3.3.1
            resolutionProcedure(promise2, y, resolve, reject);
          },
          e => {
            if (called) return;
            called = true;
            reject(e);
          }
        );
      } else {
        // 规范 2.3.3.4
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    // 规范 2.3.4，x 为基本类型
    resolve(x);
  }
}
// 实现instanceof
function myInstanceof(left, right) {
  // 获得类型的原型
  let prototype = right.prototype;
  // 获得对象的原型
  left = left.__proto__;
  // 判断对象的类型是否等于类型的原型
  while (true) {
    if (left === null) return false;
    if (prototype === left) return true;
    left = left.__proto__;
  }
}
window.onerror = function (message, source, lineno, colno, error) {
  console.log('捕获到异常：', { message, source, lineno, colno, error });
  return true;
};

const curry = (fn, ...args) => (args.length < fn.length ? (...arguments) => curry(fn, ...args, ...arguments) : fn(...args));
// 判断字符串是否有重复的字符
function containsRepeatingLetter(str) {
  /*var a= (str||'').split('');
  var index = a.findIndex(itm=> {
    return a.indexOf(itm) !== a.lastIndexOf(itm)
  })
  console.log({"index:": index, 'value:': a[index]})
  return index > -1 ? true: false*/
  let len = str.length,
    i = 0;
  for (; i < len; i++) {
    if (str.substr(i + 1).indexOf(str.charAt(i)) > -1) {
      return true;
    }
  }
  return false;
}
/*Array.prototype.reduce  = function(callbackfn, initialValue) {
  // 异常处理，和 map 一样
  // 处理数组类型异常
  if (this === null || this === undefined) {
    throw new TypeError("Cannot read property 'reduce' of null or undefined");
  }
  // 处理回调类型异常
  if (Object.prototype.toString.call(callbackfn) != "[object Function]") {
    throw new TypeError(callbackfn + ' is not a function')
  }
  let O = Object(this);
  let len = O.length >>> 0;
  let k = 0;
  let accumulator = initialValue;
  if (accumulator === undefined) {
    for(; k < len ; k++) {
      // 查找原型链, in 表示在原型链查找
      // 如果用 hasOwnProperty 是有问题的，它只能找私有属性
      if (k in O) {
        accumulator = O[k];
        k++;
        break;
      }
    }
  }
  // 表示数组全为空
  if(k === len && accumulator === undefined)
    throw new Error('Each element of the array is empty');
  for(;k < len; k++) {
    if (k in O) {
      // 注意，核心！
      accumulator = callbackfn.call(undefined, accumulator, O[k], k, O);
    }
  }
  return accumulator;
}*/
/*function Promise(excutor) {
  var self = this
  self.onResolvedCallback = []
  function resolve(value) {
    setTimeout(() => {
      self.data = value
      self.onResolvedCallback.forEach(callback => callback(value))
    })
  }
  excutor(resolve.bind(self))
}
Promise.prototype.then = function(onResolved) {
  var self = this
  return new Promise(resolve => {
    self.onResolvedCallback.push(function() {
      var result = onResolved(self.data)
      if (result instanceof Promise) {
        result.then(resolve)
      } else {
        resolve(result)
      }
    })
  })
}


function Promise(exec) {
  this.onResolvedCbs = [];
  exec(value => {
    setTimeout(() => {
      this.data = value;
      this.onResolvedCbs.forEach(item => item(value));
    });
  });
}

Promise.prototype.then = function(onResolved) {
  return new Promise(resolve => {
    this.onResolvedCbs.push(() => {
      const result = onResolved(this.data);
      result instanceof Promise ? result.then(resolve) : resolve(result);
    });
  });
};
*/
// 数组扁平化
// 方法1, arr..flat(Infinity)
// 方法2, JSON.stringify(arr).replace(/(\[|\])/g, '').split(',')
// 方法3  JSON.parse('[' + JSON.stringify(arr).replace(/(\[|\])/g, '') + ']');
// 方法4 递归, 可自定义普通递归或用reduce
/* function flatten(arr) {
    return arr.reduce((pre, cur) => {
        return pre.concat(Array.isArray(cur) ? flatten(cur) : cur);
    }, []);
}*/
// 方法5 扩展符
// while (ary.some(Array.isArray)) { ary = [].concat(...ary); }

// 重写generator函数,实现async await
function asyncToGenerator(generatorFunc) {
  // 返回的是一个新的函数
  return function () {
    // 先调用generator函数 生成迭代器
    // 对应 var gen = testG()
    const gen = generatorFunc.apply(this, arguments);

    // 返回一个promise 因为外部是用.then的方式 或者await的方式去使用这个函数的返回值的
    // var test = asyncToGenerator(testG)
    // test().then(res => console.log(res))
    return new Promise((resolve, reject) => {
      // 内部定义一个step函数 用来一步一步的跨过yield的阻碍
      // key有next和throw两种取值，分别对应了gen的next和throw方法
      // arg参数则是用来把promise resolve出来的值交给下一个yield
      function step(key, arg) {
        let generatorResult;

        // 这个方法需要包裹在try catch中
        // 如果报错了 就把promise给reject掉 外部通过.catch可以获取到错误
        try {
          generatorResult = gen[key](arg);
        } catch (error) {
          return reject(error);
        }

        // gen.next() 得到的结果是一个 { value, done } 的结构
        const { value, done } = generatorResult;

        if (done) {
          // 如果已经完成了 就直接resolve这个promise
          // 这个done是在最后一次调用next后才会为true
          // 以本文的例子来说 此时的结果是 { done: true, value: 'success' }
          // 这个value也就是generator函数最后的返回值
          return resolve(value);
        } else {
          // 除了最后结束的时候外，每次调用gen.next()
          // 其实是返回 { value: Promise, done: false } 的结构，
          // 这里要注意的是Promise.resolve可以接受一个promise为参数
          // 并且这个promise参数被resolve的时候，这个then才会被调用
          return Promise.resolve(
            // 这个value对应的是yield后面的promise
            value
          ).then(
            // value这个promise被resove的时候，就会执行next
            // 并且只要done不是true的时候 就会递归的往下解开promise
            // 对应gen.next().value.then(value => {
            //    gen.next(value).value.then(value2 => {
            //       gen.next()
            //
            //      // 此时done为true了 整个promise被resolve了
            //      // 最外部的test().then(res => console.log(res))的then就开始执行了
            //    })
            // })
            function onResolve(val) {
              step('next', val);
            },
            // 如果promise被reject了 就再次进入step函数
            // 不同的是，这次的try catch中调用的是gen.throw(err)
            // 那么自然就被catch到 然后把promise给reject掉啦
            function onReject(err) {
              step('throw', err);
            }
          );
        }
      }
      step('next');
    });
  };
}
function checkMail(mail) {
  let reg = /^[0-9a-z][0-9a-z\-\_\.]+@([0-9a-z][0-9a-z\-]*\.)+[a-z]{2,}$/i;
  if (typeof str === 'string') {
    if (str.includes(';')) {
      // let mail='aaa@123.com;bbb@123.com;ccc@123.com'
      return mail.split(';').every(s => reg.test(s));
    } else {
      return reg.test(mail);
    }
  } else if (Array.isArray(mail)) {
    return mail.every(s => reg.test(s));
  }
}
// url参数序列化
function stringifyUrl(search = {}) {
  return Object.entries(search)
    .reduce((t, v) => `${t}${v[0]}=${encodeURIComponent(v[1])}&`, Object.keys(search).length ? '?' : '')
    .replace(/&$/, '');
}
// url参数反序列化
function parseUrlSearch() {
  const search = '?age=25&name=TYJ';
  return search
    .replace(/(^\?)|(&$)/g, '')
    .split('&')
    .reduce((t, v) => {
      const [key, val] = v.split('=');
      t[key] = decodeURIComponent(val);
      return t;
    }, {});
}
// 判断数据类型 undefined、null、string、number、boolean、array、object、symbol、date、regexp、function、asyncfunction、arguments、set、map、weakset、weakmap
function dataTypeJudge(val, type) {
  const dataType = Object.prototype.toString
    .call(val)
    .replace(/\[object (\w+)\]/, '$1')
    .toLowerCase();
  return type ? dataType === type : dataType;
}
// 获取window自定义变量
(function () {
  var iframe = document.createElement('iframe');
  iframe.onload = function () {
    window.glb = {};
    var iframeKeys = iframe.contentWindow;
    Object.keys(window).forEach(function (key) {
      if (!(key in iframeKeys)) {
        glb[key] = window[key];
      }
    });
    iframe.remove();
  };
  iframe.src = 'about:blank';
  document.body.appendChild(iframe);
})();

// String Number Array Function Object Null & undefined Boolean RegExp Error Date Symbol
// Returns if a value is an object
function isObject(value) {
  return value && typeof value === 'object' && value.constructor === Object;
}
// Returns if a value is an array
function isArray(value) {
  // ES5 actually has a method for this (ie9+)
  if (Array.isArray) {
    return Array.isArray(value);
  }
  // "Array" == Object.prototype.toString.call(result).slice(8, -1)
  return value && typeof value === 'object' && value.constructor === Array;
}

function isPrime(num) {
  if (num <= 3) {
    return num > 1;
  }
  // 不在6的倍数两侧的一定不是质数
  if (num % 6 != 1 && num % 6 != 5) {
    return false;
  }
  let sqrt = Math.sqrt(num);
  for (let i = 5; i <= sqrt; i += 6) {
    if (num % i == 0 || num % (i + 2) == 0) {
      return false;
    }
  }
  return true;
}

// 通过src获取图片的blob对象
function getImageBlob(url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open('get', url, true);
  xhr.responseType = 'blob';
  let reader = new FileReader();
  reader.addEventListener('loadend', function () {
    console.log(reader.result);
  });
  xhr.onload = function () {
    if (this.status == 200) {
      let blob = this.response;
      // 读取来看下下载的内容
      reader.readAsDataURL(blob);
      // 最终生成的字符串
      // data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAA...
      // 生成下载用的URL对象
      let url = URL.createObjectURL(blob);
      // 生成一个a标签，并模拟点击，即可下载，批量下载同理
      let aDom = document.createElement('a');
      aDom.href = url;
      aDom.download = 'download.png';
      aDom.text = '下载文件';
      document.getElementsByTagName('body')[0].appendChild(aDom);
      aDom.click();
    }
  };
  xhr.send();
}
// getImageBlob('https://cdn.segmentfault.com/v-5c4ec07f/global/img/user-64.png')
function channel(obj, cloneObj) {
  var channel = new MessageChannel();
  let ifr = document.createElement('iframe');
  ifr.src = '#'; // about:blank
  document.body.appendChild(ifr);
  var otherWindow = ifr.contentWindow;
  ifr.addEventListener(
    'load',
    function iframeLoaded() {
      // console.log('postmessage', channel)
      // otherWindow.postMessage('Hello from the main page!', '*', [channel.port2]); // 有问题
      // otherWindow.parent.channel.port2.postMessage('Hello from the main page!', '*', [channel.port2]); // 有问题
      // Failed to execute 'postMessage' on 'MessagePort': No function was found that matched the signature provided.
      channel.port2.postMessage(obj);
    },
    false
  );
  channel.port1.onmessage = function handleMessage(e) {
    console.log('onmessage: ', e.data);
    cloneObj = obj; // 对象深拷贝,有问题,不能含函数, 只能函数内用
  };
}

const pipe =
  (...fs) =>
  p =>
    fs.reduce((v, f) => f(v), p);

function toRawType(value) {
  var _toString = Object.prototype.toString;
  return _toString.call(value).slice(8, -1);
}
/*
console.log('string:', toRawType(''))
console.log('number:', toRawType(1))
console.log('bool:', toRawType(true))
console.log('null:', toRawType(null))
console.log('symbol:', toRawType(Symbol()))
console.log('undefined:', toRawType(undefined))
console.log('function:', toRawType(function(){}))
console.log('obj:', toRawType({}))
console.log('array:', toRawType([]))
console.log('set:', toRawType(new Set()))
console.log('weakset:', toRawType(new WeakSet()))
console.log('map:', toRawType(new Map()))
console.log('weakMap:', toRawType(new WeakMap()))*/

// 将数组n等分
function sliceArray(arr = [], n) {
  // 方法1
  let te = []; //tmp.reduce((a,b)=>a.splice())
  for (let i = 0; i < arr.length; i += n) {
    te.push(tmp.slice(i, i + n));
  }
  console.log(te);
  // 方法2 改变原数组
  let aa1 = arr || [1, 3, 4, 5, 6, 7],
    aa2 = [];
  while (aa1.length) {
    aa2.push(aa1.splice(0, 2));
  }
  return aa2;
}

var copyFunc = function (val) {
  var oInput = document.querySelector('#tempCopy') || document.createElement('input');
  oInput.value = val;
  document.body.appendChild(oInput);
  oInput.select();
  document.execCommand('Copy');
  oInput.id = 'tempCopy';
  oInput.style.display = 'none';
  console.log('复制成功:', val);
};

function escapeHtml(e) {
  if ('undefined' == typeof e) return '';
  if (!e || 'string' != typeof e) return e;
  var t = e.replace(/\\x(\w{2})/g, function (e, t) {
    return String.fromCharCode(parseInt(t, 16));
  });
  return (
    (t = t.replace(/&/g, '&amp;')),
    (t = t.replace(/\"/g, '&quot;')),
    (t = t.replace(/'/g, '&apos;')),
    (t = t.replace(/</g, '&lt;')),
    (t = t.replace(/>/g, '&gt;')),
    (t = t.replace(/\\t/g, '&nbsp;&nbsp;')),
    (t = t.replace(/\\r\\n/g, '<br/>')),
    t
  );
}

// 使用 __proto__
/*var obj = {};
var descriptor = Object.create(null); // 没有继承的属性
// 默认没有 enumerable，没有 configurable，没有 writable
descriptor.value = 'static';
Object.defineProperty(obj, 'key', descriptor);

// 显式
Object.defineProperty(obj, "key", {
  enumerable: false,
  configurable: false,
  writable: false,
  value: "static"
});*/
// 匹配非中英文字符
// str.match(/[^\x00-\xff\u4e00-\u9fa5。；，：“”（）、？《》！]+/g)

async function sleep(t) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, t || 1000);
  });
}

const reducedFilter = (data, keys, fn) =>
  data.filter(fn).map(el =>
    keys.reduce((acc, key) => {
      acc[key] = el[key];
      return acc;
    }, {})
  );

const maxDate = dates => {
  console.log('data:', dates);
  return new Date(Math.max.apply(null, dates));
};

/**
 * 获取n个随机数
 * @public
 * @param {number} n 个数
 * @return {Uint16Array}
 */
function getRandomValues(n) {
  const arr = new Uint16Array(n);

  window.crypto.getRandomValues(arr);

  return arr;
}

/**
 * 获取随机数
 * @public
 * @return {number}
 */
function getRandomValue() {
  return getRandomValues(1)[0];
}
// 获取中国区日期 时间
function getDateTime() {
  return new Date(Date.now() + 1000 * 60 * 60 * 8).toJSON().split('.')[0].replace('T', ' ');
}

function getDateTimeFormat(argument) {
  // body...
}
// 优先队列
class MinHeap {
  constructor() {
    this.heap = [];
  }
  swap(i1, i2) {
    const temp = this.heap[i1];
    this.heap[i1] = this.heap[i2];
    this.heap[i2] = temp;
  }
  getParentIndex(i) {
    return (i - 1) >> 1;
  }
  getLeftIndex(i) {
    return i * 2 + 1;
  }
  getRightIndex(i) {
    return i * 2 + 2;
  }
  shiftUp(index) {
    if (index == 0) {
      return;
    }
    const parentIndex = this.getParentIndex(index);
    if (this.heap[parentIndex] > this.heap[index]) {
      this.swap(parentIndex, index);
      this.shiftUp(parentIndex);
    }
  }
  shiftDown(index) {
    const leftIndex = this.getLeftIndex(index);
    const rightIndex = this.getRightIndex(index);
    if (this.heap[leftIndex] < this.heap[index]) {
      this.swap(leftIndex, index);
      this.shiftDown(leftIndex);
    }
    if (this.heap[rightIndex] < this.heap[index]) {
      this.swap(rightIndex, index);
      this.shiftDown(rightIndex);
    }
  }
  insert(value) {
    this.heap.push(value);
    this.shiftUp(this.heap.length - 1);
  }
  pop() {
    this.heap[0] = this.heap.pop();
    this.shiftDown(0);
  }
  peek() {
    return this.heap[0];
  }
  size() {
    return this.heap.length;
  }
}
// ​
// const h = new MinHeap();
// h.insert(3);
// h.insert(2);
// h.insert(1);
// h.pop(); // 1

Array.prototype.binarySearch = function (item) {
  let low = 0;
  let high = this.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const element = this[mid];
    if (element < item) {
      low = mid + 1;
    } else if (element > item) {
      high = mid - 1;
    } else {
      return mid;
    }
  }
  return -1;
};

// getNetworksOfRepOffice // app/api/cs_nc_customer_info/customer_info_customer_network_portal

var coinChange = function (coins, amount) {
  let dp = new Array(amount + 1);
  // 数组大小为 amount + 1，初始值也为 amount + 1
  dp.fill(amount + 1);

  // base case
  dp[0] = 0;
  // 外层 for 循环在遍历所有状态的所有取值
  for (let i = 0; i < dp.length; i++) {
    // 内层 for 循环在求所有选择的最小值
    for (let coin of coins) {
      // 子问题无解，跳过
      if (i - coin < 0) {
        continue;
      }
      dp[i] = Math.min(dp[i], 1 + dp[i - coin]);
    }
  }
  return dp[amount] == amount + 1 ? -1 : dp[amount];
};
// 获取参数对象
function getParams(str) {
  // new URL(location.href).searchParams.get('wd')
  let arr = str.split('?')[1].split('&');
  return arr.reduce((a, b) => ((a[b.split('=')[0]] = b.split('=')[1]), a), {});
}

function getParam(name, str) {
  return (str || location.search).match(new RegExp(name + '=[^&]*'))[0].split('=')[1];
}
/*
 * 参数说明：
 * number：要格式化的数字
 * decimals：保留几位小数
 * thousands_sep：千分位符号, true|false
 * */
function number_format(number, decimals, thousands_sep) {
  if (!number) {
    return '0.00';
  }
  let num = parseFloat(number),
    str = '' + num;
  if (decimals && decimals > 0) {
    str = num.toFixed(decimals);
    num = +str;
  }
  if (thousands_sep) {
    str = num.toLocaleString();
  }
  return str;
}

/* // ⏹ 1. 使用正则表达式
const reg = /(\d)(?=(\d{3})+$)/g;
// ❗❗❗使用String()把数字转换为字符串的优点在于null等情况不会报错
console.log(String(123456789).replace(reg, "$1,"));  // 123,456,789
// 支持整数,不支持小数
console.log(String(123456789.1315454).replace(reg, "$1,"));  // 123456789.1,315,454
console.log(String(1000).replace(reg, "$1,"));  // 1,000
console.log(String(null).replace(reg, "$1,"));  // null
console.log(String(undefined).replace(reg, "$1,"));  // undefined
console.log(String(NaN).replace(reg, "$1,"));  // NaN
console.log('😁😁😁😁😁😁');

// ⏹ 2. 使用toLocaleString()方法
// ❗❗❗必须是数字,如果是null或者undefined的话,会报错
console.log((123456789).toLocaleString('en-US'));  // 123,456,789
// 最多保留三位小数
console.log((123456789.1315454).toLocaleString('en-US'));  // 123,456,789.132
console.log('😁😁😁😁😁😁');

// ⏹ 3. 使用new Intl.NumberFormat()方法
console.log(new Intl.NumberFormat('en-US', {}).format(123456789.1315454));  // 123,456,789.132
console.log(new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(123456789.1315454));  // ￥123,456,789 */

// 加密
const encode = username => {
  // 每个字符转为二进制,用空格分隔
  const textToBinary = username =>
    username
      .split('')
      // charCodeAt 将字符转成相应的 Unicode 码值
      .map(char => char.charCodeAt(0).toString(2))
      .join(' ');
  const binaryToZeroWidth = binary =>
    binary
      .split('')
      .map(binaryNum => {
        const num = parseInt(binaryNum, 10);
        if (num === 1) {
          return '\u200b'; // \u200b 零宽度字符（zero-width space）
        } else if (num === 0) {
          return '\u200c'; // \u200c 零宽度断字符（zero-width non-joiner）
        }
        return '\u200d'; // \u200d 零宽度连字符 (zero-width joiner)
      })
      .join('\ufeff'); // \ufeff 零宽度非断空格符 (zero width no-break space)
  const binaryUsername = textToBinary(username);
  const zeroWidthUsername = binaryToZeroWidth(binaryUsername);
  return zeroWidthUsername;
};

// 解密
const decode = string => {
  const zeroWidthToBinary = string =>
    string
      .split('\ufeff')
      .map(char => {
        // \ufeff 零宽度非断空格符 (zero width no-break space)
        if (char === '\u200b') {
          // \u200b 零宽度字符（zero-width space）
          return '1';
        } else if (char === '\u200c') {
          // \u200c 零宽度断字符（zero-width non-joiner）
          return '0';
        }
        return ' ';
      })
      .join('');
  // fromCharCode 二进制转化
  return zeroWidthToBinary(string)
    .split(' ')
    .map(num => String.fromCharCode(parseInt(num, 2)))
    .join('');
};
let morse = () => {
  // a-z
  const morseWords = [
    '.-',
    '-...',
    '-.-.',
    '-..',
    '.',
    '..-.',
    '--.',
    '....',
    '..',
    '.---',
    '-.-',
    '.-..',
    '--',
    '-.',
    '---',
    '.--.',
    '--.-',
    '.-.',
    '...',
    '-',
    '..-',
    '...-',
    '.--',
    '-..-',
    '-.--',
    '--..'
  ];
  // 0-9
  const morseNumber = ['-----', '.----', '..---', '...--', '....-', '.....', '-....', '--...', '---..', '----.'];
  let wordsToMorse = {};
  let morseToWords = {};
  let morseToNum = {};

  //a-z数组
  let words = [];
  for (let i = 10; i < 36; i++) {
    let j = i.toString(36);
    words.push(j);
  }

  //数字加密字典
  let numToMorse = morseNumber;

  //数字解密字典
  for (let i in morseNumber) {
    morseToNum[morseNumber[i]] = i;
  }

  //字母加密字典
  for (let i in words) {
    wordsToMorse[words[i]] = morseWords[i];
  }
  //字母解密字典
  for (let i in wordsToMorse) {
    morseToWords[wordsToMorse[i]] = i;
  }
  //合并解密字典
  let decodeWords = Object.assign(morseToWords, morseToNum);
  // 只能加密a-z0-9
  let encode = str => {
    if (typeof str != 'string') {
      return;
    }
    let res = [];
    let l = '&#8205;';
    let s = '&#8204;';
    let q = '&#8203;';
    for (let i in str) {
      let val = str[i];
      if (!!parseInt(val) || parseInt(val) == 0) {
        res.push(numToMorse[str[i]]);
      } else {
        res.push(wordsToMorse[str[i]]);
      }
    }
    let encrypt = res.join('/');
    encrypt = encrypt.replace(/\//g, q);
    encrypt = encrypt.replace(/\./g, s);
    encrypt = encrypt.replace(/\-/g, l);
    return encrypt;
  };
  let decode = text => {
    if (typeof text != 'string') {
      return;
    }
    let decode = [];
    //匹配文本中的零宽字符，并转换为摩斯码
    text.match(/(\&\#8203\;|\&\#8204\;|\&\#8205\;|\u200B|\u200C|\u200D|\&zwnj\;|\&zwj\;)+/g).map(temp => {
      temp = temp.replace(/\&\#8203\;|\u200B/g, '/');
      temp = temp.replace(/\&\#8204\;|\u200C|\&zwnj\;/g, '.');
      temp = temp.replace(/\&\#8205\;|\u200D|\&zwj\;/g, '-');
      let arr = temp.split('/');

      //调用解密字典转码
      for (let i in arr) {
        decode.push(decodeWords[arr[i]]);
      }
    });
    return decode.join('');
  };
  return { wordsToMorse, morseToWords, morseToNum, numToMorse, decodeWords, encode, decode };
};
// var time=new Date().toLocaleString('chinese',{hour12:false}) 不一定等于 new Date().toLocaleString() // '2022/9/19 10:44:03'
// var time=new Date().toLocaleString('chinese',{hour12:true}) // '2022/9/19 上午10:44:35'

// let curDate = new Date().toLocaleString('chinese',{hour12:false}).replace(/\/\d+/g, a => (a.length < 3 ? `-0${a.substring(1)}` : `-${a.substring(1)}`))
// let curDate = new Date(Date.now() + 8 * 3600000).toJSON().substring(0, 19).replace('T', ' ')
window._jsonp = (url, params) => {
  if (params) {
  }
  url += '?';
  for (let k in params) {
    url += k + '=' + params[k] + '&';
  }
  // 2 拼接 callback
  const callbackName = 'itcast_' + (new Date() - 0);
  url += 'callback=' + callbackName;
  // 3 动态创建script标签
  const script = document.createElement('script');
  script.src = url;
  document.head.appendChild(script);
  return new Promise((resolve, reject) => {
    window[callbackName] = function (data) {
      resolve(data);
      delete window[callbackName];
      document.head.removeChild(script);
    };
  });
};
!window.axios && (window.axios = {});
axios.jsonp = url => {
  if (!url) {
    console.error('Axios.JSONP 至少需要一个url参数!');
    return;
  }
  return new Promise((resolve, reject) => {
    window.jsonCallBack = result => {
      resolve(result);
    };
    var JSONP = document.createElement('script');
    JSONP.type = 'text/javascript';
    JSONP.src = `${url}&callback=jsonCallBack`;
    document.getElementsByTagName('head')[0].appendChild(JSONP);
    setTimeout(() => {
      document.getElementsByTagName('head')[0].removeChild(JSONP);
    }, 500);
  });
};
function exportExcel(str = `姓名,电话,邮箱\n`, jsonData) {
  // 列标题，逗号隔开，每一个逗号就是隔开一个单元格
  // let str = `姓名,电话,邮箱\n`;
  // 增加\t为了不让表格显示科学计数法或者其他格式
  /* for (let i = 0; i < jsonData.length; i++) {
    for (const key in jsonData[i]) {
      str += `${jsonData[i][key]},`;
    }
    str += '\n';
  } */
  str += jsonData.map(itm => Object.values(itm).join(',')).join('\n');
  // encodeURIComponent解决中文乱码
  const uri = 'data:text/csv;charset=gb2312,\ufeff' + encodeURIComponent(str);
  // const uri = 'data:application/msword;charset=utf-8,\ufeff' + encodeURIComponent(str);
  // 通过创建a标签实现
  const link = document.createElement('a');
  link.href = uri;
  // 对下载的文件命名
  link.download = 'data.csv';
  // link.download = 'data.doc';
  link.click();
}
function saveXls(opt = {}) {
  opt.jsonData = opt.jsonData || [
    {
      name: '路人甲',
      phone: '123456789',
      email: '000@123456.com'
    },
    {
      name: '炮灰乙',
      phone: '123456789',
      email: '000@123456.com'
    },
    {
      name: '土匪丙',
      phone: '123456789',
      email: '000@123456.com'
    },
    {
      name: '流氓丁',
      phone: '123456789',
      email: '000@123456.com'
    }
  ];
  opt.str = opt.str || `姓名,电话,邮箱\n`;
  exportExcel(opt.str, opt.jsonData);
}
// 读取csv文件到json
function csvToJson(filePath) {
  let result = [];
  function csvJSON(csv) {
    var lines = csv.split('\n');
    var result = [];
    var headers = lines[0].split(',');
    for (var i = 1; i < lines.length; i++) {
      var obj = {};
      var currentline = lines[i].split(',');
      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }
      result.push(obj);
    }
    return result;
  }
  var xhr = new XMLHttpRequest();
  xhr.open('GET', filePath, false);
  xhr.onload = function (e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        result = csvJSON(xhr.responseText);
      } else {
        console.error(xhr.statusText);
      }
    }
  };
  xhr.send(null);
  return result;
}
// csv文件乱码
/* fetch('static/data/list.csv', {})
  .then(res => {
    console.log('object res', res);
    return res.blob();
  })
  .then(blob => {
    const reader2 = new FileReader();
    reader2.readAsArrayBuffer(blob);
    reader2.onload = e => {
      console.log('result ======', iconv.decode(Buffer.from(e.target.result, 'hex'), 'gbk'));
    };
  }); */
let exportExcel2 = excelHtml => {
  // 生成blob对象
  let excelBlob = new Blob([excelHtml], { type: 'application/vnd.ms-excel' });
  // 创建一个a标签
  let oA = document.createElement('a');
  // 利用URL.createObjectURL()方法为a元素生成blob URL
  oA.href = URL.createObjectURL(excelBlob);
  // 给文件命名
  oA.download = `${new Date().toLocaleString()}_提现数据表.xlsx`;
  // 模拟点击
  oA.click();
};

// 生成树1
function listToTree() {
  let array = [];
  cityList.forEach(item => {
    // 遍历对象数组
    item.children = cityList.filter(info => info.parentId === item.id); // 找到每个对象的子节点
    if (item.parentId === 0) {
      array.push(item); // 将一层节点放入新数组中
    }
  });
  return array; //循环结束，返回结果
}
// 生成树2
function recursionGenerateTree(pid, arr) {
  let array = [];
  arr.forEach(item => {
    if (item.parentId === pid) {
      item.children = recursionGenerateTree(item.id, arr); // 接收子节点
      array.push(item);
    }
  });
  return array; // 返回查找到的节点
}
// console.log(recursionGenerateTree(0, cityList))
// 深度遍历
const deepEach = data => {
  let stack = [...data],
    node;

  while ((node = stack.shift())) {
    console.log(node.id);
    // 如果有子元素的话进行压栈操作
    if (node.children) stack.unshift(...node.children);
  }
};

// 广度遍历
const widthEach = data => {
  let node,
    list = [...data];

  while ((node = list.shift())) {
    console.log(node.id);
    // 如果有子元素就放入队列
    node.children && list.push(...node.children);
  }
};

/* element.insertAdjacentHTML(position, text);
<!-- beforebegin -->
<p>
  <!-- afterbegin -->
  foo
  <!-- beforeend -->
</p>
<!-- afterend --> */
// 并不会动态请求脚本??
// document.head.insertAdjacentHTML('beforeend', '<script src="https://unpkg.com/jquery"></script>')
// 将chrome表单数据转对象
function getFormData(s) {
  if (s.includes(': \n')) {
    s = s.replace(/: \n/g, '=').replace(/\n/g, '&');
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
}
const uuid = () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const txt = 'txt';
  ctx.fillText(txt, 10, 10);
  console.log(canvas.toDataURL());
};
