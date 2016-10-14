<?php
if($_GET[action] == install)
{
	if(!@mysql_connect($_POST[server], $_POST[username], $_POST[password]) || !@mysql_select_db($_POST[database])){
	echo "<script>alert('数据连接不成功！');</script>";
	}else{
		$dbconnect_file = file_get_contents("./dbconnect.php");
		$dbconnect_file = preg_replace("/mysql_connect\(\"(.+?)\", \"(.+?)\", \"(.+?)\"\)/is", "mysql_connect(\"".$_POST[server]."\", \"".$_POST[username]."\", \"".$_POST[password]."\")", $dbconnect_file);
		$dbconnect_file = preg_replace("/mysql_select_db\(\"(.+?)\"\)/is", "mysql_select_db(\"".$_POST[database]."\")", $dbconnect_file);
		$fp = @fopen("./dbconnect.php", "wb");
		if(@fwrite($fp, $dbconnect_file) && @fclose($fp))
		{
			$sql_file = file_get_contents("./sql.txt");
			mysql_connect($_POST[server], $_POST[username], $_POST[password]);
			if(@mysql_select_db($_POST[database])){
				@mysql_query("drop table `room`");
				if(mysql_query($sql_file))
				{
					header("location:index.php");
					exit;
				}
				else
				echo "<script>alert('安装失败！');</script>";
			}else{
				echo "<script>alert('数据连接不成功！');</script>";
			}
		}
	}
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>安装程序</title>
</head>

<body>
<form name=form method=post action=install.php?action=install>
<table>
	<tr><td>服务器：</td><td><input type=text name=server value="localhost"></td></tr>
	<tr><td>数据库：</td><td><input type=text name=database></td></tr>
	<tr><td>DB账号：</td><td><input type=text name=username></td></tr>
	<tr><td>DB密码：</td><td><input type=text name=password></td></tr>
	<tr><td colspan=2><input type=submit value=安装></td></tr>
</table>
</form>
</body>
</html>

