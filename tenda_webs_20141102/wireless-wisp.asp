<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Q-link</title>
<link rel="stylesheet" href="css/mobile.css">
<link rel="shortcut icon" href="img/favicon.ico">
<script>
var data = {
	'repeat-mode': '<%nvram_get("workMode");%>', // router,3g,wisp ,apclient,ap
	'wlRoamingEnable': '<%nvram_get("wlRoamingEnable");%>',
	'wlRoamingDisplay': '<%nvram_get("wlRoamingDisplay");%>'
};
</script>
<script src="js/jquery-1.9.1.min.js"></script>
<script src="js/lang.js"></script>
<script src="js/common.js"></script>
<script src="js/wireless-wisp.js"></script>
</head>
<body>
	<div id="spdcontrol" data-role="page">
		<div data-theme="c" class="header">
			<a class="btn-header-back" rel="external" data-transition="flip" href="main.asp">
				<img src="img/arrow-l.png" class="logo-arrow-l">
			</a>
			<img src="img/logo-y.png" class="logo">
		</div>
		<div data-role="content" class="cbody">
			<div class="contab">
				<span class="refresh title" id="refresh"><span data-lang="wisp_sign">无线信号放大</span>
					<span id="refreshImg" class="m-refresh"></span><span id="loadingImg" class="m-loading" style="display:none;"></span></span>
				<p class="switch" id="wispSwitch"></p>
			</div>
			<div class="contab none" id="wander">
				<span class="refresh title" data-lang="wisp_wander">无线漫游</span>
				<p class="switch off" id="wlRoamingEnable"></p>
			</div>
			<span class="text-info title none" id="selecttip" data-lang="wisp_select">
				选择网络
			</span>
			<form>
				<input type="hidden" id="selectSsid" name="selectSsid"/>
				<input type="hidden" id="sta_wep_key_fmt" name="sta_wep_key_fmt"/>
				<div class="popup in none">
					<h3 id="ssidNote">请输入XXX的密码</h3>
					<table class="repeat-table">
						<tr id="sta_wpa">
							<td colspan="3">
								<input type="text" name="sta_password" id="sta_password" maxLength="64" placeholder="" />
							</td>
						</tr>
						<tr id="sta_wep">
							<td width="30%">
								<select name="sta_wep_mode" id="sta_wep_mode">
									<option value="0">Open</option>
									<option value="1">Shared</option>
								</select>
							</td>
							<td width="20%">
								<select name="sta_wep_key_index" id="sta_wep_key_index">
									<option value="1">1</option>
									<option value="2">2</option>
									<option value="3">3</option>
									<option value="4">4</option>
								</select>
							</td>
							<td>
								<input type="text" name="sta_wep_key" id="sta_wep_key" maxLength="13" placeholder="" />
							</td>
						</tr>
					</table>
					<div class="repeat-popuptip none" data-lang="wisp_note">点击连接后，设备将自动重启使配置生效</div>
					<button type="button" id="pwd-cancel" class="button" data-lang="wisp_cancel">取消</button>
					<button type="button" id="pwd-ok" class="button" data-lang="wisp_connect">连接</button>
				</div>
			</form>
			<div class="contab ctrltable none">
				<table class="repeat-table">
					<tr>
						<td>
							<div class="ssid"></div>
							<a class="signal"></a>
						</td>
					</tr>
					<tr>
						<td>
							<div class="ssid"></div>
							<a class="signal encrypt"></a>
							<a class="signal"></a>
						</td>
					</tr>
				</table>
			</div>
		</div>
	</div>
	<div id="gbx_overlay" style="display:none"></div>
</body>
</html>
