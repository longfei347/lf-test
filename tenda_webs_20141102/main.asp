<!DOCTYPE html>
<html lang="cn">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Q-link</title>
<link rel="stylesheet" href="css/mobile.css">
<link rel="shortcut icon" href="img/favicon.ico">
<script>
var data = {
	"link": '<%GetWanStatus("wan", "link");%>',//"0": 未接入,"1": 接入
	"con-state": '<%GetWanStatus("wan", "status");%>',//"0": "未连接","2": "连接中...","1": "已连接"
	"con-type": '<%GetWanStatus("wan", "type");%>',//0:"静态IP", 1:"动态获取", 2:"PPPoE", 3:"3G"
	'ssid': '<%aspWirelessBasic("wireless","ssid");%>',//"wireless-ssid",//
	'ssid-pwd': '<%aspWirelessBasic("wireless","password");%>',//"wireless-pwd",//
	clients: '<%GetWanStatus("sys","client_number");%>',//3,
	'repeat-mode': '<%nvram_get("workMode");%>', // router,3g,wisp ,apclient,ap
	'super-ssid': '<%nvram_get("sta_ssid");%>', //wisp 上级ssid
	softVer: '<%GetWanStatus("sys", "ver");%>',
	lanIp : '<%nvram_get("lanIpAddr");%>',
	pass: '<%nvram_get("Password");%>'
};
</script>
<script src="js/jquery-1.9.1.min.js"></script>
<script src="js/lang.js"></script>
<script src="js/common.js"></script>
<script src="js/main.js"></script>
</head>
<body>
	<div id="index" class="pbody" data-role="page">
		<div class="header" data-theme="c">
			<img src="img/logo-y.png" class="logo" />
			<span class="cn">&nbsp;&nbsp;En</span>
		</div>
		<div data-role="content" class="cbody">
			<div class="contab">
				<a class="tab-jump" data-transition="pop" href="wan-set.asp"> </a>
				<div class="tab-inner">
					<img class="img1" src="img/explorer.png" />
					<div class="tab-left">
						<h2 class="tab-title" data-lang="main_1">上网设置</h2>
						<p class="tab-info"><span data-lang="main_2">联网方式：</span><a id="con-type" data-lang="main_3">动态ip</a></p>
						<!--<p class="tab-info none"><span data-lang="main_4">联网状态：</span><a id="con_state" data-lang="main_5">已连接</a></p>-->
						<p class="tab-info" id="checkLink"><a id="con-note"></a></p>
					</div>
				</div>
			</div>
			<div class="contab">
				<a class="tab-jump" data-transition="fade" href="wireless-wisp.asp"> </a>
				<div class="tab-inner">
					<img class="img1" src="img/repeater.png" />
					<div class="tab-left">
						<h2 class="tab-title" data-lang="main_6">信号放大</h2>
						<p class="tab-info single" id="superSsid"> </p>
					</div>
				</div>
			</div>
			<div style="width:50%; display:inline-block;">
				<div class="contab">
					<a class="tab-jump" data-transition="slide" href="wireless.asp"> </a>
					<div class="tab-inner">
						<img class="img" src="img/wireless.png" />
						<div class="tab-left">
							<h2 class="tab-title" data-lang="main_9">无线设置</h2>
							<p class="tab-info w13em"><span data-lang="main_10">无线名称：</span><span id="ssid">yupw</span></p>
							<p class="tab-info w13em"><span data-lang="main_11">无线密码：</span><span id="ssid-pwd">12345678</span></p>
						</div>
					</div>
				</div>
			</div>
			<div style="width:49%; float:right;">
				<div class="contab">
					<a class="tab-jump" data-transition="flip" href="systool.asp"> </a>
					<div class="tab-inner">
						<img class="img" src="img/systemcfg.png" />
						<div class="tab-left">
							<h2 class="tab-title" data-lang="main_7">系统工具</h2>
							<p class="tab-info">&nbsp;</p>
							<p class="tab-info" ><span data-lang="main_8">软件版本：</span><a id="softVer">v6.0</a></p>
						</div>
					</div>
				</div>
				<!--<div class="contab">
					<a class="tab-jump" data-transition="fade" href="client.asp"> </a>
					<div class="tab-inner">
						<img class="img" src="img/net-control.png" />
						<div class="tab-left">
							<h2 class="tab-title" data-lang="main_12">上网管理</h2>
							<p class="tab-info single" data-lang="main_13" id="clients">在线设备数量：3</p>
						</div>
					</div>
				</div>
				<div class="contab">
					<a class="tab-jump" data-transition="flip" href="sys-status.asp"> </a>
					<div class="tab-inner">
						<img class="img" src="img/systemcfg.png" />
						<div class="tab-left">
							<h2 class="tab-title" data-lang="main_14">系统状态</h2>
							<p class="tab-info single" data-lang="main_4">联网状态：<a id="con-state"> </a></p>
						</div>
					</div>
				</div>-->
			</div>
			<hr/>
			<p class="none" data-lang="main_16"> <a rel="external" id="web-pc" href="http://192.168.0.1" data-lang="main_17"></a></p>
		</div>
	</div>
</body>
</html>
