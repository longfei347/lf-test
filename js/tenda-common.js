var Class = function() {
	var klass = function() {
		this.init.apply(this, arguments);
	};
	if (parent) {
		var subclass = function() {};
		subclass.prototype = parent.prototype;
		klass.prototype = new subclass;
	};
	klass.prototype.init = function(a,b) {
		//console.log(this);
	};
	klass.fn = klass.prototype;
	klass.fn.parent = klass;
	klass._super = klass.__proto__;
	klass.extend = function (obj) {
		var extended = obj.extended;
		for (var i in obj) {
			klass[i] = obj[i];
		}
		if (extended) extended(klass);
	};
	klass.include = function (obj) {
		var included = obj.included;
		for (var i in obj) {
			klass.fn[i] = obj[i];
		}
		if (included) included(klass);
	}
	klass.proxy = function(func) {
		var self = this;
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
		//click
		this.element.click(this.proxy(this.click));
	},
	click: function(){}
})

function checkIp(ipa, str) {
	var ipParts = ipa.value.split('/'),
	tip = /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]\d?)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/,
	ip = ipParts[0].split(".");
	if (ipParts.length > 2 || ipParts[0] == "" || !tip.test(ipParts[0]) || (ip[0] == 127 || ip[0] >= 224)) {
		alert(str);
		return false;
	}
	if (ipParts.length == 2 && !/^(30|[12]\d|[2-9])$/.test(ipParts[1])) {
		alert(str);
		return false;
	}
	return true;
}

function checkMask(mask) {
	var m = mask.value.split('.');
	if (m.length != 4) {
		alert(_("common_maskErr"));
		return false;
	}
	for (var i = 0; i < 4; i++) {
		if (!(m[i] == 0 || (+m[i]).toString(2).length == 8) || +m[0] < 192 || +m[3] > 252) {
			alert(_("common_maskErr"));
			return false;
		}
	}
	var v = (+m[0]).toString(2) + (+m[1]).toString(2) + (+m[2]).toString(2) + (+m[3]).toString(2);
	if (!/^1+0*$/.test(v)) {
		alert(_("common_maskErr"));
		return false;
	}
	return true;
}

function checkVerifyIp(ip, mask) { //00
	var ips = ip.split("."),
	masks = mask.split("."),
	i = 0;
	for (; i < 4; i++) {
		if ((ips[i] | masks[i]) != masks[i]) {
			return true;
		}
	}
	return false;
}

function checkVerifyIptwo(ip, mask) { //11
	var ips = ip.split("."),
	masks = mask.split("."),
	i = 0;
	for (; i < 4; i++) {
		if ((ips[i] | masks[i]) != 255) {
			return true;
		}
	}
	return false;
}

function checkMAC(mac) {
	var re = /^([0-9a-fA-F]{2}:){5}[0-9a-fA-F]{2}$/;
	if (!re.test(mac) || mac == "00:00:00:00:00:00" || mac.toUpperCase() == "FF:FF:FF:FF:FF:FF") {
		alert(_("common_macErr1"));
		return false;
	}
	if (parseInt(mac.charAt(1), 16) & 1 == 1) { //m[0]最后一位是否为1
		alert(_("common_macErr2"));
		return false;
	}
	return true;
}

function checkIpv6(address) {
	var ipParts = address.split('/'),
	ip = ipParts[0],
	num;
	if (ipParts.length > 2) {
		return false;
	}
	if (ipParts.length == 2) {
		num = parseInt(ipParts[1]);
		if (num <= 0 || num > 128)
			return false;
	}
	// Test for empty address
	if (ip.length < 3) {
		return ip == "::";
	}
	// Check if part is in IPv4 format
	if (ip.indexOf('.') > 0) {
		var lastcolon = ip.lastIndexOf(':');
		if (!(lastcolon && checkIp(ip.substr(lastcolon + 1))))
			return false;
		// replace IPv4 part with dummy
		ip = ip.substr(0, lastcolon) + ':0:0';
	}
	// Check uncompressed
	if (ip.indexOf('::') < 0) {
		var match = ip.match(/^(?:[a-f0-9]{1,4}:){7}[a-f0-9]{1,4}$/i);
		return match != null;
	}
	// Check colon-count for compressed format
	if (ip.indexOf(':') >= 0) {
		var match = ip.match(/^(?::|(?:[a-f0-9]{1,4}:)+):(?:(?:[a-f0-9]{1,4}:)*[a-f0-9]{1,4})?$/i);
		return match != null;
	}
	// Not a valid IPv6 address
	return false;
}

