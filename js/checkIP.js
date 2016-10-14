function IsURL(str_url) {
	var strRegex = "(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?"
		 + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
		 + "|" // 允许IP和DOMAIN（域名）
		 + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
		 + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
		 + "[a-z]{2,6})" // first level domain- .com or .museum
		 + "(:[0-9]{1,5})?" // 端口- :80
		 + "((/?)|" // a slash isn't required if there is no file name
		 + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
	var re = new RegExp(strRegex);
	if (re.test(str_url)) {
		return (true);
	} else {
		return (false);
	}
}
function IsURL(str_url) {
	var strs = str_url.split(","),
	i = 0;
	for (; i < strs.length; i++) {
		if (/^[\d\.*]+$/.test(strs[i])) {
			if (!/^(2[0-2][0-3]|1\d\d|[1-9]\d?)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){2}\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d|\*)(:\d{1,5})?$/.test(strs[i])) {
				alert("含有无效IP地址,请重新输入!");
				return false;
			} else {
				continue;
			}
		} else {
			if (!/^([\w\-\.*]+\.){1,5}[a-zA-Z]{2,6}(:\d{1,5})?$/i.test(strs[i])) { //_不是合法域名,可以更严格一点
				alert("含有无效域名,请重新输入!");
				return false;
			} else {
				continue;
			}
		}
	}
	return true;
}

IsURL("*.77.net,apple.com,8.8.8.8,113.115.116.*")