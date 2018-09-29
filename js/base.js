/*
//mootools.js 核心,从Prototype.js中汲取了许多有益的设计理念，语法也和其极其类似

var Class = {
	create: function() {
		return function() {
			this.initialize.apply(this, arguments); //相当于return 谁调用我我就是谁的属性.initialize(arguments)
		}
	}
}
var Person = Class.create(); //这里得到的是Person的initialize调用, 所以是Person.initialize(arguments)  相当于构造函数persion(name){this.name=name}
Person.prototype = {
	initialize: function(name) {
		this.name = name;
	},
	getname: function(prefix) {
		return prefix + this.name;
	}
};*/

var Class = function() {
	var klass = function() {
		// console.log(this);
		this.init.apply(this, arguments);
	};
	//改变klass的原型
	if (parent) {
		var subclass = function() {};
		subclass.prototype = parent.prototype;
		klass.prototype = new subclass;
	};
	klass.prototype.init = function(a, b) {};
	klass.fn = klass.prototype;
	klass.fn.parent = klass;
	klass._super = klass.__proto__;
	//给类添加属性
	klass.extend = function(obj) {
		var extended = obj.extended;
		for (var i in obj) {
			klass[i] = obj[i];
		}
		if (extended) {
			extended(klass);
		}
	};

	//给实例添加属性
	klass.include = function(obj) {
		var included = obj.included;
		for (var i in obj) {
			klass.fn[i] = obj[i];
		}
		if (included)
			included(klass);
	}
	//添加一个proxy函数
	klass.proxy = function(func) {
		var self = this;
		document.createElement("ul")
		return (function() {
			return func.apply(self, arguments);
		});
	}
	return klass;
}
var Person = new Class;
//Person.prototype.init = function(a) {};
//var person = new Person;
Person.include({
	init: function(element) {
		this.element = $(element);
		//代理这个click函数
		this.element.click(this.proxy(this.click));
	},
	click: function() {}
})
//计算倒计时
function countdown(dom, timestr) {
	var a = b = c = 0;
	var D2016 = new Date(timestr); //2016,0,1
	setInterval(function() {
		var D = new Date(),
			val = Math.round((D2016.getTime() - D.getTime()) / 1000),
			daytimes = val % (86400), //60*60*24
			days = Math.floor(val / 86400),
			hours = Math.floor(daytimes / 3600) % 24,
			minutes = Math.floor(daytimes / 60) % 60,
			seconds = daytimes % 60;
		$(dom).html("还剩" + days + "天, " + hours + "时, " + minutes + "分, " + seconds + "秒")
	}, 1000);
};
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
forEach(document.querySelectorAll('.klasses'), function(el) {
	el.addEventListener('click', someFunction);
});
//在页面中显示文件与图片
function handleFiles(files) {
	if (files.length) {
		var file = files[0];
		var reader = new FileReader();
		if (/text\/\w+/.test(file.type)) {
			reader.onload = function() {
				$('<pre>' + this.result + '</pre>').appendTo('body');
			}
			reader.readAsText(file);
		} else if (/image\/\w+/.test(file.type)) {
			reader.onload = function() {
				$('<img src="' + this.result + '"/>').appendTo('body');
			}
			reader.readAsDataURL(file);
		}
	}
}
//指定范围,产生一个随机数
function selectFrom(lowerValue, upperValue) {
	var choices = upperValue - lowerValue + 1;
	return Math.floor(Math.random() * choices + lowerValue);
}