function checkPort(port) {
	if (!/^[1-9]\d*(:\d+)?$/.test(port)) {
		return false;
	}
	var portrange = port.split(':');
	if (portrange.length == 1) {
		if (port > 65535) {
			return false;
		}
	} else if (portrange.length == 2) {
		if (portrange[0] > 65535 || portrange[1] > 65535 || +portrange[0] >= +portrange[1]) {
			return false;
		}
	}
	return true;
}

function checkSecurity() {
	var f = document.forms[0],
		securitymode = f.wlAuthMode.selectedIndex,
		wlKeyIndex = f.wlKeyIndex.value,
		wlKeyBit = f.wlKeyBit.value,
		wpsPin = f["wps-pin"].value,
		i = 0, keyval;
	if (securitymode == 0) {//wps
		if (data_wl["wps"] == 1 && data_wl["use-pin"] == 0) {
			if (wpsPin != "" && !/^[0-9]{8}$/.test(wpsPin)) {
				alert("Must be 8 Numbers!");
				f["wps-pin"].focus();
				return false;
			}
		}
	} else if (securitymode == 1 || securitymode == 2) {//wep
		for (; i < 4; i++) {
			keyval = f.wlKeys[i].value;
			if (keyval != "") {
				if (wlKeyBit == 0) { //128bit
					if (!(/^[\x00-\x7f]{13}$/.test(keyval) || /^[0-9a-f]{26}$/i.test(keyval))) {
						alert("Please enter 13 ASCII characters or 26 Hex characters.");
						f.wlKeys[i].focus();
						return false;
					}
				} else { //64bit
					if (!(/^[\x00-\x7f]{5}$/.test(keyval) || /^[0-9a-f]{10}$/i.test(keyval))) {
						alert("Please enter 5 ASCII characters or 10 Hex characters.");
						f.wlKeys[i].focus();
						return false;
					}
				}
			}
			if (f.wlKeys[+wlKeyIndex - 1].value == "") {
				alert("Please enter the network key " + wlKeyIndex);
				f.wlKeys[+wlKeyIndex - 1].focus();
				return false;
			}
		}
	} else { //wpa
		keyval = f.wlWpaPsk.value;
		//wlWpaGtkRekey = f.wlWpaGtkRekey.value;
		if (!(/^([\x00-\x7f]{8,63}|[0-9a-f]{64})$/i.test(keyval))) {
			alert("Please enter 8-64 Hex characters or 8-63 ASCII characters.");
			f.wlWpaPsk.focus();
			return false;
		}
	}
}

function translate() {
	$("[data-lang]").each(function (ind, t) {
		var val = $(t).attr("data-lang"),
		mod = val.match(/[a-z]+/i)[0],
		_lang = 1;
		//console.log(t.dataset.lang,t.innerHTML);
		if (sessionStorage) {
			if (sessionStorage.lang == "cn") {
				_lang = 0;
			} else if (sessionStorage.lang == "en") {
				_lang = 1;
			}
		} else {}
		if (lang[mod][val]) {
			t.innerHTML = lang[mod][val][_lang];
		}
	})
}

function _(ind) {
	var _lang = 1,
	mod = ind.split("_")[0];
	if (sessionStorage) {
		if (sessionStorage.lang == "cn") {
			_lang = 0;
		} else if (sessionStorage.lang == "en") {
			_lang = 1;
		}
	} else {}
	return lang[mod][ind][_lang];
}

