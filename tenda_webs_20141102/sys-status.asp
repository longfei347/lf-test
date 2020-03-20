<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Access-Control-Allow-Origin" content="*">
<title>Q-link</title>
<link rel="stylesheet" href="css/mobile.css">
<link rel="shortcut icon" href="img/favicon.ico">
<script src="js/jquery-1.9.1.min.js"></script>
<script src="js/lang.js"></script>
<script src="js/common.js"></script>
<script>
var data = {
	"con-state": '<%GetWanStatus("wan", "status");%>',//"0": "未连接","1": "已连接","2": "连接中..."
	"con-type": '<%GetWanStatus("wan", "type");%>',//0:"静态IP", 1:"动态获取", 2:"PPPoE", 3:"3G"
	"mac-wan": '<%GetWanStatus("wan", "mac");%>',
	wanip: '<%GetWanStatus("wan", "ip");%>',
	wanNetMask: '<%GetWanStatus("wan", "mask");%>',
	gateway: '<%GetWanStatus("wan", "gateway");%>',
	dns1: '<%GetWanStatus("wan", "dns1");%>',
	dns2: '<%GetWanStatus("wan", "dns2");%>',
	"sysTime": '<%GetWanStatus("sys", "time");%>',
	softVer: "<%GetWanStatus("sys", "ver");%>",
	pass: '<%nvram_get("Password");%>'
};
var systool = {
	data: {},
		
	getData: function() {
		this.data = data;
		var conState = {
				"0": _("main_disconnected"),//"未连接"
				"1": _("main_connected"),//"已连接"
				"2": _("main_connecting")//"连接中"
			},
			conType = {
				"0": _("main_staticIp"),//"静态IP"
				"1": _("main_dhcp"),//"动态IP"
				"2": _("main_adsl")//"ADSL拨号"
			};
		if (this.data['con-state'] == '0') {
			$('#con-state').removeClass('text-success text-info');
			$('#con-state').addClass('text-error');
		} else if(this.data['con-state'] == '1') {
			$('#con-state').removeClass('text-error text-info');
			$('#con-state').addClass('text-success');
		} else {
			$('#con-state').removeClass('text-success text-error');
			$('#con-state').addClass('text-info');
		}
		data['con-state'] = conState[data['con-state']];
		data['con-type'] = conType[data['con-type']];
		this.initView();
	},
	
	initView: function() {
		var id,
			elem;
		for(id in this.data) {
			if(this.data.hasOwnProperty(id) && (elem = document.getElementById(id))) {
				elem.value = this.data[id];
			}
		}
		translate();
	}
}
$(function() {
	systool.getData();
});
</script>
</head>
<body>
	<div id="login" data-role="page">
		<div data-theme="c" class="header">
			<a class="btn-header-back" rel="external" data-transition="flip" href="main.asp">
				<img src="img/arrow-l.png" class="logo-arrow-l">
			</a>
			<img src="img/logo-y.png" class="logo">
		</div>
		<div data-role="content" class="cbody">
			<p class="text-info refresh title" onClick="location.reload();" data-lang="systool_info">联网信息 <img src="img/refresh.png" class="m-loading" /></p>
			<div class="contab tooltab">
				<ul>
					<li>
						<label class="tab-label" data-lang="systool_conState">连接状态</label>
						<input class="text-success ui-input-text" readonly type="text" id="con-state" value="--"/>
					</li>
					<li>
						<label class="tab-label" data-lang="systool_conType">联网方式</label>
						<input class="ui-input-text" type="text" readonly id="con-type" value="--"/>
					</li>
					<li>
						<label class="tab-label">WAN MAC</label>
						<input class="ui-input-text" type="text" readonly id="mac-wan" value="--"/>
					</li>
					<li>
						<label class="tab-label">WAN IP</label>
						<input class="ui-input-text" type="text" readonly id="wanip" value="--"/>
					</li>
					<li>
						<label class="tab-label" data-lang="wanset_subnet">子网掩码</label>
						<input class="ui-input-text" type="text" readonly id="wanNetMask" value="--"/>
					</li>
					<li>
						<label class="tab-label" data-lang="wanset_gateway">默认网关</label>
						<input class="ui-input-text" type="text" readonly id="gateway" value="--"/>
					</li>
					<li>
						<label class="tab-label" data-lang="wanset_dsn1">首选 DNS 服务器</label>
						<input class="ui-input-text" type="text" readonly id="dns1" value="--"/>
					</li>
					<li>
						<label class="tab-label" data-lang="wanset_dsn2">备用 DNS 服务器</label>
						<input class="ui-input-text" type="text" readonly id="dns2" value="--"/>
					</li>
					<li>
						<label class="tab-label" data-lang="systool_time">系统时间</label>
						<input class="ui-input-text" type="text" readonly id="sysTime" value="--"/>
					</li>
					<li>
						<label class="tab-label" data-lang="systool_version">系统版本</label>
						<input class="ui-input-text" type="text" readonly id="softVer" value="--"/>
					</li>
				</ul>
			</div>
		</div>
	</div>
	<div class="popup in messagebox none"></div>
	<div id="gbx_overlay" class="none"></div>
</body>
</html>
