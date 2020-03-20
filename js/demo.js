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

/**
 * [setTime 以指定时间格式eg.2011-1-2, 增加days后的时间格式]
 * @param {[type]} datestr [指定时间]
 * @param {[type]} days    [增加天数]
 */
function setTime(datestr, days) {
	var dates = datestr.replace(/-/g,","),//"2011,1,02" "2011-1-02" "2011/1/02"
		getDate = new Date(dates);
	getDate.setDate(getDate.getDate() + days);
	var year = getDate.getFullYear(),
		month = getDate.getMonth()
		day = getDate.getDate();
	return year + "-" + (month > 9 ? '' : "0") + (month + 1) + "-" + (day > 9 ? '' : "0") +day;
}
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
        len = windowKeys.length, i = 0;
    for (; i < len; i++) {
       if (/event/ig.test(windowKeys[i])) {
           console.info(windowKeys[i]);
       }
       // windowKeys[i].indexOf("")
    }
    return windowKeys.indexOf(key);
}
//"use strict"
function fun(e) {
	var str = "王素芳我爱你", ss="", sss, tt, mm, nn;

	for (var i = 0;i<str.length;i++)
		ss += str.charCodeAt(i);
	tt = encodeURIComponent(str).replace(/%/g,"").toString().toLowerCase();
	console.log(ss,tt);

	//console.log(str.replace(/([\u4e00-\u9fa5]{3})([\u4e00-\u9fa5]{3})/g,"$2,$1"));
	console.log(str.replace(/(.{3})(.+)/g,"$2,$1"));

	sss = ss.replace(/\d{5}/g,function(val,i) {
		return String.fromCharCode(+val);
	})
	console.log(sss);

	for (i = 0, sss = ""; 5*i < ss.length; i++) {
		sss += String.fromCharCode(ss.substr(i*5,5));
	}
	console.log(sss);

	mm = tt.replace(/\w{2}/g,function(val,i) {
		return "%"+val;
		//console.log(arguments)
	})
	console.log(mm,decodeURIComponent(mm));

	nn = tt.replace(/\w/g,function(val,i) {
		if (i%2 == 0) {
			return "%"+val;
		} else {
			return val;
		}
		//console.log(arguments)
	})
	console.log(nn);
	return "I love you";
}
