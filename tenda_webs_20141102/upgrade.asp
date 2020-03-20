<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title></title>
<script src="js/jquery-1.9.1.min.js"></script>
<script src="js/lang.js"></script>
<script src="js/common.js"></script>
<script>
var softVer = '<%GetWanStatus("sys", "ver");%>',
	buildTime = '<%GetWanStatus("sys", "buildTime");%>';
function init() {
	var loc = window.location.toString();
	var f = document.forms[0];	
	document.getElementById("sysVer").innerHTML = softVer + "&nbsp;&nbsp;" + buildTime;
	if(loc.indexOf("error") != -1) {
		alert(_("systool_upgradeErr2"));//升级文件有误，请确保文件的正确。
	} else if(loc.indexOf("upgrading") != -1) {
		parent.systool.hideUpgrade();
		setTimeout(function() {
			top.progressStrip(top.location.href.replace('systool.asp', 'main.asp'), 700, _("systool_upgradeNote"));
		}, 50);
	}
	translate();
}

function preSubmit()
{	
	var f = document.forms[0];
	if(f.filename.value == "") {
		alert(_("systool_upgradeErr1"));//请选择升级文件。
		return;	
	}
	f.submit();
}
function preCancel() {
	parent.systool.hideUpgrade();
}
</script>
</head>
<body onLoad="init()">
<form name="frmSetup" method="post" id="system_upgrade" action="/goform/upgrade" enctype="multipart/form-data">
	<table style="width:100%">
        <tr>
        	<td width="100%" data-lang="systool_selectFile">选择固件文件</td>
        </tr>
		<tr>
            <td><input name="filename" type="file"></td>
        </tr>
		<tr>
            <td align="right">
				<button type="button" onClick="preSubmit()" data-lang="systool_upgrade">升级</button>
				<button type="button" onClick="preCancel()" data-lang="common_cancel">取消</button>
			</td>
        </tr>        
        <tr>
        	<td><span data-lang="systool_version">系统版本：</span> <span id="sysVer">V1.0.0.6</span></td>
        </tr>
        <tr>
        	<td style="color:red;" data-lang="systool_upgradeNote2">注意：升级时不能关闭路由器的电源，否则将导致路由器损坏，升级成功后，路由器将自动重启。</td>
        </tr>
    </table>
</form>
</body>
</html>
