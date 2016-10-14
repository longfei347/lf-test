<?php
include "./functions.php";
include "./dbconnect.php";

$query = mysql_query("select * from `room` where `ID` = '".$_GET[roomid]."'");
if(!@mysql_num_rows($query))
die("ended");
$chess = mysql_result($query, 0, chess);
$flag = mysql_result($query, 0, flag);
$moved = mysql_result($query, 0, moved);
$eated = mysql_result($query, 0, eated);
$guest = mysql_result($query, 0, guest);
$host = mysql_result($query, 0, host);
$time_guest = mysql_result($query, 0, time_guest);
$time_host = mysql_result($query, 0, time_host);
$guest_win = mysql_result($query, 0, guest_win);
$host_win = mysql_result($query, 0, host_win);
$message_guest = mysql_result($query, 0, message_guest);
$message_host = mysql_result($query, 0, message_host);

mysql_query("update `room` set `".$_GET[site]."` = '$username', `time_".$_GET[site]."` = '".time()."', `time` = '".time()."' where `ID` = '".$_GET[roomid]."' limit 1");

if(time() - $time_guest > 30)
mysql_query("update `room` set `guest` = '',`message_guest` = '' where `ID` = '".$_GET[roomid]."'");
if(time() - $time_host > 30)
mysql_query("update `room` set `host` = '',`message_host` = '' where `ID` = '".$_GET[roomid]."'");

echo $chess."|".$flag."|".$moved."|".$eated."|".$guest."|".$host."|".$guest_win."|".$host_win."|".$message_guest."|".$message_host;
?>