function getCookie(name) {
	// var search = /\?/.test(url) ? url.split('?')[1] : url;
	var reg = new RegExp("(^|; )" + name + "=([^; ]*)(; |$)");
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
var CookieUtil = {
	get: function(name) {
		var cookieName = encodeURIComponent(name) + "=",
			cookieStart = document.cookie.indexOf(cookieName),
			cookieValue = null,
			cookieEnd;
		if (cookieStart > -1) {
			cookieEnd = document.cookie.indexOf(";", cookieStart);
			if (cookieEnd == -1) {
				cookieEnd = document.cookie.length;
			}
			cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
		}
		return cookieValue;
	},
	set: function(name, value, expires, path, domain, secure) {
		var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
		if (expires instanceof Date) {
			cookieText += "; expires=" + expires.toGMTString();
		}
		if (path) {
			cookieText += "; path=" + path;
		}
		if (domain) {
			cookieText += "; domain=" + domain;
		}
		if (secure) {
			cookieText += "; secure";
		}
		document.cookie = cookieText;
	},
	unset: function(name, path, domain, secure) {
		this.set(name, "", new Date(0), path, domain, secure);
	}
};
var EventUtil = {
	addHandler: function(element, type, handler) {
		if (element.addEventListener) {
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent) {
			element.attachEvent("on" + type, handler);
		} else {
			element["on" + type] = handler;
		}
	},

	getButton: function(event) {
		if (document.implementation.hasFeature("MouseEvents", "2.0")) {
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

	getCharCode: function(event) {
		if (typeof event.charCode == "number") {
			return event.charCode;
		} else {
			return event.keyCode;
		}
	},

	getClipboardText: function(event) {
		var clipboardData = (event.clipboardData || window.clipboardData);
		return clipboardData.getData("text");
	},

	getEvent: function(event) {
		return event ? event : window.event;
	},

	getRelatedTarget: function(event) {
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

	getTarget: function(event) {
		return event.target || event.srcElement;
	},

	getWheelDelta: function(event) {
		if (event.wheelDelta) {
			return (client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta);
		} else {
			return -event.detail * 40;
		}
	},

	preventDefault: function(event) {
		if (event.preventDefault) {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
	},

	removeHandler: function(element, type, handler) {
		if (element.removeEventListener) {
			element.removeEventListener(type, handler, false);
		} else if (element.detachEvent) {
			element.detachEvent("on" + type, handler);
		} else {
			element["on" + type] = null;
		}
	},

	setClipboardText: function(event, value) {
		if (event.clipboardData) {
			event.clipboardData.setData("text/plain", value);
		} else if (window.clipboardData) {
			window.clipboardData.setData("text", value);
		}
	},

	stopPropagation: function(event) {
		if (event.stopPropagation) {
			event.stopPropagation();
		} else {
			event.cancelBubble = true;
		}
	}

};
!window.$ && (window.$ = {})
$.cookie = function(name, value, options) {
	if (typeof value != 'undefined') { // name and value given, set cookie
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
				date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
			} else {
				date = options.expires;
			}
			expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
		}
		var path = options.path ? '; path=' + options.path : '';
		var domain = options.domain ? '; domain=' + options.domain : '';
		var secure = options.secure ? '; secure' : '';
		document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
	} else { // only name given, get cookie
		var cookieValue = null;
		if (document.cookie && document.cookie != '') {
			var cookies = document.cookie.split(';');
			for (var i = 0; i < cookies.length; i++) {
				var cookie = jQuery.trim(cookies[i]);
				// Does this cookie string begin with the name we want?
				if (cookie.substring(0, name.length + 1) == (name + '=')) {
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
	return aArr.sort(function(a, b) {
		return (0.5 - Math.random());
	});
}
//var isTouch = typeof document.body.ontouchstart != "undefined"; //是否支持触摸
var Regexs = {
	email: (/^[0-9a-z][0-9a-z\-\_\.]+@([0-9a-z][0-9a-z\-]*\.)+[a-z]{2,}$/i), //邮箱
	phone: (/^0[0-9]{2,3}[2-9][0-9]{6,7}$/), //座机手机号码
	ydphpne: (/^((13[4-9])|(15[012789])|147|182|187|188)[0-9]{8}$/), //移动手机号码
	allphpne: (/^((13[0-9])|(15[0-9])|(18[0-9]))[0-9]{8}$/), //所有手机号码
	ltphpne: (/^((13[0-2])|(15[56])|(186)|(145))[0-9]{8}$/), //联通手机号码
	dxphpne: (/^((133)|(153)|(180)|(189))[0-9]{8}$/), //电信手机号码
	url: (/^http:\/\/([0-9a-z][0-9a-z\-]*\.)+[a-z]{2,}(:\d+)?\/[0-9a-z%\-_\/\.]+/i), //网址
	num: (/[^0-9]/), //数字
	cnum: (/[^0-9a-zA-Z_.-]/),
	photo: (/\.jpg$|\.jpeg$|\.gif$/i), //图片格式
	row: (/\n/ig)
};
//身份证验证
function IdentityCodeValid(code) {
	var city = {
		11: "北京",
		12: "天津",
		13: "河北",
		14: "山西",
		15: "内蒙古",
		21: "辽宁",
		22: "吉林",
		23: "黑龙江 ",
		31: "上海",
		32: "江苏",
		33: "浙江",
		34: "安徽",
		35: "福建",
		36: "江西",
		37: "山东",
		41: "河南",
		42: "湖北 ",
		43: "湖南",
		44: "广东",
		45: "广西",
		46: "海南",
		50: "重庆",
		51: "四川",
		52: "贵州",
		53: "云南",
		54: "西藏 ",
		61: "陕西",
		62: "甘肃",
		63: "青海",
		64: "宁夏",
		65: "新疆",
		71: "台湾",
		81: "香港",
		82: "澳门",
		91: "国外 "
	};
	var tip = "";
	var pass = true;

	if (!/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|10|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
		tip = "身份证号格式错误";
		pass = false;
	} else if (!city[code.substr(0, 2)]) {
		tip = "地址编码错误";
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
				tip = "校验位错误";
				pass = false;
			}
		}
	}
	return pass;
}
//判断手机平板等移动端适配跳转URL
if (/AppleWebKit.*mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))) {
	if (window.location.href.indexOf("?mobile") < 0) {
		try {
			if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
				window.location.href = "手机页";
			} else if (/iPad/i.test(navigator.userAgent)) {
				window.location.href = "平板页";
			} else {
				window.location.href = "其他移动端页"
			}
		} catch (e) {}
	}
}

function Request(name) {
	return location.search.match(new RegExp(name + "=[^&]*"))[0].split("=")[1];
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
	str += ("0" + h).substr(-2, 2) + ':';
	str += ("0" + m).substr(-2, 2) + ':';
	str += ("0" + s).substr(-2, 2);
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
		img.onload = function() {
			var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
			img.width = rect.width;
			img.height = rect.height;
			//                 img.style.marginLeft = rect.left+'px';
			img.style.marginTop = rect.top + 'px';
		}
		var reader = new FileReader();
		reader.onload = function(evt) {
			img.src = evt.target.result;
		}
		reader.readAsDataURL(file.files[0]);
	} else //兼容IE
	{
		var sFilter = 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
		file.select();
		var src = document.selection.createRange().text;
		div.innerHTML = '<img id=imghead>';
		var img = document.getElementById('imghead');
		img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
		var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
		status = ('rect:' + rect.top + ',' + rect.left + ',' + rect.width + ',' + rect.height);
		div.innerHTML = "<div id=divhead style='width:" + rect.width + "px;height:" + rect.height + "px;margin-top:" + rect.top + "px;" + sFilter + src + "\"'></div>";
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
		var vidTest = document.createElement("video"),
			oggTest = vidTest.canPlayType('video/ogg; codecs="theora, vorbis"');
		if (!oggTest) {
			let h264Test = vidTest.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
			if (!h264Test) {
				document.getElementById("checkVideoResult").innerHTML = "Sorry. No video support."
			} else {
				if (h264Test == "probably") {
					document.getElementById("checkVideoResult").innerHTML = "Yes! Full support!";
				} else {
					document.getElementById("checkVideoResult").innerHTML = "Well. Some support.";
				}
			}
		} else {
			if (oggTest == "probably") {
				document.getElementById("checkVideoResult").innerHTML = "Yes! Full support!";
			} else {
				document.getElementById("checkVideoResult").innerHTML = "Well. Some support.";
			}
		}
	} else {
		document.getElementById("checkVideoResult").innerHTML = "Sorry. No video support."
	}
}

//线性表类
function List() {
	var dataArray = [];
	this.getDataArray = function() {
		return dataArray;
	}
	this.setDataArray = function(array) {
		dataArray = array;
	}
}
List.prototype = {
	constructor: List,
	destroy: function() {
		this.setDataArray(null);
	},
	clear: function() {
		this.setDataArray(new Array());
	},
	empty: function() {
		var arr = this.getDataArray();
		if (arr && arr.length == 0) {
			return true;
		}
		return false;
	},
	size: function() {
		return this.getDataArray().length;
	},
	get: function(index) {
		return this.getDataArray()[index];
	},
	add: function(element) {
		for (var i = 0; i <= this.size(); i++) {
			if (!this.get(i)) {
				this.getDataArray()[i] = element;
				break;
			}
		}
	},
	remove: function(index) {
		for (var i = index + 1; i < this.size(); i++) {
			this.getDataArray()[i - 1] = this.getDataArray()[i];
		}
		//数组大小减1
		this.getDataArray().length = this.size() - 1;
	}, //遍历方法
	traverse: function(visit) {
		for (var i = 0; i < this.size(); i++) {
			visit(this.getDataArray()[i]);
		}
	}, //排序规则函数
	sort: function(rule) {
		for (var i = 0; i < this.size(); i++) {
			if (isNaN(this.getDataArray()[i])) {
				throw new Error("Exception:sort方法操作的集合必须为纯数字;");
			}
		}
		for (var i = 0, flag = true; i < this.size() && flag; i++) {
			flag = false;
			for (var j = 0; j < this.size() - i - 1; j++) {
				var compareResult = this.getDataArray()[j] > this.getDataArray()[j + 1];
				var ruleResult = rule(2, 1) > 0;
				if (ruleResult) {
					if (compareResult) {
						var temp = this.getDataArray()[j];
						this.getDataArray()[j] = this.getDataArray()[j + 1];
						this.getDataArray()[j + 1] = temp;
						flag = true;
					}
				} else {
					if (!compareResult) {
						var temp = this.getDataArray()[j];
						this.getDataArray()[j] = this.getDataArray()[j + 1];
						this.getDataArray()[j + 1] = temp;
						flag = true;
					}
				}
			}
		}
	}
}

// 获取class
function getByClass(oParent, sClass) {
	var aEle = oParent.getElementsByTagName("*");
	var aResult = [];
	for (var i = 0, tt = aEle.length; i < tt; i++) {
		if (aEle[i].className.indexOf(sClass) >= 0) {
			var arr_class = aEle[i].className.split(" ");
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
	if (obj.currentStyle) { //IE
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
	if (typeof rfs != "undefined" && rfs) {
		rfs.call(el);
	} else if (typeof window.ActiveXObject != "undefined") {
		// for Internet Explorer
		var wscript = new ActiveXObject("WScript.Shell");
		if (wscript != null) {
			wscript.SendKeys("{F11}");
		}
	}
}
// 退出全屏
function exitFullScreen() {
	var el = document,
		cfs = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullScreen,
		wscript;
	if (typeof cfs != "undefined" && cfs) {
		cfs.call(el);
		return;
	}
	if (typeof window.ActiveXObject != "undefined") {
		wscript = new ActiveXObject("WScript.Shell");
		if (wscript != null) {
			wscript.SendKeys("{F11}");
		}
	}
}
//IE9下不支持getComputedStyle
if (!window.getComputedStyle) {
	window.getComputedStyle = function(el, pseudo) {
		this.el = el;
		this.getPropertyValue = function(prop) {
			var re = /(\-([a-z]){1})/g;
			if (prop == 'float')
				prop = 'styleFloat';
			if (re.test(prop)) {
				prop = prop.replace(re, function() {
					return arguments[2].toUpperCase();
				});
			}
			return el.currentStyle[prop] ? el.currentStyle[prop] : null;
		}
		return this;
	}
}
//ES5加入some
if (!Array.prototype.some) {
	Array.prototype.some = function(fun /*, thisArg */ ) {
		'use strict';
		if (this === void 0 || this === null)
			throw new TypeError();

		var t = Object(this);
		var len = t.length >>> 0;
		if (typeof fun !== 'function')
			throw new TypeError();

		var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
		for (var i = 0; i < len; i++) {
			if (i in t && fun.call(thisArg, t[i], i, t))
				return true;
		}

		return false;
	};
}
//ES5加入every
if (!Array.prototype.every) {
	Array.prototype.every = function(fun) {
		'use strict';

		if (this === void 0 || this === null)
			throw new TypeError();

		var t = Object(this);
		var len = t.length >>> 0;
		if (typeof fun !== 'function')
			throw new TypeError();

		var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
		for (var i = 0; i < len; i++) {
			if (i in t && !fun.call(thisArg, t[i], i, t))
				return false;
		}

		return true;
	};
}
//ES5加入filter
if (!Array.prototype.filter) {
	Array.prototype.filter = function(fun /*, thisArg */ ) {
		"use strict";
		if (this === void 0 || this === null)
			throw new TypeError();
		var t = Object(this);
		var len = t.length >>> 0;
		if (typeof fun !== "function")
			throw new TypeError();
		var res = [];
		var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
		for (var i = 0; i < len; i++) {
			if (i in t) {
				var val = t[i];
				if (fun.call(thisArg, val, i, t))
					res.push(val);
			}
		}
		return res;
	};
}
//ES5加入bind
if (!Function.prototype.bind) {
	Function.prototype.bind = function(oThis) {
		if (typeof this !== "function") {
			// closest thing possible to the ECMAScript 5 internal IsCallable function
			throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
		}

		var aArgs = Array.prototype.slice.call(arguments, 1),
			fToBind = this,
			fNOP = function() {},
			fBound = function() {
				return fToBind.apply(this instanceof fNOP && oThis ?
					this :
					oThis || window,
					aArgs.concat(Array.prototype.slice.call(arguments)));
			};

		fNOP.prototype = this.prototype;
		fBound.prototype = new fNOP();

		return fBound;
	};
}
//ES5加入indexOf
if (!Array.indexOf) {
	Array.prototype.indexOf = function(obj) {
		for (var i = 0; i < this.length; i++) {
			if (this[i] == obj) {
				return i;
			}
		}
		return -1;
	}
}
//ES5加入forEach
// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.io/#x15.4.4.18
if (!Array.prototype.forEach) {
	Array.prototype.forEach = function(fun /*, thisp*/ ) {
		var len = this.length;
		if (typeof fun != "function")
			throw new TypeError();
		var thisp = arguments[1];
		for (var i = 0; i < len; i++) {
			if (i in this)
				fun.call(thisp, this[i], i, this);
		}
	};
}
//ES5加入map
// Production steps of ECMA-262, Edition 5, 15.4.4.19
// Reference: http://es5.github.io/#x15.4.4.19
if (!Array.prototype.map) {
	Array.prototype.map = function(callback, thisArg) {
		var T,
			A,
			k;
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
			var kValue,
				mappedValue;

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
		len = sUrl.split("?")[1].split("&"),
		obj = {},
		temp;
	for (; i < len.length; i++) {
		temp = len[i].split("=");
		//console.log(temp[0],temp[1]);
		obj[temp[0]] = temp[1];
	}
	return obj;
}

/*! AnchorJS - v0.1.0 - 2014-08-17 | https://github.com/bryanbraun/anchorjs | Copyright (c) 2014 Bryan Braun; Licensed MIT */
function addAnchors(e) {
	e = e || "h1, h2, h3, h4, h5, h6";
	var t = document.querySelectorAll(e);
	for (var n = 0; n < t.length; n++) {
		var r;
		if (t[n].hasAttribute("id")) {
			r = t[n].getAttribute("id")
		} else {
			var i = document.body.textContent ? "textContent" : "innerText";
			var s = t[n][i],
				tidyText = s.replace(/\s+/g, "-").toLowerCase();
			t[n].setAttribute("id", tidyText);
			r = tidyText
		}
		var o = '<a class="anchor-link" href="#' + r + '"><span class="icon-link"></span></a>';
		t[n].innerHTML = t[n].innerHTML + o
	}
}

//随机从数组中取出一个元素
// var items = [12, 548 , 'a' , 2 , 5478 , 'foo' , 8852, , 'Doe' , 2145 , 119];
// var randomItem = items[Math.floor(Math.random() * items.length)];

// 从一个指定的范围中取出一个随机数  这个功能在生成测试用的假数据时特别有用。比如取一个指定范围内的工资数。
// var x = Math.floor(Math.random() * (max - min + 1)) + min;

/*生成一个从0开始到指定数字的序列
var numbersArray = [] , max = 100;
for( var i=1; numbersArray.push(i++) < max;);  // numbers = [1,2,3 ... 100]*/

/*生成一个随机的字母数字序列*/
function generateRandomAlphaNum(len) {
	var rdmString = "";
	for (; rdmString.length < len; rdmString += Math.random().toString(36).substr(2));
	return rdmString.substr(0, len);
}

/*打乱一个数字数组的顺序
var numbers = [5, 458 , 120 , -215 , 228 , 400 , 122205, -85411];
numbers = numbers.sort(function(){ return Math.random() - 0.5});*/

/*字符串去空格
String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, "");
};*/

/*将一个数组追加到另一个数组中
var array1 = [12 , "foo" , {name "Joe"} , -2458];
var array2 = ["Doe" , 555 , 100];
Array.prototype.push.apply(array1, array2);*/

/*将 argruments转换成数组
var argArray = Array.prototype.slice.call(arguments);*/

/*  检验一个参数是否为数字
function isNumber(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
}*/

/*检验一个参数是否为数组
function isArray(obj){
    return Object.prototype.toString.call(obj) === '[object Array]' ;
}*/

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
var getParams = function(url) {
	url = url || 'http://qq.com/s?a=b#rd'; // 做一层保护，保证URL是合法的
	var query = url.split('?')[1].split('#')[0].split('&'),
		params = {};
	for (var i = 0; i < query.length; i++) {
		var arg = query[i].split('=');
		params[arg[0]] = arg[1];
	}
	if (params['pass_ticket']) {
		params['pass_ticket'] = encodeURIComponent(params['pass_ticket'].html(false).html(false).replace(/\s/g, "+"));
	}
	return params;
};

//绑定在了body上，也可以绑定在其他可用元素行，但是不是所有元素都支持copy和past事件。
typeof $ == 'function' && $(document.body).bind({
	copy: function(e) { //copy事件
		var cpTxt = "复制的数据";
		var clipboardData = window.clipboardData; //for IE
		if (!clipboardData) { // for chrome
			clipboardData = e.originalEvent.clipboardData;
		}
		//e.clipboardData.getData('text');//可以获取用户选中复制的数据
		clipboardData.setData('Text', cpTxt);
		alert(cpTxt);
		$('#message').text('Copy Data : ' + cpTxt);
		return false; //否则设不生效
	},
	paste: function(e) { //paste事件
		var eve = e.originalEvent
		var cp = eve.clipboardData;
		var data = null;
		var clipboardData = window.clipboardData; // IE
		if (!clipboardData) { //chrome
			clipboardData = e.originalEvent.clipboardData
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
	str = str.split("").sort();
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
	}
}

function GetQueryString(name) {
	// location.search.match(/day=([^&]*)(&|$)/)
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = location.search.substr(1).match(reg);
	return r ? unescape(r[2]) : null;
}
var Base64 = {
	_table: [
		'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
		'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
		'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
		'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/'
	],

	encode: function(bin) {
		var codes = [];
		var un = 0;
		un = bin.length % 3;
		if (un == 1)
			bin.push(0, 0);
		else if (un == 2)
			bin.push(0);
		for (var i = 2; i < bin.length; i += 3) {
			var c = bin[i - 2] << 16;
			c |= bin[i - 1] << 8;
			c |= bin[i];
			codes.push(this._table[c >> 18 & 0x3f]);
			codes.push(this._table[c >> 12 & 0x3f]);
			codes.push(this._table[c >> 6 & 0x3f]);
			codes.push(this._table[c & 0x3f]);
		}
		if (un >= 1) {
			codes[codes.length - 1] = "=";
			bin.pop();
		}
		if (un == 1) {
			codes[codes.length - 2] = "=";
			bin.pop();
		}
		return codes.join("");
	},
	decode: function(base64Str) {
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
					case "\r":
					case '\t':
						continue;
					default:
						throw {
							"message": "\u0062\u0061\u0073\u0065\u0036\u0034\u002E\u0074\u0068\u0065\u002D\u0078\u002E\u0063\u006E\u0020\u0045\u0072\u0072\u006F\u0072\u003A\u65E0\u6548\u7F16\u7801\uFF1A" + c
						};
				}
			}
			if (eq > 0 && idx != 0)
				throw {
					"message": "\u0062\u0061\u0073\u0065\u0036\u0034\u002E\u0074\u0068\u0065\u002D\u0078\u002E\u0063\u006E\u0020\u0045\u0072\u0072\u006F\u0072\u003A\u7F16\u7801\u683C\u5F0F\u9519\u8BEF\uFF01"
				};

			code = code << 6 | idx;
			if (++x != 4)
				continue;
			bin.push(code >> 16);
			bin.push(code >> 8 & 0xff);
			bin.push(code & 0xff)
			code = x = 0;
		}
		if (code != 0)
			throw {
				"message": "\u0062\u0061\u0073\u0065\u0036\u0034\u002E\u0074\u0068\u0065\u002D\u0078\u002E\u0063\u006E\u0020\u0045\u0072\u0072\u006F\u0072\u003A\u7F16\u7801\u6570\u636E\u957F\u5EA6\u9519\u8BEF"
			};
		if (eq == 1)
			bin.pop();
		else if (eq == 2) {
			bin.pop();
			bin.pop();
		} else if (eq > 2)
			throw {
				"message": "\u0062\u0061\u0073\u0065\u0036\u0034\u002E\u0074\u0068\u0065\u002D\u0078\u002E\u0063\u006E\u0020\u0045\u0072\u0072\u006F\u0072\u003A\u7F16\u7801\u683C\u5F0F\u9519\u8BEF\uFF01"
			};

		return bin;
	}
};

function uaredirect(f) {
	try {
		if (document.getElementById("bdmark") != null) {
			return
		}
		var b = false;
		if (arguments[1]) {
			var e = window.location.host;
			var a = window.location.href;
			if (isSubdomain(arguments[1], e) == 1) {
				f = f + "/#m/" + a;
				b = true
			} else {
				if (isSubdomain(arguments[1], e) == 2) {
					f = f + "/#m/" + a;
					b = true
				} else {
					f = a;
					b = false
				}
			}
		} else {
			b = true
		}
		if (b) {
			var c = window.location.hash;
			if (!c.match("fromapp")) {
				if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i))) {
					location.replace(f)
				}
			}
		}
	} catch (d) {}

}

function isSubdomain(c, d) {
	this.getdomain = function(f) {
		var e = f.indexOf("://");
		if (e > 0) {
			var h = f.substr(e + 3)
		} else {
			var h = f
		}
		var g = /^www\./;
		if (g.test(h)) {
			h = h.substr(4)
		}
		return h
	};
	if (c == d) {
		return 1
	} else {
		var c = this.getdomain(c);
		var b = this.getdomain(d);
		if (c == b) {
			return 1
		} else {
			c = c.replace(".", "\\.");
			var a = new RegExp("\\." + c + "$");
			if (b.match(a)) {
				return 2
			} else {
				return 0
			}
		}
	}
};
var fnRotateScale = function(dom, angle, scale) {
	if (dom && dom.nodeType === 1) {
		angle = parseFloat(angle) || 0;
		scale = parseFloat(scale) || 1;
		if (typeof(angle) === "number") {
			//IE
			var rad = angle * (Math.PI / 180);
			var m11 = Math.cos(rad) * scale,
				m12 = -1 * Math.sin(rad) * scale,
				m21 = Math.sin(rad) * scale,
				m22 = m11;
			if (!dom.style.Transform) {
				dom.style.filter = "progid:DXImageTransform.Microsoft.Matrix(M11=" + m11 + ",M12=" + m12 + ",M21=" + m21 + ",M22=" + m22 + ",SizingMethod='auto expand')";
			}
			//Modern
			dom.style.MozTransform = "rotate(" + angle + "deg) scale(" + scale + ")";
			dom.style.WebkitTransform = "rotate(" + angle + "deg) scale(" + scale + ")";
			dom.style.OTransform = "rotate(" + angle + "deg) scale(" + scale + ")";
			dom.style.Transform = "rotate(" + angle + "deg) scale(" + scale + ")";
		}
	}
};
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
	this.intersects = function(obj) {
		var a_x_w = Math.abs((this.x + this.width / 2) - (obj.x + obj.width / 2));
		var b_w_w = Math.abs((this.width + obj.width) / 2);
		var a_y_h = Math.abs((this.y + this.height / 2) - (obj.y + obj.height / 2));
		var b_h_h = Math.abs((this.height + obj.height) / 2);
		if (a_x_w < b_w_w && a_y_h < b_h_h)
			return true;
		else
			return false;
	}

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
	this.intersects = function(rr) {
		var maxRadius = rr.radius + this.radius;
		//  已知两条直角边的长度 ，可按公式：c²=a²+b² 计算斜边。
		var a = Math.abs(rr.x - this.x);
		var b = Math.abs(rr.y - this.y);
		var distance = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)); // 计算圆心距离
		if (distance < maxRadius) {
			return true;
		}
		return false;
	}
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
};