<?php
ob_start(); 
mysql_connect("localhost", "root", "admin");
mysql_query("set names 'gb2312'");
if(!@mysql_select_db("chess"))
{
	header("location:install.php");
	exit;
}
if(isset($_COOKIE[username]))
$username = $_COOKIE[username];
else
$username = GetIP();

header('Content-Type:text/html;charset=GB2312');
?>

