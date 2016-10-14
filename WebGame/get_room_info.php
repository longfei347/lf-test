<?php
include "./functions.php";
include "./dbconnect.php";

$query = mysql_query("select * from `room`");
$num = mysql_num_rows($query);
if($num){
echo "<table>";
	for($i = 0;$i < $num;$i ++)
	{
	$ID = mysql_result($query, $i, ID);
	$name = mysql_result($query, $i, name);
	$host = mysql_result($query, $i, host);
	$guest = mysql_result($query, $i, guest);
	$room_sum = 0;
	if($host)
	$room_sum ++;
	if($guest)
	$room_sum ++;
	echo "<tr><td valign=middle><img src=dot.gif />".$name."（".$room_sum."人/2）[<a href=room.php?id=".$ID.">进入房间</a>]</td></tr>";
	}
	echo "</table>";
}else
	echo 当前没有人在线。;
?>

