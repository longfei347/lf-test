<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Q-link</title>
<link rel="stylesheet" href="css/mobile.css">
<link rel="shortcut icon" href="img/favicon.ico">
<script src="js/jquery-1.9.1.min.js"></script>
<script src="js/lang.js"></script>
<script src="js/common.js"></script>
<script src="js/client.js"></script>
<script>
var qosEnable = '<%nvram_get("qosEnable");%>';
</script>
</head>
<body>
<div id="" data-role="page">
	<div data-theme="c" class="header">
		<a class="btn-header-back" rel="external" data-transition="flip" href="systool.asp">
			<img src="img/arrow-l.png" class="logo-arrow-l">
		</a>
		<img src="img/logo-y.png" class="logo">
	</div>
	<div data-role="content" class="cbody">
		<div class="contab flash">
			<span class="refresh" id="refresh"><span data-lang="client_manage">客户端管理</span>
				<!--<img src="img/refresh.png" class="m-refresh" />-->
				<span id="refreshImg" class="m-refresh"></span>
				</span>
		</div>
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
							<td><select name="" data-mac="Mac2">
									<option value="0">Forbid</option>
									<option value="1">Allow</option>
								</select>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<button type="button" id="submit" class="do-btn" data-lang="common_save">保  存</button>
		</div>
	</div>
</div>
<div class="popup in messagebox none"></div>
<div id="gbx_overlay" style="display:none;"></div>
</body>
</html>
