<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Q-link</title>
<link rel="stylesheet" href="css/mobile.css">
<link rel="shortcut icon" href="img/favicon.ico">
<script src="js/lang.js"></script>
<script src="js/common.js"></script>
<script>
	//var lanip = "<%aspTendaGetStatus("lan","lanip");%>";
	var lanip = location.host;//'192.168.3.1';

	function init() {
		var url = "http://" + lanip;
		progressStrip(url, 180, _("systool_rebootNote"));
	}
</script>
</head>
<body onLoad="init();">
	<div id="rebooter" data-role="page">
		<div data-theme="c" class="header">
			<img src="img/logo-y.png" class="logo">
		</div>
		<div class="masthead">
			<div class="container head-inner">
				<a class="brand" href="#" title="Tenda"></a>
				<div class="easy-logo"></div>
			</div>
			<div class="footer"></div>
		</div>
	</div>
</body>
</html>
