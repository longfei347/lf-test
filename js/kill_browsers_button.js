// JavaScript Document

    /** 屏蔽F1帮助 */  
    //window.onhelp = function(){return false;} //useless
    /** 
     *屏蔽 F5、Ctrl+N、Shift+F10、Alt+F4 
     *如果想要屏蔽其他键，则找到对应的 keyCode 再依照此方法即可 
    */
	var input=document.getElementsByTagName("input");
	for(var i=0;i<input.length;i++)
		input[i].disabled=true;
    document.onkeydown = function(event){
		
        event = window.event || event; console.log(event.keyCode)  
        if(event.keyCode==116 || (event.ctrlKey && event.keyCode==78) || (event.shiftKey && event.keyCode==121) || (event.altKey && event.keyCode==115)){  
            event.keyCode =0;  
            event.returnvalue = false;  
        }  
    }  
      
    /** 屏蔽鼠标右键 */  
    document.oncontextmenu = function(){return false;}  
      
    //或者
    document.body.onmousedown = function(event){ 
		return false;
        event = window.event || event; 
		console.log(event.button);
		if(event.button == 0)
			event.returnvalue=false;  
        if(document.all && event.button == 2) {  
            event.returnvalue=false;
        }  
    }
    /*document.getElementById("test").onmousedown=function(){
		console.log(arguments[0].button,arguments.length)
	}*/
    /** 
     * 屏蔽"后退"功能(<a href="javascript:replaceLocation('http://www.google.com')" mce_href="javascript:replaceLocation('http://www.google.com')">Google</a>) 
     * @param url 页面要转向的URL 
    */  
    function replaceLocation(url){  
        document.location.replace(url);  
    }  
      
    /** 屏蔽选中网页内容 */  
    document.onselectstart=function(){return false;}  
      
    /** 屏蔽复制网页内容 */  
    document.oncopy = function(){return false;}  
      
    /** 屏蔽剪切网页内容 */  
    document.oncut = function(){return false;}  
      
    /** 屏蔽向网页粘贴内容 */  
    document.onpaste = function(){return false;}  
      
    /** 屏蔽拷屏（不停的清空剪贴板） */  
    //window.setInterval('window.clipboardData("Text", "")', 100);  
      
    /** 
     * 屏蔽查看源文件( <body onload=clear()> ) 
    */  
    function clear() {      
        var source=document.body.firstChild.data;      
        document.open();      
        document.close();      
        document.body.innerHTML = source;      
    }