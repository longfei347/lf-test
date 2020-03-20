var b28n = {
	"Must be number": "请输入数字",
	"Input range is: %s - %s": "输入范围：%s - %s",
	"this field is required": "本项不能为空",
	"String length range is: %s - %s bit": "长度范围：%s - %s 位",
	"Please input a validity %s": "请输入正确的 %s",
	"Please input a validity subnet mask": "请输入正确的子网掩码",
	"Please input a validity MAC address": "请输入正确的 MAC 地址",
	"Must be ASCII.": "请输入非中文字符",
	"Can't input: '%s'": "不能输入: '%s'",
	"The second character must be even number.": "MAC 地址的第二个字符必须为偶数",
	"IP address can't be multicast, broadcast or loopback address.": "IP 地址不能为组播,广播或环回地址",
	"%s's first input can't be 127, becuse it is loopback address.": "以127开始的%s为保留的环回地址，请将头部改为1到223之间的其它值。",
	"%s's first input %s is greater than 223.": "%s的首部%s无效，请指定一个1到223之间的值。",
	"Invalid IP address and subnet mask merge, modify the IP address or subnet mask.": "无效的 IP 地址和子网掩码合并，请修改 IP 地址或子网掩码."
};

var CookieUtil = {
	get : function (name) {
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
	set : function (name, value, expires, path, domain, secure) {
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
	unset : function (name, path, domain, secure) {
		this.set(name, "", new Date(0), path, domain, secure);
	}
};

var progressStrip = (function(window) {
	function ProgressStrip(url, reboot_time, reboot_msg,  up_time, up_msg) {
		var my_obj = this;
		this.url = url || '';
		this.reboot_timer = null;
		this.reboot_time = reboot_time || 600;
		this.reboot_msg = reboot_msg || "设备正在重启,请等待..."; //Please wait: Device rebooting...
		
		this.up_timer = null;
		this.up_msg = up_msg || "设备正在升级, 请不要切断电源!";//The system is flashing now. DO NOT POWER OFF THE DEVICE!
		this.up_pc = 0;
		this.reboot_pc = 0;
		this.up_time = up_time || "0";
		
			
		this._loadding = function () {
			my_obj.reboot_pc += 1;
			
			/*if (my_obj.reboot_pc == 30) {
				my_obj.reboot_time -= 60; 
			}
			
			if (my_obj.reboot_pc == 70) {
				my_obj.reboot_time -= 60;
			}*/
			
			if (my_obj.reboot_pc > 100) {
				if (my_obj.url === "") {
					location.pathname = '';
				} else {
					if (my_obj.url.indexOf("http://") !== -1 ||
							my_obj.url.indexOf("https://") !== -1) {
						window.location = my_obj.url;
					} else {
						window.location = "http://" + my_obj.url;
					}

				}
				//document.getElementById('gbx_overlay').style.display = 'none';
				//document.getElementById('loading_div').style.display = 'none';
				
				clearTimeout(my_obj.reboot_timer); 
				return 0;
			}
			
			document.getElementById('load_pc').style.width = my_obj.reboot_pc + "%";
			document.getElementById('load_text').innerHTML = my_obj.reboot_pc + "%";
			
			my_obj.reboot_timer = setTimeout(my_obj._loadding,  my_obj.reboot_time);
		};
		
		this._upgrading = function () {
			my_obj.up_pc += 1;
			
			/*if (my_obj.up_pc == 30) {
				my_obj.up_time -= 60;
			}
			
			if (my_obj.up_pc == 70) {
				my_obj.up_time -= 60;
			}*/
			
			if (my_obj.up_pc > 100) {
				clearTimeout(my_obj.up_timer);
				my_obj._loadding();
				return 0;
			}
			
			document.getElementById('upgrade_pc').style.width = my_obj.up_pc + "%";
			document.getElementById('upgrade_text').innerHTML = my_obj.up_pc + "%";
			
			my_obj.up_timer = setTimeout(my_obj._upgrading, my_obj.up_time);
		};
	}

	ProgressStrip.prototype = {
		constructor : ProgressStrip,
		_init: function () {
			var gbxOverlay = document.getElementById("gbx_overlay"),
				loadContentElem = document.getElementById("loading_div"),
				loadingElem = document.getElementById("loadding"),
				bodyElem = document.getElementsByTagName('body')[0],
				left,
				top;
			
				function pageWidth() {
					var de = document.documentElement;
					
					return window.innerWidth ||
							(de && de.clientWidth) || document.body.clientWidth;
				}
				
				function pageHeight() {
					var de = document.documentElement;
					
					return window.innerHeight ||
							(de && de.clientHeight) || document.body.clientHeight;
				}
			
			if (!gbxOverlay) {
				gbxOverlay = document.createElement('div');
				gbxOverlay.id = 'gbx_overlay';
				bodyElem.appendChild(gbxOverlay);
			}
			if (!loadContentElem) {
				loadContentElem = document.createElement('div');
				loadContentElem.id = 'loading_div';
				bodyElem.appendChild(loadContentElem);
			}
			if (loadContentElem && loadingElem) {
				
				gbxOverlay.style.display = "block";
				loadContentElem.style.display = "block";
			} else {
			
				loadContentElem.innerHTML = '<div id="up_contain">'+
						'<span id="upgrading">' +
						'<span id="upgrade_pc">' + '</span></span><p>' + this.up_msg +
						'<span id="upgrade_text"></span></p></div>' +
						'<span id="loadding"><span id="load_pc"></span>' +
						'</span>' +
						'<p>' + this.reboot_msg + '<span id="load_text"></span></p>';
				loadContentElem = document.getElementById("loading_div");
				loadingElem = document.getElementById("loadding");
				gbxOverlay.style.display = "block";
				loadContentElem.style.display = "block";	
			}
			
			left = (pageWidth() - loadContentElem.offsetWidth) / 2;
			top = (pageHeight() - loadContentElem.offsetWidth) / 2;
			
			loadContentElem.style.left = left + 'px';
			loadContentElem.style.top = top + 'px';
			
			if (this.up_time !== "0") {
				loadContentElem.style.height = 200 + 'px';
				loadContentElem.style.width = 320 + 'px';
				
				loadingElem.style.marginTop = 15 + 'px';
				loadingElem.style.width = 260 + 'px';
				this._upgrading();
			} else {
				document.getElementById('up_contain').style.display = 'none';
				this._loadding();
			}
			return this;
		},
		
		setRebootTime: function (time) {
			this.reboot_time = time;
		},
		
		setUpTime: function (time) {
			this.up_time = time;
		}
	};

	return function (url, reboot_time, reboot_msg,  up_time, up_msg) {
		var obj = new ProgressStrip(url, reboot_time, reboot_msg, up_time, up_msg);			
		return obj._init();
	}
}(window));

valid = {
	num: function (str, min, max) {
		if(!(/^[0-9]{1,}$/).test(str)) {
			return __("Must be number");
		}
		if (min && max) {
			if(parseInt(str, 10) < min || parseInt(str, 10) > max) {
				return __("Input range is: %s - %s", [min, max]);
			}
		}
	},
	
	checkMac: function (mac) {
		var re = /^([0-9a-fA-F]{2}:){5}[0-9a-fA-F]{2}$/;
		if (!re.test(mac) || mac == "00:00:00:00:00:00" || mac.toUpperCase() == "FF:FF:FF:FF:FF:FF") {
			alert(_("common_macErr1"));//"MAC地址错误，请输入正确的MAC地址！"
			return false;
		}
		if (parseInt(mac.charAt(1), 16) & 1 == 1) { //m[0]最后一位是否为1
			alert(_("common_macErr1"));//"MAC地址为组播地址,请重新输入！"
			return false;
		}
		return true;
	},
	
	mac: {
		all: function (str) {
			var ret = this.specific(str);
			
			if (ret) {
				return ret;
			}
			if(!(/^([0-9a-fA-F]{2}:){5}[0-9a-fA-F]{2}$/).test(str)) {
				return __("Please input a validity MAC address");
			}
		},
		
		specific: function (str) {
			var subMac1 = str.split(':')[0];
			if (subMac1.charAt(1) && parseInt(subMac1.charAt(1), 16) % 2 !== 0) {
				return __('The second character must be even number.');
			}
		}
	},
	
	ip: {
		all: function (str, objName) {
			var ret = this.specific(str);
			if (ret) {
				return ret;
			}
			if(!(/^([1-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){2}([1-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/).test(str)) {
				return __("Please input a validity %s", [objName]);
			}
		},
		
		specific: function (str, objName) {
			var ipArr = str.split('.'),
				ipHead = ipArr[0]
				var objName = objName;
			if(ipArr[0] === '127') {
				return __("%s's first input can't be 127, becuse it is loopback address.", [objName]);
			}
			if (ipArr[0] > 223) {
				return __("%s's first input %s is greater than 223.", [objName, ipHead]);
			}
		}
	},
	
	dns: function () {},
	
	mask: function (str) {
		var rel = /^(254|252|248|240|224|192|128|0)\.0\.0\.0$|^(255\.(254|252|248|240|224|192|128|0)\.0\.0)$|^(255\.255\.(254|252|248|240|224|192|128|0)\.0)$|^(255\.255\.255\.(254|252|248|240|224|192|128|0))$/;
		if(!rel.test(str)) {
			return __("Please input a validity subnet mask");
		}
	},
	
	len: function (str, min, max) {
		var len = str.length;
		
		if(len < min || len > max) {
			return __('String length range is: %s - %s bit', [min, max]);	
		}
	},
	
	email: function (str) {
		var rel = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
		if(!rel.test(str)) {
			return __("Please input a validity E-mail address");	
		}
	},
	
	hex: function (str) {
		if(!(/^[0-9a-fA-F]{1,}$/).test(str)) {
			return __("Must be hex.");		
		}
	},
	
	ascii: function (str, min, max) {
		if(!(/^[ -~]+$/g).test(str)) {
			return __("Must be ASCII.");
		}
		if(min || max) {
			return valid.len(str, min, max);
		}
	},
	
	pwd: function (str) {
		var rel = /^\w{1,}$/;
		if(!rel.test(str)) {
			return __("Please input a validity password.");
		}
	},
	
	none: function () {},
	
	username: function(str) {
		if(!(/^\w{1,}$/).test(str))	{
			return __("Please input a validity username.");
		}
	},
	
	time: function(str) {
		if(!(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/).test(str)) {
			return __("Please input a valid time.");	
		}
	},
	
	ssidPasword: function (str, minLen, maxLen) {
		var ret;
		
		if (minLen && maxLen) {
			ret = valid.len(str, minLen, maxLen);
			if (ret) {
				return ret;
			}
		}
		ret = valid.ascii(str);
		return ret;
	},
	
	remarkTxt: function (str, banStr) {
		var len = banStr.length,
			curChar,
			i;
			
		for(i = 0; i < len; i++) {
			curChar = banStr.charAt(i);
			if(str.indexOf(curChar) !== -1) {
				return __("Can't input: '%s'", [curChar]);
			}
		}
	}
};

//验证两个IP是否在同一网段
function isSameNet(ip_lan, ip_wan, mask_lan, mask_wan) {
	var ip1Arr = ip_lan.split("."),
		ip2Arr = ip_wan.split("."),
		maskArr1 = mask_lan.split("."),
		maskArr2 = mask_wan.split("."),
		i;

	for (i = 0; i < 4; i++) {
		if ((ip1Arr[i] & maskArr1[i]) != (ip2Arr[i] & maskArr2[i])) {
			return false;
		}
	}
	return true;
}

function ipMaskMergeOk (ip, mask) {
	var ipArr = ip.split('.'),
		maskArr = mask.split('.'),
		mergeRslt,
		i;
	for(i = 0; i < 4; i++) {
		ipArr[i] = parseInt(ipArr[i], 10);
		maskArr[i] = parseInt(maskArr[i], 10);
	}
	mergeRslt = (ipArr[0] | maskArr[0]) + '.' + (ipArr[1] | maskArr[1]) + '.' + (ipArr[2] | maskArr[2]) + '.' + (ipArr[3] | maskArr[3]);
	if (mergeRslt == mask || mergeRslt == '255.255.255.255') {
		return __("Invalid IP address and subnet mask merge, modify the IP address or subnet mask.");
	}
	return false;
}

function getValueByName(name) {
	var elems = document.getElementsByName(name),
		len = elems.length,
		val,
		i;

	if (len === 1) {
		val = elems[0].value;
	} else {
		for (i = 0; i < len; i++) {
			if (elems[i].checked) {
				val = elems[i].value;
				return val;
			}
		}
	}
	return val;
}

function setValueByName(name, val) {
	var elems = document.getElementsByName(name),
		len = elems.length,
		i;

	if (len === 1 && (elems[0].type !== 'radio' || elems[0].type !== 'checkbox')) {
		elems[0].value = val;
		return elems[0];
	} else {
		for (i = 0; i < len; i++) {
			if (elems[i].value == val) {
				elems[i].checked = true;
				return elems[i];
			}
		}
	}
	return null;
}

function fillDataById() {
	var id, elem;
	
	for(id in data) {
		if(data.hasOwnProperty(id) && (elem = document.getElementById(id))) {
			elem.value = data[id];
		}
	}
}

function decodeSSID(SSID) {
	var e = document.createElement("div"),
		deSSID = '';
		
	if (!SSID) {
		return deSSID;
	}
	e.innerHTML = SSID.replace(/\x20/g, "\xA0");
	if (e.innerText) {
		deSSID = e.innerText;
	} else if (e.textContent) {
		deSSID = e.textContent;
	}
	e = null;
	return deSSID.replace(/\xA0/g, "\x20");
}

function langUtil(language) {
	/*if (window.sessionStorage) {
		if (language) {
			
			alert(window.sessionStorage + " : " + language)
			//window.sessionStorage.lang = language;
			window.sessionStorage.setItem("lang",language);
			alert(444)
			return true;
		} else if (window.sessionStorage.lang1 == "cn") {
			return "cn";
		} else if (window.sessionStorage.lang1 == "en") {
			return "en";
		} else {
			return false;
		}
	} else {*/
		if (language) {
			CookieUtil.set("lang", language);
			return true;
		} else if (CookieUtil.get("lang") == "cn") {
			return "cn";
		} else if (CookieUtil.get("lang") == "en") {
			return "en";
		} else {
			return false;
		}
	//}
}

function translate() {
	var _lang = langUtil() == "cn" ? 0 :1;
	$("[data-lang]").each(function(ind, t) {
		var val = $(t).attr("data-lang"),
			mod = val.match(/[a-z]+/i)[0];
		//console.log(t.dataset.lang,t.innerHTML);
		if (lang[mod][val]) {
			t.innerHTML = lang[mod][val][_lang];
		}
	})
}

function _(ind) {
	var _lang = langUtil() == "cn" ? 0 : 1,
		mod = ind.split("_")[0];
	return lang[mod][ind][_lang];
}

function __(str, replacements) {
	var ret = langUtil() == "en" ? str : b28n[str],
		len = replacements && replacements.length,
		count = 0,
		index;

	if (len > 0) {
		while((index = ret.indexOf('%s')) !== -1) { 
			ret = ret.substring(0,index) + replacements[count] +
					ret.substring(index + 2, ret.length);
			count = ((count + 1) === len) ? count : (count+1);
		}
	}
	alert(ret);
	return true;
}
