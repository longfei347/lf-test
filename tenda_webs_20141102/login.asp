<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Q-link</title>
<link rel="stylesheet" href="css/mobile.css">
<link rel="shortcut icon" href="favicon.ico">
</head>
<body onload="init()">
	<div id="login" class="pbody" data-role="page">
		<div data-theme="c" class="header">
			<img src="img/logo-y.png" class="logo" />
			<span class="cn">&nbsp;&nbsp;En</span>
		</div>
		<div data-role="content" class="cbody">
			<form name="Login" method="post" action="/login/auth">
				<input name="user" value="admin" type="hidden">
				<div class="login-box">
					<p class="login-massage text-error"><span id="message-error">&nbsp;</span></p>
					<div class="ui-input-pwd">
						<input type="text" class="ui-input-text" name="pass" id="login-pwd">
						<span class="ui-icon ui-icon-pwd">&nbsp;</span>
					</div>
					<div class="login-gap"></div>
					<button type="button" class="do-btn" data-lang="login1" onclick="preSubmit(document.Login)">登  录</button>
				</div>
			</form>
		</div>
	</div>
</body>
<script src="js/jquery-1.9.1.min.js"></script>
<script src="js/lang.js"></script>
<script src="js/common.js"></script>
<script>
var pass = '<%nvram_get("Password");%>',
	lanIp = '<%nvram_get("lanIpAddr");%>';
function init(){
	if (location.href != top.location.href || location.href.indexOf(lanIp) == -1) {
		top.location.href = "http://" + lanIp + "/login.asp";
	}
	if (!CookieUtil.get("lang")) {
		CookieUtil.set("lang", "cn");
	} else if (CookieUtil.get("lang") == "en") {
		$(".header span").removeClass("cn").addClass("en").html("中文&nbsp;&nbsp;&nbsp;");
	}
	translate();
	document.Login.pass.value = "";
	document.Login.pass.focus();

	if(location.href.indexOf("error") != -1) {
		document.getElementById("message-error").innerHTML = _('login_passErr2');
	}
	$(".header span").on("click", function() {
		var $t = $(this);
		if ($t.hasClass("cn")) {
			$t.removeClass("cn").addClass("en").html("中文&nbsp;&nbsp;&nbsp;");
			langUtil("en");
		} else {
			$t.removeClass("en").addClass("cn").html("&nbsp;&nbsp;En");
			langUtil("cn");
		}
		translate();
	})
}

function enterDown(f, events) {
	//解决火狐浏览器不支持event事件的问题。
	var e = events || window.event,
		char_code = e.charCode || e.keyCode;
	if(char_code == 13) {
		if(e.preventDefault) {
			e.preventDefault();
		} else  {
			e.returnValue = false;
		}
		preSubmit(f);
	}
	return false;
}

document.onkeydown = function(e) {
	enterDown(document.Login, e);
};

function preSubmit(f) {
	var passwordVal = f.pass.value;
	
	if(passwordVal == "") {
		document.getElementById("message-error").innerHTML = _('login_passErr1');
		f.pass.focus();
		return false;
	}
	/*if (passwordVal.toLowerCase() == "admin") {
		f.pass.value = "admin";
	}*/
	f.submit();
}
</script>
</html>
