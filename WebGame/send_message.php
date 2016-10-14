<?php
include "./functions.php";
include "./dbconnect.php";
if($_GET[message])
$_GET[message] = $_GET[message];
mysql_query("update `room` set `message_".$_GET[site]."` = '".$_GET[message]."' where `ID` = '".$_GET[roomid]."'");
?>

