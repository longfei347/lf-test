<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Access-Control-Allow-Origin" content="*">
<title>Q-link</title>
<link rel="stylesheet" href="css/mobile.css">
<link rel="shortcut icon" href="img/favicon.ico">
<script>
var data = {
	"link": '<%GetWanStatus("wan", "link");%>',//"0": 未接入,"1": 接入
	"con-state": '<%GetWanStatus("wan", "status");%>',//"0": "未连接","2": "连接中...","1": "已连接"
	"con-type": '<%GetWanStatus("wan", "type");%>',//0:"静态IP", 1:"动态获取", 2:"PPPoE", 3:"3G"
	//"mac-wan": '<%GetWanStatus("wan", "mac");%>',
	'repeat-mode': '<%nvram_get("workMode");%>', // router,3g,wisp ,apclient,ap
	"lan-ip": '<%nvram_get("lanIpAddr");%>',
	wanIpAddr: '<%nvram_get("wanIpAddr");%>',
	wanNetMask: '<%nvram_get("wanNetMask");%>',
	wanGateWay: '<%nvram_get("wanGateWay");%>',
	wanDNS1: '<%nvram_get("wanDNS1");%>',
	wanDNS2: '<%nvram_get("wanDNS2");%>',
	wanMTU: '<%nvram_get("wanMTU");%>',
	wanPppoeUserName: '<%nvram_get("wanPppoeUserName");%>',
	wanPppoePassword: '<%nvram_get("wanPppoePassword");%>',
	wanPppoeMTU: '<%nvram_get("wanPppoeMTU");%>'
};
</script>
<script src="js/jquery-1.9.1.min.js"></script>
<script src="js/wan-set.js"></script>
<script src="js/lang.js"></script>
<script src="js/common.js"></script>
</head>
<body>
<div id="conset" data-role="page">
	<div data-theme="c" class="header"> <a class="btn-header-back" rel="external" data-transition="flip" href="main.asp"> <img src="img/arrow-l.png" class="logo-arrow-l"> </a> <img src="img/logo-y.png" class="logo"> </div>
	<div data-role="content" class="cbody"> 
		<!-- <p class="tab-info">请选择联网方式</p> -->
		<p class="text-info title" data-lang="main_2">联网方式</p>
		<form id="con-form" class="ui-controlgroup-horizontal mid ui-controlgroup">
        	<input type="hidden" name="wanMTU" id="wanMTU">
			<fieldset class="ui-controlgroup-controls radio-group" data-type="horizontal">
				<div class="ui-radio">
					<input type="radio" name="con-type" id="type-adsl" value="2" />
					<label for="type-adsl" class="ui-btn ui-first-child ui-btn-up-c"> <span class="ui-btn-inner"><span class="ui-btn-text" data-lang="main_adsl">ADSL拨号</span></span> </label>
				</div>
				<div class="ui-radio">
					<input type="radio" name="con-type" id="type-dhcp" value="1" />
					<label for="type-dhcp" class="ui-btn ui-btn-up-c"> <span class="ui-btn-inner"><span class="ui-btn-text" data-lang="main_dhcp">动态IP</span></span> </label>
				</div>
				<div class="ui-radio">
					<input type="radio" name="con-type" id="type-static" value="0" />
					<label for="type-static" class="ui-btn ui-last-child ui-btn-up-c"> <span class="ui-btn-inner"><span class="ui-btn-text" data-lang="main_staticIp">静态IP</span></span> </label>
				</div>
			</fieldset>
			<div id="tab-adsl" class="connect-type">
				<div class="text-info mid" data-lang="wanset_1">请使用运营商提供的宽带用户名和宽带密码拨号上网</div>
				<div class="contab fulltab">
					<ul>
						<li class="tab-li-border">
							<label class="tab-label" for="wanPppoeUserName" data-lang="wanset_2">宽带用户名</label>
							<input type="text" class="ui-input-text" name="wanPppoeUserName" id="wanPppoeUserName" maxlength="64" placeholder=""/>
						</li>
						<li>
							<label class="tab-label" for="wanPppoePassword" data-lang="wanset_3">宽带密码</label>
							<input type="text" class="ui-input-text" name="wanPppoePassword" id="wanPppoePassword" maxlength="64" placeholder=""/>
						</li>
						<li>
							<label class="tab-label" for="wanPppoeMTU">MTU</label>
							<input type="text" class="ui-input-text" name="wanPppoeMTU" id="wanPppoeMTU" maxlength="4" />
						</li>
					</ul>
				</div>
			</div>
			<div id="tab-dhcp" class="none connect-type">
				<div class="text-info mid" data-lang="wanset_4">不需要任何配置,电脑自动获取运营商提供的上网信息</div>
                <div class="contab fulltab">
					<ul>
						<li>
							<label class="tab-label" for="dhcpMTU">MTU</label>
							<input type="text" class="ui-input-text" name="dhcpMTU" id="dhcpMTU" maxlength="4" />
						</li>
					</ul>
				</div>
			</div>
			<div id="tab-static" class="none connect-type">
				<div class="text-info mid" data-lang="wanset_5">请使用运营商提供的固定IP地址等信息</div>
				<div class="contab fulltab">
					<ul>
						<li>
							<label class="tab-label" for="wanIpAddr" data-lang="wanset_ip">IP地址</label>
							<input type="text" class="ui-input-text" name="wanIpAddr" id="wanIpAddr" maxlength="15" require placeholder="0.0.0.0"/>
						</li>
						<li>
							<label class="tab-label" for="wanNetMask" data-lang="wanset_subnet">子网掩码</label>
							<input type="text" class="ui-input-text" name="wanNetMask" id="wanNetMask" maxlength="15" require placeholder="0.0.0.0"/>
						</li>
						<li>
							<label class="tab-label" for="wanGateWay" data-lang="wanset_gateway">默认网关</label>
							<input type="text" class="ui-input-text" name="wanGateWay" id="wanGateWay" maxlength="15" require placeholder="0.0.0.0"/>
						</li>
						<li>
							<label class="tab-label" for="wanDNS1" data-lang="wanset_dns1">首选DNS服务器</label>
							<input type="text" class="ui-input-text" name="wanDNS1" id="wanDNS1" maxlength="15" require placeholder="0.0.0.0"/>
						</li>
						<li>
							<label class="tab-label" for="wanDNS2" data-lang="wanset_dns2">备用DNS服务器(可选)</label>
							<input type="text" class="ui-input-text" name="wanDNS2" id="wanDNS2" maxlength="15" placeholder=""/>
						</li>
                        <li>
							<label class="tab-label" for="staticMTU">MTU</label>
							<input type="text" class="ui-input-text" name="staticMTU" id="staticMTU" maxlength="4" />
						</li>
					</ul>
				</div>
			</div>
		</form>
		<div id="connectInfo">
			<label class="con-label" data-lang="main_4">联网状态</label>
			<div id="con-stat"></div>
			<div id="contip"></div>
		</div>
		<button type="button" id="submit" class="do-btn" data-lang="common_save">保  存</button>
		<div class="popup messagebox none" data-lang="common_saving">保存中, 请稍后...</div>
	</div>
</div>
</body>
</html>
