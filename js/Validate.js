 /*   数据校验 Regular Expression*/
function Validate() {}

/* 合法用户名-以字母数字开始的32位以内的字符串包含下划线。*/
Validate.prototype.isValidUserName = function(string) {
	var validUserNameRegExp = /^([a-z0-9])[a-z_0-9]{0,31}$/i;
	var isValid = validUserNameRegExp.test(string);
	return isValid;
}
/*包含中文字符校验*/
Validate.prototype.isIncludeChineseCharSet = function(string) {
	var validRegExp = /[^\w,<>\.\{\}\[\];:"'?\/|!@#\$%\^&\*()-=\+`~]/i;
	var isValid = validRegExp.test(string);
	return isValid;
}
/*仅包含中文字符*/
Validate.prototype.isOnlyChineseCharSet = function(string) {
	var validRegExp = /^[^\w,<>\.\{\}\[\];:"'?\/|!@#\$%\^&\*()-=\+`~]+$/i;
	var isValid = validRegExp.test(string);
	return isValid;
}
/*仅包含字母数字下划线*/
Validate.prototype.isOnlyAlphaNumericUL = function(string) {
	var validRegExp = /^\w$/i;
	var isValid = validRegExp.test(string);
	return isValid;
}
/* Email校验*/
Validate.prototype.isValidEmail = function(email) {
	var validFormatRegExp = /^\w(\.?\w)*@\w(\.?[-\w])*\.([a-z]{3}(\.[a-z]{2})?|[a-z]{2}(\.[a-z]{2})?)$/i;
	var isValid = validFormatRegExp.test(email);
	return isValid;
}
/* 身份证校验*/
Validate.prototype.isValidIDCard = function(idcard) {
	var validIDCardRegExp = /^(\d{15}|\d{17}[0-9a-z])$/i;
	var isValid = validIDCardRegExp.test(idcard);
	return isValid;
}
/* 邮编校验*/
Validate.prototype.isValidPostalCode = function(postalCode) {
	var validFormat = /^[1-9][0-9]{5}$/;
	var isValid = validFormat.test(postalCode);
	return isValid;
}
/* 整数 */
Validate.prototype.isValidInteger = function(string) {
	var validCharactersRegExp = /^(0|[1-9][0-9]*)$/;
	var isValid = validCharactersRegExp.test(string);
	return isValid;
}
/* 数字*/
Validate.prototype.isOnlyNumeric = function(string) {
	var invalidCharactersRegExp = /[^\d]/;
	var isValid = !(invalidCharactersRegExp.test(string));
	return isValid;
}
/* 大于零的整数*/
Validate.prototype.isValidIntegerGreatZero = function(string) {
	var validCharactersRegExp = /^([1-9][0-9]*)$/;
	var isValid = validCharactersRegExp.test(string);
	return isValid;
}
/* 小数数字*/
Validate.prototype.isDicemalfraction = function(string) {
	var validCharactersRegExp = /^(\d+)(.?)(\d*)$/;
	var isValid = validCharactersRegExp.test(string);
	return isValid;
}
/* 带正负号的小数数字*/
Validate.prototype.isDicemalfraction1 = function(string) {
	var validCharactersRegExp = /^([+|-]?)(\d+)(.?)(\d*)$/;
	var isValid = validCharactersRegExp.test(string);
	return isValid;
}
/* 字母数字*/
Validate.prototype.isOnlyAlphaNumericNoSpace = function(string) {
	var invalidCharactersRegExp = /[^a-z\d]/i;
	var isValid = !(invalidCharactersRegExp.test(string));
	return isValid;
}
/* 字母空格*/
Validate.prototype.isOnlyAlphabetic = function(string) {
	invalidCharactersRegExp = /[^a-z ]/i;
	var isValid = !(invalidCharactersRegExp.test(string));
	return isValid;
}
/* 密码校验,长度1~16,包含字母数字下划线*/
Validate.prototype.isValidPassword = function(password) {
	var invalidCharactersRegExp = /[^\w]/i;
	var isValid = !(invalidCharactersRegExp.test(password));
	if (isValid) {
		isValid = (password.length >= 1 && password.length <= 16);
	}
	return isValid;
}
/*空格校验*/
Validate.prototype.isAllSpace = function(string) {
	var validCharactersRegExp = /^ +$/;
	var isValid = validCharactersRegExp.test(string);
	return isValid;
}
/*空值校验*/
Validate.prototype.isNullValue = function(obj) {
	if (obj == null) {
		return true;
	}
	if (typeof (obj) == "string") {
		return (obj.length == 0);
	}
	if ("undefine" == ("" + obj)) {
		return true;
	}
	return false;
}
/* 字母数字空格*/
Validate.prototype.isOnlyAlphaNumeric = function(string) {
	var invalidCharactersRegExp = /[^a-z\d ]/i;
	var isValid = !(invalidCharactersRegExp.test(string));
	return isValid;
}
/* 获取字符串长度，一个中文字符长度为二*/
Validate.prototype.getStringLength = function(string) {
	var len = 0;
	for (var i = 0; i < string.length; i++) {
		var chr = string.charAt(i);
		if (this.isOnlyChineseCharSet(chr)) {
			len += 2;
		} else {
			len++;
		}
	}	
	return len;
}
Validate.prototype.isValidFloatingPoint = function(string) {
	var invalidCharactersRegExp = /[^\d\.-]/;
	var isValid = !(invalidCharactersRegExp.test(string));
	return isValid;
}

Validate.prototype.isValidAge = function(age) {
	var isValid = false;
	if (this.isOnlyNumeric(age)) {
		isValid = (parseInt(age) > 0 && parseInt(age) < 140)
	}	
	return isValid;
}
/* 日期 */
Validate.prototype.isValidDate = function(day, month, year) {
	var isValid = true;
	var enteredDate = new Date(day + " " + month + " " + year);
	if (enteredDate.getDate() != day) {
		isValid = false;
	}
	return isValid;
}
/* 出生年月日 */
Validate.prototype.isValidDateOfBirth = function(day, month, year) {
	var isValid = true;
	var nowDate = new Date();
	year = parseInt(year);
	dateOfBirth = new Date(day + " " + month + " " + year);
	if (!this.isValidDate(day, month, year)) {
		isValid = false;
	} else if (dateOfBirth > nowDate || (year + 140) < nowDate.getFullYear()) {
		isValid = false;
	}	
	return isValid;
}
/* IP地址 */
Validate.prototype.isValidIp = function(ip,str) {
	var tip = /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]\d?)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/,
		ipArr = ip.split(".");
	if (ip == "") {
		alert("请输入" + str + "！");
		return false;
	}
	if (!tip.test(ip)) {
		alert(str + "错误！");
		return false;
	}
	if (ipArr[0] == 127 || ipArr[0] >= 224) {
		alert(str + "错误！");
		return false;
	}
    return true;
}
/* 子网掩码 */
Validate.prototype.isValidMask = function(mask) {
	var m = mask.value.split('.');
	if (m.length != 4) { 
		alert("子网掩码无效！"); 
		return false; 
	}
	for (var i = 0; i < 4; i++) {
		if (!(m[i] == 0 || (+m[i]).toString(2).length == 8)) {
			alert("子网掩码无效！");
			return false;
		}
	}
	var v = (+m[0]).toString(2) + (+m[1]).toString(2) + (+m[2]).toString(2) + (+m[3]).toString(2);
	if(!/^1+0*$/.test(v)) {
		alert("子网掩码无效！");
		return false;
	}
	return true;
}
/* MAC地址 */
Validate.prototype.isValidMac = function(mac) {	
	var re = /^([0-9a-fA-F]{2}:){5}[0-9a-fA-F]{2}$/;
    if (!re.test(mac)) {
		alert("MAC地址错误，请输入正确的MAC地址！");
        return false;
    }
	if(mac =="00:00:00:00:00:00" || mac.toUpperCase() == "FF:FF:FF:FF:FF:FF") {
		alert("MAC地址为无效地址,请重新输入！");
		return false;
	}
	if(parseInt(mac.charAt(1),16)&1 == 1) {//m[0]最后一位是否为1
		alert("MAC地址为组播地址,请重新输入！");
		return false;
	}
	return true;
}
/* ip主机位不全为0 */
Validate.prototype.isValidHostIp = function(ip, mask) {
	var ips = ip.split("."),
		masks = mask.split("."),
		i = 0;
	for(; i < 4; i++) {
		if ((ips[i] | masks[i]) != masks[i]) {
			return true;
		}
	}
	return false;
}
/* ip主机位不全为1 */
Validate.prototype.isValidHostIp1 = function(ip, mask) {
	var ips = ip.split("."),
		masks = mask.split("."),
		i = 0;
	for(; i < 4; i++) {
		if ((ips[i] | masks[i]) != 255) {
			return true;
		}
	}
	return false;
}