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
	curMac:'<%GetWanStatus("wan", "mac");%>',
	facMac:'<%GetWanStatus("wan", "defMac");%>',
	hostMac:'<%GetWanStatus("sys", "clientMac");%>',
	"con-state": '<%GetWanStatus("wan", "status");%>',//"0": "未连接","1": "已连接","2": "连接中..."
	"con-type": '<%GetWanStatus("wan", "type");%>',//0:"静态IP", 1:"动态获取", 2:"PPPoE", 3:"3G"
	"mac-wan": '<%GetWanStatus("wan", "mac");%>',
	wanip: '<%GetWanStatus("wan", "ip");%>',
	wanNetMask: '<%GetWanStatus("wan", "mask");%>',
	gateway: '<%GetWanStatus("wan", "gateway");%>',
	dns1: '<%GetWanStatus("wan", "dns1");%>',
	dns2: '<%GetWanStatus("wan", "dns2");%>',
	"sysTime": '<%GetWanStatus("sys", "time");%>',
	softVer: '<%GetWanStatus("sys", "ver");%>',
	pass: '<%nvram_get("Password");%>'
};
</script>
<script src="js/jquery-1.9.1.min.js"></script>
<script src="js/lang.js"></script>
<script src="js/common.js"></script>
<script src="js/systool.js"></script>
</head>
<body>
	<div id="" data-role="page">
		<div data-theme="c" class="header">
			<a class="btn-header-back" rel="external" data-transition="flip" href="main.asp">
				<img src="img/arrow-l.png" class="logo-arrow-l">
			</a>
			<img src="img/logo-y.png" class="logo">
		</div>
		<div data-role="content" class="cbody">
			<button type="button" class="do-btn" onclick="location.href='client.asp'" data-lang="client_manage">客户端管理</button>
			<!--
			<div id="mainTable" style="display: none">
				<table class="netctrl-table-title text-info">
					<tr>
						<td width="50%" data-lang="client_host">主机名称</td>
						<td style="text-align: right; padding-right:40px;"  data-lang="client_net">上网管理</td>
					</tr>
				</table>
				<div class="contab ctrltable">
					<table class="netctrl-table1">
						<tbody>
							<tr>
								<td><div class="hostname">Hostname1</div>
									<span class="tab-info ipaddr">Ip1</span></td>
								<td><a class="allow" data-mac="Mac1"></a><span class="fr mr10">Allow</span></td>
							</tr>
							<tr>
								<td><div class="hostname">hostname2</div>
									<span class="tab-info ipaddr">Ip2</span></td>
								<td><a class="forbid" data-mac="Mac2"></a><span class="fr mr10">Forbid</span></td>
							</tr>
						</tbody>
					</table>
				</div>
				<button type="button" id="submit" class="none do-btn" data-lang="common_save">保  存</button>
			</div>-->
			<form name="rebootfrm" method="POST" action="/goform/SysToolReboot">
				<input type="hidden" name="CMD" value="SYS_CONF">
				<input type="hidden" name="GO" value="direct_reboot.html">
				<input type="hidden" name="CCMD" value=0>
				<button type="button" class="do-btn" id="reboot" data-lang="systool_reboot">重启路由器</button>
			</form>
			<form name="restorefrm" method="POST" action="/goform/SysToolRestoreSet">
				<input type="hidden" name="CMD" value="SYS_CONF">
				<input type="hidden" name="GO" value="direct_reboot.html">
				<input type="hidden" name="CCMD" value=0>
				<button type="button" class="do-btn" id="restore" data-lang="systool_restore">恢复出厂设置</button>
			</form>
			<form name="upgrade">
				<button type="button" class="do-btn" id="upgrade" data-lang="systool_upgrade">固件升级</button>
				<div class="popup in" id="upgradediv" style="display:none">
					<iframe action="/goform/upgrade" enctype="multipart/form-data" src="upgrade.asp" style="width:100%"></iframe>
				</div>
			</form>
			<form name="setpwd">
				<button type="button" class="do-btn" id="set-pwd" data-lang="systool_password">设置登录密码</button>
				<div class="popup in none" id="pwdiv">
					<h3 data-lang="systool_password">设置登录密码</h3>
					<table class="repeat-table">
						<tr>
							<td width="40%" data-lang="systool_oldpwd"></td>
							<td width="60%"><input type="password" placeholder="" name="oldPW" id="oldPW" maxLength="32" /></td>
						</tr>
						<tr>
							<td data-lang="systool_newpwd"></td>
							<td><input type="password" placeholder="" name="newPW" id="newPW" maxLength="32" /></td>
						</tr>
						<tr>
							<td data-lang="systool_newpwd2"></td>
							<td><input type="password" placeholder="" name="ConfirmPW" id="ConfirmPW" maxLength="32" /></td>
						</tr>
					</table>
					<button type="button" class="do-btn" id="set-pwd-cancel" class="button" data-lang="common_cancel">取消</button>
					<button type="button" class="do-btn" id="set-pwd-sure" class="button" data-lang="common_submit">确定</button>
				</div>
			</form>
			<form name="setmac">
				<button type="button" class="do-btn" id="set-mac" data-lang="systool_mac">设置WAN口MAC</button>
				<div class="popup in none" id="macdiv">
					<h3 data-lang="systool_mac">设置WAN口MAC</h3>
					<ul>
						<li style="float:left; width:50%;">
							<input type="text" placeholder="" name="curMac" id="curMac" maxLength="17" />
						</li>
						<li style="float:left; width:50%;">
							<button type="button" id="hostMac" data-lang="systool_macClone">克隆本机MAC</button>
							<button type="button" id="facMac" data-lang="systool_macRestore">恢复出厂MAC</button>
						</li>
					</ul>
					<div style="clear:both;">
					<button type="button" id="set-mac-cancel" data-lang="common_cancel">取消</button>
					<button type="button" id="set-mac-sure" data-lang="common_submit">确定</button></div>
				</div>
			</form>
			<p class="text-info refresh" onClick="location.reload();"><span data-lang="systool_info">联网信息</span> <span id="refreshImg" class="m-refresh"> </span></p>
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
						<label class="tab-label" data-lang="wanset_dns1">首选 DNS 服务器</label>
						<input class="ui-input-text" type="text" readonly id="dns1" value="--"/>
					</li>
					<li>
						<label class="tab-label" data-lang="wanset_dns2">备用 DNS 服务器</label>
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
