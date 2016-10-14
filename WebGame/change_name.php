<?php
include "./functions.php";
include "./dbconnect.php";
if($_POST[name] == '')
{
	setcookie(message, 名字不能为空！);
	header("location:index.php");
	exit;
}
if(strlen($_POST[name]) > 25)
{
	setcookie(message, 名字太长了，25个字符以内！);
	header("location:index.php");
	exit;
}
$query = mysql_query("select count(*) as 'num' from `room` where `host` = '".$_POST[name]."' or `guest` = '".$_POST[name]."' limit 1");
if(@mysql_result($query, 0, num))
{
	setcookie(message, 抱赚，这个名字已经有人在使用了！);
	header("location:index.php");
	exit;
}
setcookie(username, str_replace("<", "&lt;", str_replace(">", "&gt;", $_POST[name])));
header("location:index.php");
?>

