// JavaScript Document
function dd_code(str){
	var re;
	re=/(\[em:)(.*?)(\])/ig
	str=str.replace(re,"<img src=emot/$2.gif border=0>")
	re=/(\[fly\])(.*?)(\[\/fly\])/ig
	str=str.replace(re,"<marquee behavior=alternate width=90% scrollamount=3>$2</marquee>")
	re=/(\[move\])(.*?)(\[\/move\])/ig
	str=str.replace(re,"<marquee scrollamount=3>$2</marquee>") 
	re=/\[glow=*([^\[]*)\](.*?)\[\/glow]/ig
	str=str.replace(re,function($0,$1,$2,$3,$4){var s1=$1.toString(),s2=$2.toString(),s3=$3.toString(),s1_ex=s1.split(",");if(s1_ex.length>1)return("[glow="+s1+"]"+s2+"[/glow]");else return("<div style=\"filter:glow(color="+s1+",strength=5);color:black;height:9pt\">"+s2+"</div>");})
	re=/\[glow=*([^,]*),*([^\[]*)\](.*?)\[\/glow]/ig
	str=str.replace(re,function($0,$1,$2,$3,$4){var s1=$1.toString(),s2=$2.toString(),s3=$3.toString(),s2_ex=s2.split(",");if(s2_ex.length>1)return("[glow="+s1+","+s2+"]"+s3+"[/glow]");else return("<div style=\"filter:glow(color="+s1+",strength="+s2+");color:black;height:9pt\">"+s3+"</div>");})
	re=/\[glow=*([^,]*),*([^,]*),*([^\[]*)\](.*?)\[\/glow]/ig
	str=str.replace(re,"<div style=\"filter:glow(color=$1,strength=$2);color:$3;height:9pt\">$4</div>")
	re=/\[shadow=*([^\[]*)\](.*?)\[\/shadow]/ig
	str=str.replace(re,function($0,$1,$2,$3,$4){var s1=$1.toString(),s2=$2.toString(),s3=$3.toString(),s1_ex=s1.split(",");if(s1_ex.length>1)return("[shadow="+s1+"]"+s2+"[/shadow]");else return("<div style=\"filter:shadow(color="+s1+",strength=5);color:black;height:9pt\">"+s2+"</div>");})
	re=/\[shadow=*([^,]*),*([^\[]*)\](.*?)\[\/shadow]/ig
	str=str.replace(re,function($0,$1,$2,$3,$4){var s1=$1.toString(),s2=$2.toString(),s3=$3.toString(),s2_ex=s2.split(",");if(s2_ex.length>1)return("[shadow="+s1+","+s2+"]"+s3+"[/shadow]");else return("<div style=\"filter:shadow(color="+s1+",strength="+s2+");color:black;height:9pt\">"+s3+"</div>");})
	re=/\[shadow=*([^,]*),*([^,]*),*([^\[]*)\](.*?)\[\/shadow]/ig
	str=str.replace(re,"<div style=\"filter:shadow(color=$1,strength=$2);color:$3;height:9pt\">$4</div>")
	re="[hr]"
	str=str.replace(re,"<hr>")
	re=/(\[url\])(.*?)(\[\/url\])/ig
	str= str.replace(re,"<a href=$2 target=_blank>$2</a>")
	re=/(\[url=(.[^\[]*)\])(.*?)(\[\/url\])/ig
	str= str.replace(re,function($0,$1,$2,$3,$4){var s2=$2.toString(),s3=$3.toString(),s2_ex=s2.split(",");if(s2_ex.length>1)return("[url="+s2+"]"+s3+"[/url]");else return("<a href='"+s2+"' target=_blank>"+s3+"</a>");})
	re=/(\[url=*([^,]*),*([^\[]*)\])(.*?)(\[\/url\])/ig
	str= str.replace(re,function($0,$1,$2,$3,$4){var s2=$2,s3=$3?$3:"超链接",s4=$4;return ("<a href='"+s2+"' title='"+s3+"' target=_blank>"+s4+"</a>");})
	re=/(\[rm=*([0-9]*),*([0-9]*)\])(.*?)(\[\/rm\])/ig
	str=str.replace(re, function($0, $1, $2, $3, $4){var u=$4,w=$2?$2:350,h=$3?$3:60;return("<OBJECT classid=clsid:CFCDAA03-8BE4-11cf-B84B-0020AFBBCCFA class=OBJECT id=RAOCX width="+w+" height="+h+"><PARAM NAME=SRC VALUE='"+u+"'><PARAM NAME=CONSOLE VALUE=Clip1><PARAM NAME=CONTROLS VALUE=imagewindow><PARAM NAME=AUTOSTART VALUE=true></OBJECT><br><OBJECT classid=CLSID:CFCDAA03-8BE4-11CF-B84B-0020AFBBCCFA width="+w+" height=32 id=video2 width=350><PARAM NAME=SRC VALUE='\\1'><PARAM NAME=AUTOSTART VALUE=-1><PARAM NAME=CONTROLS VALUE=controlpanel><PARAM NAME=CONSOLE VALUE=Clip1></OBJECT>");})
	re=/(\[wmp=*([0-9]*),*([0-9]*)\])(.*?)(\[\/wmp\])/ig
	str=str.replace(re, function($0, $1, $2, $3, $4){var u=$4,w=$2?$2:350,h=$3?$3:60;return("<object id=MediaPlayer1 width="+w+" height="+h+" classid=CLSID:22d6f312-b0f6-11d0-94ab-0080c74c7e95 codebase=http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab align=baseline border=0 standby=Loading Microsoft Windows Media Player components... type=application/x-oleobject>    <param name=invokeURLs value=0>    <param name=FileName value='"+u+"'>    <param name=ShowControls value=1>    <param name=ShowPositionControls value=0>    <param name=ShowAudioControls value=1>    <param name=ShowTracker value=1>    <param name=ShowDisplay value=0>    <param name=ShowStatusBar value=1>    <param name=AutoSize value=0>    <param name=ShowGotoBar value=0>    <param name=ShowCaptioning value=0>    <param name=AutoStart value=1>    <param name=PlayCount value=1>    <param name=AnimationAtStart value=0>    <param name=TransparentAtStart value=0>    <param name=AllowScan value=0>    <param name=EnableContextMenu value=1>    <param name=ClickToPlay value=0>    <param name=DefaultFrame value=datawindow>    <embed src='"+u+"' align=baseline border=0 width="+w+" height="+h+"        type=application/x-mplayer2        pluginspage=http://www.microsoft.com/isapi/redir.dll?prd=windows&amp;sbp=mediaplayer&amp;ar=media&amp;sba=plugin&amp;        name=MediaPlayer showcontrols=1 showpositioncontrols=0        showaudiocontrols=1 showtracker=1 showdisplay=0        showstatusbar=1        autosize=0        showgotobar=0 showcaptioning=0 autostart=1 autorewind=0        animationatstart=0 transparentatstart=0 allowscan=1        enablecontextmenu=1 clicktoplay=0         defaultframe=datawindow invokeurls=0></embed></object>");})
	re=/(\[swf=*([0-9]*),*([0-9]*)\])(.*?)(\[\/swf\])/ig
	str=str.replace(re, function($0, $1, $2, $3, $4){var u=$4,w=$2?$2:500,h=$3?$3:500;return('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="'+w+'" height="'+h+'">  <param name="movie" value="'+u+'" />  <param name="quality" value="high" />  <embed src="'+u+'" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="'+w+'" height="'+h+'"></embed></object>');})
	re=/(\[flash=*([0-9]*),*([0-9]*)\])(.*?)(\[\/flash\])/ig
	str=str.replace(re, function($0, $1, $2, $3, $4){var u=$4,w=$2?$2:500,h=$3?$3:500;return('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="'+w+'" height="'+h+'">  <param name="movie" value="'+u+'" />  <param name="quality" value="high" />  <embed src="'+u+'" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="'+w+'" height="'+h+'"></embed></object>');})
	re="[hr]"
	str=str.replace(re,"<hr>")
	re=/\[img\](.+?)\[\/img\]/ig
	str=str.replace(re,"<img src=$1 border=0 onload=\"javascript:if(this.width>screen.width-333)this.width=screen.width-333\" galleryImg=no>")
	re=/(\[font=(.[^\[]*)\])(.*?)(\[\/font\])/ig
	str=str.replace(re,"<span style=\"font-family: $2\">$3</span>")
	re=/(\[font=(.[^\[]*)\])(.*?)(\[\/font\])/ig
	str=str.replace(re,"$3")
	re=/(\[color=(.[^\[]*)\])(.*?)(\[\/color\])/ig
	str=str.replace(re,"<font color=$2>$3</font>")
	re=/(\[color=(.[^\[]*)\])(.*?)(\[\/color\])/ig
	str=str.replace(re,"$3")
	re=/(\[i\])(.*?)(\[\/i\])/ig
	str=str.replace(re,"<i>$2</i>")
	re=/(\[i\])/ig
	str=str.replace(re,"")
	re=/(\[\/i\])/ig
	str=str.replace(re,"")
	re=/(\[u\])(.*?)(\[\/u\])/ig
	str=str.replace(re,"<u>$2</u>")
	re=/(\[u\])/ig
	str=str.replace(re,"")
	re=/(\[\/u\])/ig
	str=str.replace(re,"")
	re=/(\[b\])(.*?)(\[\/b\])/ig
	str=str.replace(re,"<b>$2</b>")
	re=/(\[b\])/ig
	str=str.replace(re,"")
	re=/(\[\/b\])/ig
	str=str.replace(re,"")
	re=/(\[del\])(.*?)(\[\/del\])/ig
	str=str.replace(re,"<del>$2</del>")
	re=/(\[del\])/ig
	str=str.replace(re,"")
	re=/(\[\/del\])/ig
	str=str.replace(re,"")
	re=/(\[sup\])(.*?)(\[\/sup\])/ig
	str=str.replace(re,"<sup>$2</sup>")
	re=/(\[sup\])/ig
	str=str.replace(re,"")
	re=/(\[\/sup\])/ig
	str=str.replace(re,"")
	re=/(\[sub\])(.*?)(\[\/sub\])/ig
	str=str.replace(re,"<sub>$2</sub>")
	re=/(\[sub\])/ig
	str=str.replace(re,"")
	re=/(\[\/sub\])/ig
	str=str.replace(re,"")
	re=/(\[size=(.[^\[]*)\])(.*?)(\[\/size\])/ig
	str=str.replace(re,"<font size=$2>$3</font>")
	re=/(\[size=(.[^\[]*)\])(.*?)(\[\/size\])/ig
	str=str.replace(re,"$3")
	re=/(\[center\])(.*?)(\[\/center\])/ig
	str=str.replace(re,"<center>$2</center>")
	re=/(\[center\])(.*?)(\[\/center\])/ig
	str=str.replace(re,"$2")
	str=str.replace("\n","<br>");
	str=str.replace("共产党","**");
	str=str.replace("江泽民","**");
	str=str.replace("胡锦涛","**");
	str=str.replace("温家宝","**");
	str=str.replace("贾庆林","**");
	str=str.replace("台独","**");
	str=str.replace("法轮功","**");
	str=str.replace("我日","**");
	str=str.replace("我操","**");
	str=str.replace("fuck","**");
	str=str.replace("shit","**");
	str=str.replace("性交","**");
	str=str.replace("做爱","**");
	str=str.replace("make love","**");
	str=str.replace("made love","**");
return(str);
}
function remove_dd_l(str)
{
 str=str.replace(/&nbsp;/ig," ");
 str=str.replace(/<br>/ig,"\n");
 return str;
}