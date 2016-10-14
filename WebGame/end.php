<?php
include "./functions.php";
include "./dbconnect.php";

mysql_query("delete from `room` where `ID` = '".$_GET[roomid]."'");
header('location:index.php');
?>

