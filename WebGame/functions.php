<?php
//行：10 * 列：9
$c .= '007,005,003,001,000,002,004,006,008,blank,blank,blank,blank,blank,blank,blank,blank,blank,blank,009,blank,blank,blank,blank,blank,010,blank,011,blank,012,blank,013,blank,014,blank,015,blank,blank,blank,blank,blank,blank,blank,blank,blank,blank,blank,blank,blank,blank,blank,blank,blank,blank,111,blank,112,blank,113,blank,114,blank,115,blank,109,blank,blank,blank,blank,blank,110,blank,blank,blank,blank,blank,blank,blank,blank,blank,blank,107,105,103,101,100,102,104,106,108';
function GetIP() { //获取IP
global $_SERVER;
   if ($_SERVER["HTTP_X_FORWARDED_FOR"])
      $ip = $_SERVER["HTTP_X_FORWARDED_FOR"];
   else if ($_SERVER["HTTP_CLIENT_IP"])
       $ip = $_SERVER["HTTP_CLIENT_IP"];
   else if (getenv("HTTP_X_FORWARDED_FOR"))
       $ip = getenv("HTTP_X_FORWARDED_FOR");
   else if ($_SERVER["REMOTE_ADDR"])
       $ip = $_SERVER["REMOTE_ADDR"];
   else if (getenv("HTTP_CLIENT_IP"))
       $ip = getenv("HTTP_CLIENT_IP");
   else if (getenv("REMOTE_ADDR"))
       $ip = getenv("REMOTE_ADDR");
   else
       $ip = "Unknown";
   return $ip;
}
?>

