<?php
include "./functions.php";
include "./dbconnect.php";

$query = mysql_query("select * from `room` where `ID` = '".$_GET[roomid]."'");
if(!@mysql_num_rows($query))
{
	header("location:index.php");
	exit;
}
$guest_win = mysql_result($query, 0, guest_win);
$host_win = mysql_result($query, 0, host_win);

if(($guest_win + $host_win) % 2 != 0)
$flag = host;
else
$flag = guest;

mysql_query("update `room` set `chess` = '$c',`flag` = '$flag',`moved` = '',`eated` = '', `guest_win` = '".$_GET[guest_win]."', `host_win` = '".$_GET[host_win]."' where `ID` = '".$_GET[roomid]."'");
?>