//获取视口宽度，不包含滚动条
function viewportWidth() {
	var de = document.documentElement;

	return (de && de.clientWidth) || document.body.clientWidth ||
	window.innerWidth;
}
/* Dialog */
$.dialog = (function () {
	var defaults = {
		show : true,
		showNoprompt : false,
		model : 'dialog',
		title : '来自网页的消息',
		content : ''
	};

	function createDialogHtml(options) {
		var model = options.model,
		ret,
		nopromptClass;

		if (model === 'dialog') {
			nopromptClass = options.showNoprompt ? "dialog-nocheck" :
				"dialog-nocheck none";

			ret = '<h2 class="dialog-title">' +
				'<span id="dialog-title">' + options.title + '</span>' +
				'<button type="button" class="close btn" id="dialog-close">&times;</button>' +
				'</h2>' +
				'<div class="dialog-content">' + options.content + '</div>' +
				'<div class="' + nopromptClass + '">' +
				'<label class="checkbox" for="nocheck">' +
				'<input type="checkbox" id="dialog-noprompt" />不再提示' +
				'</label>' +
				'</div>' +
				'<div class="dialog-btn-group">' +
				'<button type="button" class="btn" id="dialog-apply">确定</button>' +
				'<button type="button" class="btn" id="dialog-cancel">取消</button>' +
				'</div>';
		} else if (model === 'message') {
			ret = '<h2 class="dialog-title">' +
				'<span id="dialog-title">' + options.title + '</span>' +
				'</h2>' +
				'<div class="dialog-content dialog-content-massage">' + options.content + '</div>';
		}

		return ret;
	}

	function Dialog(options) {
		this.element = null;
		this.id = 'r-dialog';
		this.overlay = null;
		this.noprompt = 'false';

		if ($.type(options) === 'object') {
			this.options = $.extend(defaults, options);
		} else {
			this.options = $.extend(defaults, {
					content : options
				});
		}
	}

	Dialog.prototype = {
		init : function () {
			var $overlay = $('#overlay'),
			overlayElem = $overlay[0],
			$dialog = $('#r-dialog'),
			dialogElem = $dialog[0],
			bodyElem = $('body')[0],
			thisDialog = this,
			dialogLeft,
			modelHtml;

			modelHtml = createDialogHtml(this.options);

			if (!overlayElem) {
				overlayElem = document.createElement('div');
				overlayElem.id = 'overlay';
				overlayElem.className = 'overlay';
				bodyElem.appendChild(overlayElem);
			}
			if (!dialogElem) {
				dialogElem = document.createElement('div');
				dialogElem.id = 'r-dialog';
				dialogElem.className = 'dialog';
				bodyElem.appendChild(dialogElem);

				$dialog = $('#r-dialog');
				dialogElem = $dialog[0];
				$dialog.html(modelHtml);
			}

			// 计算居中需设计左边距为多少
			dialogLeft = (viewportWidth() - dialogElem.offsetWidth) /
			(2 * viewportWidth()) * 100;
			dialogLeft = dialogLeft > 0 ? dialogLeft : 0;

			$dialog.css('left', dialogLeft + '%');
			this.element = dialogElem;
			this.overlay = overlayElem;

			$dialog.on('click', function (e) {
				var curElem = e.target || e.srcElement,
				curId = curElem.id,
				funName = curId.split('-')[1];

				if ($('#dialog-noprompt')[0] && $('#dialog-noprompt')[0].checked) {
					thisDialog.noprompt = 'true';
				} else {
					thisDialog.noprompt = 'flase';
				}
				if (funName && thisDialog[funName]) {
					thisDialog[funName]();
				}
			});

			if (this.options.show) {
				this.open();
			}
		},

		close : function () {
			$(this.element).hide();
			$(this.overlay).hide();
		},

		open : function () {
			var nopromptElem = $('#dialog-noprompt')[0];

			$(this.element).show();
			$(this.overlay).show();
			if (nopromptElem) {
				nopromptElem.checked = false;
			}

		},

		apply : function () {
			var isClose;
			if ($.type(this.options.apply) === 'function') {
				isClose = this.options.apply.apply(this, arguments);
			}
			if (!isClose) {
				this.close();
			}

		},

		cancel : function () {
			if ($.type(this.options.cancel) === 'function') {
				this.options.cancel.apply(this, arguments);
			}
			this.close();
		}
	};

	return function (options) {
		var dialog = new Dialog(options);

		dialog.init();
		return dialog;
	};
}
	());
$("h2").on("click", function () {
	$(this).next().toggleClass("none");
})

/*var supporTransform = (function(prop) {
	var vendors = 'Khtml O Moz Webkit'.split(' '),
		len = vendors.length;
	if (prop in el.style) {
		return true;
	}
	if ('-ms-' + prop in el.style) {
		return true;
	}
	prop = prop.replace(/^[a-z]/, function (val) {
					return val.toUpperCase();
				});
	while (len--) {
		if (vendors[len] + prop in el.style) {
			return true;
		}
	}
	return false;
}("transform")); //true为支持*/

var code = {//
	encode : function(str) {
		var unicode = str.replace(/./g, function(st){
			return ("0000" + st.charCodeAt(0)).substr(-5);
		});
		var uricode = str.replace(/./g, function(st){
			return encodeURIComponent(st).length == 1 ? "0" + st : encodeURIComponent(st).replace(/\%/g,"").toLowerCase();
		});
		return "UNICODE: " + unicode +"\n" + "URI: " + uricode; 
	},
	decode: function(str) {
		var uni,nri;
		if (/^\d+$/g.test(str)) {
			//str.split(/\d{5}/)
			nui = str.replace(/\d{5}/g, function (st) {
				return String.fromCharCode(+st);
			})
			return nui;
		} else {
			uri = str.replace(/\w{2}/g, function (st) {
				return /0\w/.test(st) ? st.substr(1) : "%" + st;
			})
			return decodeURIComponent(uri);
		}
	}
}