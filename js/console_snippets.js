/*玫瑰小镇
var xml=new XMLHttpRequest;xml.open("post","http://cgi.meigui.qq.com/cgi-bin/rosary0904_gain?gprand="+Math.random());
xml.send("ossType=5&version=1&soilno=15&cgiVersion=32&flag=0&benew0908=8");
 */
/*var i = 0, fns = [], jquerys = [];
for (i in $) {
jquerys.push(i);
}
jquerys.sort();
for (i in $.fn) {
fns.push(i);
}
fns.sort();*/
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
//"use strict"
function fun(e) {
	var str = "王素芳我爱你",
	ss = "",
	sss,
	tt,
	mm,
	nn;

	for (var i = 0; i < str.length; i++)
		ss += str.charCodeAt(i);
	tt = encodeURIComponent(str).replace(/%/g, "").toString().toLowerCase();
	console.log(ss, tt);

	//console.log(str.replace(/([\u4e00-\u9fa5]{3})([\u4e00-\u9fa5]{3})/g,"$2,$1"));
	//console.log(str.replace(/(.{3})(.+)/g,"$2,$1"));

	sss = ss.replace(/\d{5}/g, function (val, i) {
			return String.fromCharCode(+val);
		})
		console.log(sss);

	for (i = 0, sss = ""; 5 * i < ss.length; i++) {
		sss += String.fromCharCode(ss.substr(i * 5, 5));
	}
	console.log(sss);

	mm = tt.replace(/\w{2}/g, function (val, i) {
			return "%" + val;
			//console.log(arguments)
		})
		nn = tt.replace(/\w/g, function (val, i) {
			if (i % 2 == 0) {
				return "%" + val;
			} else {
				return val;
			}
			//console.log(arguments)
		})
		console.log(mm == nn, decodeURIComponent(mm));
	return "I love you";
}

var fnRotateScale = function (dom, angle, scale) {
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
/*
var rad = degrees * Math.PI * 2 / 360;
var costheta = Math.cos(rad);
var sintheta = Math.sin(rad);
a = parseFloat(costheta).toFixed(8);
b = parseFloat(-sintheta).toFixed(8);
c = parseFloat(sintheta).toFixed(8);
d = parseFloat(costheta).toFixed(8);

$this.css({
	'-ms-filter': 'progid:DXImageTransform.Microsoft.Matrix(M11=' + a + ', M12=' + b + ', M21=' + c + ', M22=' + d + ',sizingMethod=\'auto expand\')',
	'filter': 'progid:DXImageTransform.Microsoft.Matrix(M11=' + a + ', M12=' + b + ', M21=' + c + ', M22=' + d + ',sizingMethod=\'auto expand\')',
	'-moz-transform': "matrix(" + a + ", " + c + ", " + b + ", " + d + ", 0, 0)",
	'-webkit-transform': "matrix(" + a + ", " + c + ", " + b + ", " + d + ", 0, 0)",
	'-o-transform': "matrix(" + a + ", " + c + ", " + b + ", " + d + ", 0, 0)"
});
*/
