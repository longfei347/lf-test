<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Access-Control-Allow-Origin" content="*">
<title>Q-link</title>
<link rel="stylesheet" href="css/mobile.css?v=TM-v1.00">
<link rel="shortcut icon" href="img/favicon.ico">
<script>
var data = {
	'wl_rate': '<%nvram_get("wlRate");%>',//0:2.4G,1:5G,其他则隐藏5G//
	'ssid': '<%aspWirelessBasic("wireless","ssid");%>',//"wireless-ssid",//
	'ssid_5g': '<%aspWirelessBasic("wireless","ssid_5g");%>',//"wireless-ssid",//
	'ssid-pwd': '<%aspWirelessBasic("wireless","password");%>',//"wireless-pwd",//
	'ssid-pwd_5g': '<%aspWirelessBasic("wireless","password_5g");%>',//"wireless-pwd",//
	'wlRoamingEnable': '<%nvram_get("wlRoamingEnable");%>',//"wlRoamingEnable",//
	//"chanel": '<%aspWirelessBasic("wireless","chanel");%>',
	//"secritymode": '<%aspWirelessBasic("wireless","secitymode");%>',
	//"ciper": '<%aspWirelessBasic("wireless","ciper");%>',
	"enwps": 0
};
</script>
<script src="js/jquery-1.9.1.min.js"></script>
<script src="js/lang.js"></script>
<script src="js/common.js"></script>
<script src="js/wireless.js"></script>
</head>
<body>
	<div id="login" data-role="page">
		<div data-theme="c" class="header">
			<a class="btn-header-back" rel="external" data-transition="flip" href="main.asp">
				<img src="img/arrow-l.png" class="logo-arrow-l">
			</a>
			<img src="img/logo-y.png" class="logo"/>
		</div>
		<div data-role="content" class="cbody">
			<form id="con-form">
				<p class="text-info title" data-lang="main_9">无线设置</p>
				<div class="contab">
					<span class="title" id="" data-lang="wireless_rate">无线频率</span>
					<p class="wl-rate">
						<label class="wl-2 on" for="wl_2"><input type="radio" id="wl_2" name="wl_rate" value="0" checked> 2.4G</label><label class="wl-5" for="wl_5"><input type="radio"  id="wl_5" name="wl_rate" value="1"> 5G</label></p>
				</div>
				<div class="contab fulltab">
					<ul>
						
						<li>
							<label class="tab-label" for="ssid" data-lang="main_ssid">无线信号名称</label>
							<input type="text" class="ui-input-text" name="ssid" id="ssid" maxlength="32" placeholder=""/>
						</li>
						<li>
							<label class="tab-label" for="ssid-pwd" data-lang="main_ssidpwd">无线密码</label>
							<input type="text" class="ui-input-text" name="ssid-pwd" id="ssid-pwd" maxlength="64" placeholder=""/>
						</li>
					</ul>
				</div>
				<button type="button" id="submit" class="do-btn" data-lang="common_save">保  存</button>
				<div class="popup messagebox none" data-lang="wireless_note">修改无线信号名称和密码需要先在电脑版网页中关闭wps</div>
			</form>
		</div>
	</div>
</body>
</html>
