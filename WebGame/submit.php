<?php
include "./functions.php";
include "./dbconnect.php";

$query = mysql_query("select * from `room` where `ID` = '".$_GET[roomid]."'");
$chess = mysql_result($query, 0, chess);

$chess_explode = explode(",", $chess);

for($c = "", $i = 0;$i < sizeof($chess_explode);$i ++)
{
	$new_chess = $chess_explode[$i];
	if($i + 1 == $_GET[from])
	$new_chess = "blank";
	if($i + 1 == $_GET[to])
	{
		if($chess_explode[$i] != "blank")
		$eated = $chess_explode[$i];
		$new_chess = $chess_explode[$_GET[from] - 1];
	}
	
	$c .= $new_chess.",";
}

if($_GET[site] == guest)
$flag = host;
else
$flag = guest;

mysql_query("update `room` set `chess` = '$c', `flag` = '$flag', `moved` = '".$_GET[from].",".$_GET[to]."', `eated` = '$eated' where `ID` = '".$_GET[roomid]."' limit 1");
?>

