/**
 * @module jsbridge qzone独立版webapp插件中用于js和native code通信
 */
(function(){

	var __QZAppExternal = window.__QZAppExternal = window.QZAppExternal || {getCommands: function(){}};
	var QZAppExternal = window.QZAppExternal = {};
	var androidGetCmdTimer;
	var cbFnId = 0;
	
	//os
	var ua = navigator.userAgent;
	var isQzone = ua.match(/qzone/i);
	var android = ua.match(/(Android)[\s\/]+([\d.]+)/);
	var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
	var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
	var ipod = !ipad && !iphone && ua.match(/(iPod).*OS\s([\d_]+)/);
	var ie = ua.match(/(MSIE)\s([\d.]+)/);
	var os = {}, util = {}, event = {};

	var hasNotify = false;
	try{
		window.external.notify('');
		hasNotify = true;
	}catch(e){}

	if(ie && hasNotify){
		os.ie = true, os.version = ie[2];
	}else if (android) {
		os.android = true, os.version = android[2];
	}else if (iphone) {
		os.ios = os.iphone = true, os.version = iphone[2].replace(/_/g, '.');
	}else if (ipad) {
		os.ios = os.ipad = true, os.version = ipad[2].replace(/_/g, '.');
	}else if (ipod) {
		os.ios = os.ipod = true, os.version = ipod[2].replace(/_/g, '.');
	}
	
	//event
	event = {
		fireEvent: function(type, data){
			var e = document.createEvent("Events");
			e.initEvent(type, false, false);
			e.data = data;
			document.dispatchEvent(e);
		}
	};
	
	//util
	util = {
	
		/**
		 * @method isFn 是否为函数
		 * @param {Object} fn
		 */
		isFn: function(fn){
			return typeof fn === 'function';
		},
		
		/**
		 * @method execFn 执行函数
		 * @param {Object} fn
		 * @param {Object} data
		 */
		execFn: function(fn, data){
			if (QZAppExternal._util.isFn(fn)) {
				return fn.call(window, data);
			}
			else if(typeof fn === 'string'){
				if (/\./.test(fn)) {
					var fnNameArr = fn.split('.');
					var tmp = window;
					var fnNameStr = 'window';
					for(var i = 0, l = fnNameArr.length; i < l; i++){
						var cur = fnNameArr[i];
						tmp = tmp[cur];
						fnNameStr += '[\"' + cur + '\"]';
					}
					if(tmp){
						/** notice: java对象可以赋值给js变量;但是java对象的方法和属性,不能赋值给到js变量,必须是直接调用 */
						//java handler
						if(fn.indexOf('__') === 0){
							return eval(fnNameStr + '(' + data + ');');
						}
						//js handler
						else {
						return tmp.call(window, data);
						}
					}
				}
				else {
					return window[fn].call(window, data);
				}
			}
		},
		log : function(msg){
		    window.console && window.console.log && window.console.log(msg);
		},
		/**
		 * @method parseData json string解析为json object
		 * @param {JSON String} data
		 */
		parseData: function(data){
			try {
				if (location.href.indexOf("/widget/mobile/test/index.html") != -1) {
					console.log(data);
				};
				data = JSON.parse(data);
			}
			catch(e){
				data = {
					code: '1001',
					message: 'json parse error',
					data: {}
				};
			}
			return data;
		},
		
		/**
		 * @method requestWithIframe 通过iframe发送请求
		 * @param url {String} 请求地址
		 */
		requestWithIframe: function(url){

			//iframe替代方案
			if(window.CONSOLE_AVAILABLE){
				console.log(url);
				return;
			}else if(window.PROMPT_AVAILABLE){
				//prompt("USE_PROMPT_CONNECT",url);
				//return;
			}

			var tmpIframe = document.createElement('iframe');
			tmpIframe.setAttribute('width', 0);
			tmpIframe.setAttribute('height', 0);
			tmpIframe.setAttribute('style', 'display: none;');
			document.body.appendChild(tmpIframe);
			tmpIframe.src = url;
			//清理
			setTimeout(function(){
				document.body.removeChild(tmpIframe);
				androidIframe = null;
			}, 1000); //一般机器setTimeout 0即可,兼容低端机延时1s
		}
	};
	
	/**
	 * jsbridge私有api
	 */
	QZAppExternal._os = os;
	QZAppExternal._event = event;
	QZAppExternal._util = util;
	
	//iOS下面wkwebview使用的方式
	var wkPostMessage = function(cmd){
		var messageHandlers;
		if(window.webkit && (messageHandlers = window.webkit.messageHandlers) && messageHandlers.qzoneBridge && messageHandlers.qzoneBridge.postMessage) {
			messageHandlers.qzoneBridge.postMessage(typeof(cmd) == 'string' ? cmd : JSON.stringify(cmd));
			return true;
		}
		return false;
	};
	QZAppExternal.wkPostMessage = wkPostMessage;
	

	    //新的android iframe src schema协议
		/**
		 * js和native code通信接口定义
		 */
		QZAppExternal.domReady = false;
		
		//需要执行的native fn队列
		QZAppExternal.cmdsQuene = [];
		
		/**
		 * 获取需要执行的native fn队列
		 */
		QZAppExternal.getCommands = function(){
			var cmds = '';
			if (QZAppExternal.domReady && QZAppExternal.cmdsQuene.length > 0) {
				if(QZAppExternal._os.android){
					cmds = JSON.stringify(QZAppExternal.cmdsQuene.shift());
					while(cmds.length < 10*1000 && QZAppExternal.cmdsQuene.length){
						cmds += ',' + JSON.stringify(QZAppExternal.cmdsQuene.shift());
					}
					QZAppExternal._util.requestWithIframe('jsbridge://' + encodeURIComponent('['+cmds+']'));
					if(QZAppExternal.cmdsQuene.length){
						setTimeout(QZAppExternal.getCommands, 200);
					}
				}else{
					cmds = JSON.stringify(QZAppExternal.cmdsQuene);
					QZAppExternal.cmdsQuene.length = 0;
				}
			}
			return cmds;
		};

		/**
		 * @method 执行native fn(其实是push到native fn队列)
		 * @param {Object} fnName 需要执行的函数名
		 * @param {Object} params 需要执行的函数所需的参数
		 */
		QZAppExternal.exec = function(fnName, params, cbFn){
			var cbFnName = cbFn ? 'cbFn' + (++cbFnId) : '';
			var cmd = ['QZAppExternal.' + fnName, params, cbFn ? 'QZAppExternal.' + fnName + '.'+ cbFnName : ''];
			if(cbFn){
			    QZAppExternal[fnName] = QZAppExternal[fnName] || {};
				QZAppExternal[fnName][cbFnName] = function(data){
					if(typeof data === 'string'){
						data = QZAppExternal._util.parseData(data);
					}
					var ___persist___ = false;
					if(data && data.data){
						___persist___ =data.data.___persist___;
                    	delete data.data.___persist___;
					}
					QZAppExternal._util.execFn(cbFn, data);
					if(!___persist___){
						QZAppExternal[fnName][cbFnName] = function(){};
					}
				};
			}
			if (QZAppExternal._os.android) {
				QZAppExternal.cmdsQuene.push(cmd);
			/*	if(androidGetCmdTimer) {
					clearTimeout(androidGetCmdTimer);
				}
				androidGetCmdTimer = setTimeout(function(){
					QZAppExternal.getCommands();
				}, 200);*/
				//仅在当前命令是第一个命令时启动定时器，数量不为1，说明已进入自调用循环
				if(QZAppExternal.cmdsQuene.length == 1){
					androidGetCmdTimer = setTimeout(function(){
						QZAppExternal.getCommands();
					}, 200);  //这里强制延迟200ms，可能存在上一个命令刚刚执行完毕的情况
				}
			}
			else if(QZAppExternal._os.ios){
				if(!wkPostMessage(cmd)){
					QZAppExternal.cmdsQuene.push(cmd);
				}
			}else if(QZAppExternal._os.ie){
				window.external.notify(JSON.stringify(cmd));
			}
		};
		
		/**
		 * 新增公共app接口
		 * @param {Object} fnName
		 */
		QZAppExternal._addInterface = function(fnName, opts){
			QZAppExternal[fnName] = QZAppExternal[fnName] ||
			function(cbFn, params){
				var cbFnName = 'cbFn' + Math.floor((Math.random() * 1000000));
				//参数兼容
				if (typeof cbFn === 'object' && !params) {
					params = cbFn;
					cbFn = null;
				}
				QZAppExternal.exec(fnName, params, cbFn);
			};
		};
	
	
	
	/* 公共app接口定义,所有api均定义为异步,公共app接口必须通过QZAppExternal._addInterface私有方法添加 */
	/**
	 * @method getQUA 获取独立版版本信息
	 * @return {JSONtring}
	 */
	QZAppExternal._addInterface('getQUA');
	//因getQUA接口提供数据为string使用不便,单独封装一层返回array
	/**
	 * @method getQUA2 获取独立版版本信息
	 * @return {JSON string} 返回的qua为数组,依次是[qua版本, 平台信息AND/IPH, 业务QZ/PY, 主版本号, 编译版本号, 渠道编号, B主线]
	 */
	QZAppExternal.getQUAEx = (function(){
		var quaArr = [];
		return function(cbFn){
			if(QZAppExternal._util.isFn(cbFn)){
				if(quaArr.length){
					cbFn({
						code: 0,
						message: 'success',
						data: quaArr
					});
				}
				else {
					QZAppExternal.getQUA(function(data){
						if(data && data.data){
							quaArr = data.data.split('_');
							cbFn({
								code: 0,
								message: 'success',
								data: quaArr
							});
						}
						else {
							cbFn(data);
						}
					});
				}
			}
		};
	})();
	
	/**
	 * @method getUserInfo获取当前登录者信息
	 * @return {JSON string}
	 *			uin {Number} QQ帐号
	 *			nick {String} 昵称
	 *			viptype {Number} [0|1|2] 分别对应非黄钻、黄钻、豪华黄钻
	 *			viplevel {Number} 黄钻等级
	 */
	QZAppExternal._addInterface('getUserInfo');
	
	/**
	 * @method getUserConn获取用户网络信息
	 * @return { JSON String} [unknown|2g|3g|wifi|weakwifi|strongwifi]
	 */
	QZAppExternal._addInterface('getConn');
	/**
	 * @method refresh 通知刷新某个页面
	 * @return {void}
	 */
	QZAppExternal._addInterface('refresh');

	/**
	 ?* @method data webapp处理完成,并将处理结果分段返回给独立版
	 ?* @param {JSON object}
	 * key {String} {Optional} 传递内容的标示符
	 * total {Int} {Optional} 传递内容的片段总数
	 * current {Int} {Optional} 当前传递的片段序号，从0开始
	 * type {String} {Optional} 内容的格式，可选{base64|text|url|json}，默认base64
	 ?* content {String} 传递的内容本体
	 ?* @return {void}
	 ?*/
	QZAppExternal._addInterface('data');

	var _sendData = QZAppExternal.data;

	//对外的接口
	QZAppExternal.data = (function(){
		var seg = 100*1000;
		return function(obj){
			//自动分片
			if(obj.total == 0){
				if(obj.content.length > seg){
					var end = seg;
					var len = obj.content.length;
					var total = Math.ceil(len / seg);
					var idx = 0;
					while(idx < total){
						_sendData({
							key: obj.key,
							total: total,
							current: idx,
							type: obj.type,
							content: obj.content.substring(idx*seg, end < len ? end : len),
							params: obj.params
						});
						idx++;
						end += seg;
					}
				}else{
					obj.total = 1;
					obj.current = 0;  //把参数改成正确的值
					_sendData(obj);
				}
			}else{
				_sendData(obj);
			}
		};
	})(),

	/**
	 ?* @method call 调用独立版功能
	 ?* @param {JSON object}
	 * type {String} 菜单选项
	 *   camera 是指使相机（含水印相机）
	 *   album 是指系统相册
	 *   qzonephoto 是指空间相册
	 *   location 是指获取地理位置
	 *   showMenu 是指呼起系统菜单
	 *   operation 是指UGC操作
	 * subtype {String} {Optional} 子类型
	 * key {String} 透传key
	 * params {JSON object} 附加参数
	 ?* @return {void}
	 ?*/
	QZAppExternal._addInterface('call');

	/**
	 * @method finish webapp处理完成,并将处理结果以参数返回给app
	 * @param {JSON object}
	 * 		base64 {String} 图片数据
	 * @return {void}
	 */
	QZAppExternal._addInterface('finish');
	
	/**
	 * setOrientation
	 * 设置屏幕方向
	 * @params {Number} 0是垂直方向，1是横向，其它值是读配置，如果游戏没配置则与手机屏幕同步
	 */
	QZAppExternal._addInterface('setOrientation');
	
	QZAppExternal.setOrientationEx = function(isVertical){
		QZAppExternal.setOrientation({isVertical:isVertical});
	}
	
	var _finish = QZAppExternal.finish;
	/**
	 * @method finish webapp处理完成,并将处理结果以参数返回给app
	 * @param {JSON object}
	 * 		base64 {String} 图片数据
	 * @return {void}
	 */
	QZAppExternal.finish = function(obj){
		QZAppExternal.getQUAEx(function(data){
			if(!data.data || !data.data[3] || parseFloat(data.data[3]) < 4.5){
				_finish(obj);
			}else{
				QZAppExternal.data({
					key:'finish_object',
					total:0,
					type:'base64',
					content:obj.base64
				});
				//删数据，加key，剩下的透传给call
				delete obj.base64;
				obj.photos = ['finish_object'];
				QZAppExternal.call({
					key:'add_mood',
					type:'operation',
					subtype: 'mood',
					params: obj
				});
			}
		});
	};

	/**
	 * 音乐相关接口
	 */
	QZAppExternal._addInterface('qzoneMusic');

	/**
	 * 购买各种vip
	 */
	QZAppExternal._addInterface('qzoneBuyVip');

	/**
	 * @method openVip 去到开通黄钻页面
	 * @param {JSON object}
	 * 		aid {String} 由产品申请的支付id
	 * 		payType {String}
	 * 			xxjzgw 是指定开黄钻
 				xxjzghh 是指定开豪华版黄钻
	 * @return {void}
	 */
	QZAppExternal._addInterface('openVip');
	
	/**
	 * @method closeWebview 关闭webview视图
	 * @return {void}
	 */
	QZAppExternal._addInterface('closeWebview');
	
	/**
	 * @method callSchema 呼起schema协议
	 * @param {JSON Object} opts
	 * 		url	{String} schema地址
	 */
	QZAppExternal._addInterface('callSchema');
	QZAppExternal._addInterface('setTopbar');
	/**
	 * @method getLocation 获得gps坐标
	 * @param {Function} callback(Object evt)
	 *    Number evt.code 0:成功; -1: 失败
	 *    Number evt.data.latitude
	 *    Number evt.data.longitude
	 *    Object evt.data.status 传感器状

	 */
	QZAppExternal._addInterface("getLocation");

	/**
	 * @method startAccelerometer 开始监听重力感应数据
	 * @params {Function}  callback(Object evt)
	 *  Boolean evt.code 是否成功启动传感器
	 *  Number evt.data.x
	 *  Number evt.data.y
	 *  Number evt.data.z
	 */
    QZAppExternal._addInterface("startAccelerometer");
    /**
	 * @method startAccelerometer 停止监听重力感应数据
	 */
    QZAppExternal._addInterface("stopAccelerometer");
	/**
	 * @method getDeviceInfo 获取设备信息
	 */
    QZAppExternal._addInterface("getDeviceInfo");
    QZAppExternal._addInterface("vibrate");
    QZAppExternal._addInterface("preloadSound");
    QZAppExternal._addInterface("playLocalSound");
    QZAppExternal._addInterface("playLocalBackSound");
    QZAppExternal._addInterface("stopSound");
    QZAppExternal._addInterface("stopBackSound");
    QZAppExternal._addInterface("reportScore");
    QZAppExternal._addInterface("loadgame");
	QZAppExternal._addInterface("isAppInstallIOS");
	QZAppExternal._addInterface("httpProxy");
	QZAppExternal._addInterface("setShare");
	QZAppExternal._addInterface("registerCallback");
	QZAppExternal._addInterface("webviewConsole");
	QZAppExternal._addInterface("sendShortcut");
	function AndroidAppApiExec(cmd,data,callback){
		if(QZAppExternal.appApi){
			data = data || {};
			data.type = cmd;
			QZAppExternal.appApi(callback,data);
		}
	}
	
	/**
	  * app install state check
	  */
	QZAppExternal.isAppInstall=function(packageName,callback){
		if(QZAppExternal._os.android){
			AndroidAppApiExec('isAppInstall',{packageName:packageName},callback);
		}
		if(QZAppExternal._os.ios){
			QZAppExternal.isAppInstallIOS(callback,{
				'schema':packageName
			});
		}
	}

	/**
	*	get the download task's state
	*   callback param:
	*	{
	*		state:4,  	//1等待中，2下载中，3暂停，4成功，5失败，6任务已删除
			path:"", 	//本地路径，
			progress:25, //例如25，表示进度是25%了
			url:""		//本次数据指示的任务的url
		}
	*/
	QZAppExternal.getAppState=function(url,callback){
		AndroidAppApiExec('getDownloadState',{url:url},callback);
	}
	
	/**
	*	when app is downloading,system will fire APP_DOWNLOAD_STATE_CHANGE
	*	event when downloading task's state was changed
	*   APP_DOWNLOAD_PROGERSS_CHANGE param:
	*	{
			progress:25, //例如25，表示进度是25%了
			url:""		//本次数据指示的任务的url
		}
		APP_DOWNLOAD_STATE_CHANGE param:
		{
	*		state:4,  	//1等待中，2下载中，3暂停，4成功，5失败，6任务已删除
			url:""		//本次数据指示的任务的url
		}
		
		EVENT_APP_DOWNLOAD_INVALID param:
		{
			url:""		//本次数据指示的任务的url
		}
	*/
	QZAppExternal.listenDownloadState = function(){
		AndroidAppApiExec('listenDownloadState');
	}
	
	QZAppExternal.cancelListenDownloadState = function(){
		AndroidAppApiExec('cancelListenDownloadState');
	}
	
	QZAppExternal.startDownloadApp=function(data){
		if(typeof data == "string"){
			AndroidAppApiExec('startDownload',{url:data});
		}else{
			AndroidAppApiExec('startDownload',data);
		}
		
	}
	QZAppExternal.installApp=function(path,callback){
		AndroidAppApiExec('installApp',{path:path},callback);
	}
	
	/**
	  * pause a download task
	  */
	QZAppExternal.pauseDownloadApp=function(url){
		AndroidAppApiExec('pauseDownload',{url:url});
	}
	/**
	 *	cancel a download task
	 */
	QZAppExternal.cancelDownloadApp=function(url){
		AndroidAppApiExec('cancelDownload',{url:url});
	}
	
	
	/**
	 * @method getPageVisibility 页面是否可见
	 * @param {Function} callback(Object evt)
     *  {Object} evt.data
     *           evt.data  true可见 false不可见
	 */
    QZAppExternal._addInterface("getPageVisibility");
	/* 
	 * 公共js接口定义,需要使用的公共js接口直接在这里定义
	 */
	/**
	 * @method submit 从app里触发web页面事件
	 * @param
	 * 		type {String} 事件类型 
	 * 		data {json String} 事件所需数据
	 * @return {void}
	 */
	QZAppExternal.fireEvent = function(params){
		if(typeof params === 'string'){
			params = QZAppExternal._util.parseData(params);
		}
		var type = params.type;
		var data = params.data;
		if(type){
			QZAppExternal._event.fireEvent(type, data);
		}
	};
	/**
	 * @return platfrom 1 andriod手空  2 ios手空   3 触屏版 
	 */
	QZAppExternal.getPlatform = function(){
        if(isQzone && android){
            return 1;
        }else if(isQzone && (ipad || iphone || ipod)){
            return 2;
        }else{
            return 3;
        }
    };
    
    var loadFns = [];
    var whenWindowReady = function(){
        for(var i = 0, len = loadFns.length; i < len; i++){
            loadFns[i].apply(window);
        }
    };
	/**
     * onload接口
     */
    QZAppExternal.ready = function(fn){
        if(typeof(fn) == "function"){
            if(QZAppExternal.domReady){
                fn.apply(window);
            }else{
                loadFns.push(fn);
            }
        }
    };
	QZAppExternal._addInterface('qzoneGameBar');
	QZAppExternal._addInterface('sendFeedback');
	
	if(QZAppExternal._os.android){
		QZAppExternal._addInterface('appApi');
	}
	
	
	//微社区相关接口
	var bbsFrame;
	QZAppExternal.openBBS = function(url){
	   bbsFrame = null;
	   if(!url){
	       return false;
	   }
	   bbsFrame = document.createElement('iframe');
	   bbsFrame.style.cssText = "width:100%;height:100%;position:absolute;left:0px;top:0px;background-color:white;z-index:99999;border:none;";
	   bbsFrame.src = url + "&_close=true";
	   document.body.appendChild(bbsFrame);
	};
    window.addEventListener('message', function(e){
        var c = e && e.data;
        if(c == 'close' && bbsFrame && bbsFrame.parentNode){
            bbsFrame.parentNode.removeChild(bbsFrame);
        }
    }, false);

	//检测dom ready,定时检查方法
    (function() {
        if ('loaded|complete|interactive'.indexOf(document.readyState) == -1) {
            setTimeout(arguments.callee, 50);
        } else {
            QZAppExternal.domReady = true;
            if (QZAppExternal._os.android) {
                QZAppExternal.getCommands();
            }
            whenWindowReady();
        }
    })();
    
    //返回码上报
    QZAppExternal.report = function() {
    	var self = this;
		
    };

    //字符串上报
    QZAppExternal.report.string = (function () {
		/** 
		*  @example
			StringReport({
				gameid:'app1101808733',	//填游戏id
				string: '用户的openid, 昵称, 设备, ip, 网络xxoo'	 //填要上报的信息，整合到一个字符串，用分隔符分开，方便查看就行
			});
		 * @param arg {Object} 配置参数：
				gameid {String} 游戏的appid
				string {String} 你需要上报的字符串信息，任意字符串都行
				//以下都是选填
				locuin , //当前用户uin
				touin , //目标uin
				deviceinfo ,  //device info
				dnstime , // dns耗时，可为0
				httptime ,// 可为0
				tcptime ,// 可为0
				os , //操作系统
				sdkversion , //系统版本
				sdkid , // 系统id
				device , //设备
				releaseversion , //版本号
		 */
		var StringReport = function (arg) {
			var tmp = {
				commandid : 'app' + arg.gameid,  //自己的appid
				appid : '1000019',	//统一上报id，不要改
				frequency : 3,	 //不用改
				dtype : 1,	//不用改
				odetails : arg.string
			};
			var report = {
				mm_timestat : [parseParam(tmp)]
			};


			var base = {
				locuin : arg.openid||'0', //my uin 
				touin : arg.openid||'0', // target uin
				deviceinfo : arg.deviceinfo||'0',  //device info
				dnstime : arg.dnstime||'0', // 可为0
				httptime : arg.httptime||'0',// 可为0
				tcptime : arg.tcptime||'0',// 可为0
				os : arg.os||'0', //操作系统
				sdkversion : arg.sdkversion||'0', //系统版本
				sdkid : arg.sdkid||'0', // 系统id
				device : arg.device||'0', //设备
				releaseversion : arg.releaseversion||'0', //版本号
				r : Math.random()
			};
			var baseStr = parseParam(base);

			var img = new Image();
			img.src = 'http://mmspeed.qq.com/client/report?report_data=' + encodeURIComponent(JSON.stringify(report)) + '&comm_data=' + encodeURIComponent(baseStr);
		};

		function parseParam(obj){
			var ret = [];
			for(var i in obj){
				ret.push(i+"="+encodeURIComponent(obj[i]));
			}
			return ret.join("&");
		};

		return StringReport;
	})();

	//返回码上报
	QZAppExternal.report.returnCode = (function() {
		/**
		 *  支持批量上报
		 *  @example
		 *  ReturnCodeReportV2.valueStat('qzonestyle.gtimg.cn', 'app/v8/utils/return_code_report/2.0',type, code, time, rate)
		 *
		 * 比如这个图片有问题：   http://app1101808733.imgcache.qzoneapp.com/app1101808733/assets/game_1023_2.png
		 *  ReturnCodeReportV2.valueStat('wanba.qq.com', '/app1101808733/assets/game_1023_2.png',2, 404, 1200)
		 * 
		 */

		var commurl = "http://c.isdspeed.qq.com/code.cgi",
			urlParse = /^http:\/\/([\s\S]*?)(\/[\s\S]*?)(?:\?|$)/;

		if(location.protocol === 'https:'){
			commurl = "https://huatuocode.weiyun.com/code.cgi";
		}
		/**
		 * 返回码上报
		 * @param  {[type]} domain 例如qzonestyle.gtimg.cn
		 * @param  {[type]} cgi    例如：app/v8/utils/return_code_report/2.0
		 * @param  {[type]} type   1(成功)|2（失败）|3（逻辑失败） 
		 * @param  {[type]} code   返回码，可以报http状态码，比如404，或者自定义的比如123（能标示是什么错误就行）
		 * @param  {[type]} time   耗时（必须报，不能为0）
		 * @param  {[type]} rate   上报率，如果为1/1000,就填1000。这里全量，不填这个
		 * @return {[type]}        [description]
		 */
		//用于保存上报的url
		var s='';
		var index=0;
		var reportTimer;
		var img;
		var MAX_URL_LENGTH = 900;

		function valueStat(arg) {
			var defaultConf = {
				domain: arg.domain,
				cgi: arg.cgi.replace(urlParse,''),
				type: arg.type,
				code: arg.code,
				time: arg.time,
				rate: arg.rate||10 //采样率，默认10%采样率
			};

			//抽样
			if (Math.random() > 1 / defaultConf.rate)
				return;
			// var param =[];
			// param.push("key=" + "domain,cgi,type,code,time,rate", "r=" + Math.random());
			setTimeout(function(){
				pushData(defaultConf);
			},0);
			
		}

		var pushData = function(data) {
			index++;
			var param =[];
			param.push([index,'_',1,'=',data.domain].join(''));
			param.push([index,'_',2,'=',data.cgi].join(''));
			param.push([index,'_',3,'=',data.type].join(''));
			param.push([index,'_',4,'=',data.code].join(''));
			param.push([index,'_',5,'=',data.time].join(''));
			param.push([index,'_',6,'=',data.rate].join(''));
			s+='&'+param.join('&');
			clearTimeout(reportTimer);
			if(s.length>=MAX_URL_LENGTH){
				report();
			}else{
				reportTimer = setTimeout(function(){
					report();
				},2500);
			}
		};

		var report = function(){
			if(!s){
				return;
			}
			img = new Image();
			var url = commurl+'?key=domain,cgi,type,code,time,rate&r='+Math.random()+'&'+s;
			img.src= url;
			s='';
			index=0;
		};

		return valueStat;
	})();
})();

/**
 * @namespace core
 * @desc mqqapi内核的方法和属性
 */
;
(function(name, definition) {

    // JSSDK需把ua检查提前
    var ua = navigator.userAgent;
    var REGEXP_ANDROID = /Android/;
    // 通用SDK解决方案
    var REGEXP_JSSDK = /QZONEJSSDK\/([\d\.]+)/;
    var REGEXP_QQJSSDK = /QQJSSDK\/([\d\.]+)/;

    //iframe替代方案
	var PROMPT_AVAILABLE = window.PROMPT_AVAILABLE = false;
	var CONSOLE_AVAILABLE = window.CONSOLE_AVAILABLE = false;

    /**
     * @attribute core.SDKVersion
     * @desc SDK 版本号
     */
    var SDKVersion = function (re) {
            return re && re[1];
        }(ua.match(REGEXP_JSSDK));

    if (!SDKVersion) {
    	SDKVersion = function (re) {
        	return re && re[1];
   		 }(ua.match(REGEXP_QQJSSDK));
    };

	// PC上模拟android
	if(!SDKVersion && /Windows NT/.test(ua)){
		SDKVersion = '6.3';
	}

    /**
     * @attribute core.jssdk
     * @desc 最新版通用解决方法，true为支持
     */
    var jssdk = !!SDKVersion;

    // 当前native不支持jssdk
    if (!jssdk ) {
    	window.mqq = window.mqq || {};
    	window.mqq = {
    		invoke:function(){
    			return console.log('当前环境不支持通用JSSDK.');
    		},
    		callback: function(){
    			return false;
    		},
    		support:function(){
    			return false;
    		},
			addEventListener:function(){
    			return console.log('当前环境不支持通用JSSDK.');
    		}
    	}
        // 不支持jssdk就不玩了，交给下面的旧的qqapi.js
        return console.log('当前环境不支持通用JSSDK.');

    // 当前native支持jssdk，且`mqq`变量已经存在
    // 说明在这之前已经引入通用的jssdk包或者旧的qqapi包
    // 无论是新包还是旧包，都不会往下走下去
    // 因为旧包封装的`invoke`会判断手Q版本来走不同的协议
    // jssdk的协议用的是手Q最新的协议，所以同样能正常使用，只需要native端做好接口迁移即可
    } else if ( this[name] ) {
    	window.mqq.newVersion = ua.match(/NewVersion/i);
        return;
    }

    var mqq = this[name] = definition();
    // 带上版本跟标识

    if (mqq.iOS) { //兼容旧版本的QQJSSDK
  
    	var qqv = function (re) {
	        return re && re[1];
	    }(ua.match(REGEXP_QQJSSDK));

	    var qzonev =  function (re) {
	        return re && re[1];
	    }(ua.match(REGEXP_JSSDK));


	    if (mqq.compare2(qqv,qzonev) == -1) {
	    	SDKVersion = qzonev;
	    } else {
	    	SDKVersion = qqv;
	    }
    }else if (mqq.android) { //android qzone qqjssdk>1.3 ping操作，iframe替代方案

        /*
		var qqJsSdkVer = function (re) {
			return re && re[1];
		}(ua.match(REGEXP_QQJSSDK));


		if(ua.match(/qzone/i)  && (qqJsSdkVer >= 1.3) ){
			prompt("PING_FOR_OPTIMAL_PATH","pingJsbridge://");
			console.log("pingJsbridge://");
		}
        */
    }

    mqq.SDKVersion = SDKVersion;
    mqq.jssdk = jssdk;
    mqq.newVersion = ua.match(/NewVersion/i);

    if (typeof define === 'function' && (define.amd || define.cmd)) {
        define(mqq);
    } else if (typeof module === 'object') {
        module.exports = mqq;
    }

})('mqq', function(options, undefined) {
    "use strict";

    var exports = {};

    var ua = navigator.userAgent;

    var firebug = window.MQQfirebug; // 调试插件引用

    var SLICE = Array.prototype.slice;

    var toString = Object.prototype.toString;

    // 通用SDK解决方案
    // var REGEXP_JSSDK = /QQJSSDK\/([\d\.]+)/;

    // var REGEXP_IOS_QQ = /(iPad|iPhone|iPod).*? (IPad)?QQ\/([\d\.]+)/;
    var REGEXP_IOS = /(iPad|iPhone|iPod).*? (IPad)?/;
    // var REGEXP_ANDROID_QQ = /\bV1_AND_SQI?_([\d\.]+)(.*? QQ\/([\d\.]+))?/;
    var REGEXP_ANDROID = /Android/;

    var UUIDSeed = 1; //从1开始, 因为QQ浏览器的注入广告占用了0, 避免冲突

    var aCallbacks = {}; // 调用回调

    var isInitEvent = false; // 通知终端初始化事件模块

    // 如果已经注入则开启调试模式
    if ( firebug ) {
        exports.debuging = true;
        ua = firebug.ua || ua;
    } else {
        exports.debuging = false;
    }

    /**
     * @attribute core.iOS
     * @desc 如果在 iOS QQ中，值为 true，否则为 false
     * @support iOS 4.2
     * @support android 4.2
     */
    exports.iOS = REGEXP_IOS.test(ua);
    /**
     * @attribute core.android
     * @desc 如果在 android QQ中，值为 true，否则为 false
     * @support iOS 4.2
     * @support android 4.2
     */
    exports.android = REGEXP_ANDROID.test(ua);

	// PC上模拟android
	if(!exports.iOS && !exports.android && /Windows NT/.test(ua)){
		exports.android = true;
	}

    if (exports.iOS && exports.android) {

        /*
         * 同时是 iOS 和 android 是不可能的, 但是有些国产神机很恶心,
         * 明明是 android, ua 上还加上个 iPhone 5s...
         * 这里要 fix 掉
         */
        exports.iOS = false;
    }

    /**
     * @attribute core.version
     * @desc mqqapi自身的版本号
     * @support iOS 4.2
     * @support android 4.2
     */
    exports.version = '20150308005';

    /**
     * @function core.compare
     * @desc 比较版本号，返回比较结果（-1，0，1）。如果当前 QQVersion 小于给定版本，返回 -1，等于返回 0，大于返回 1
     * @param {String} version
     *
     * @example
     * mqq.QQVersion = "4.7";
     * mqq.compare("10.0");// 返回-1
     * mqq.compare("4.5.1");// 返回1
     */
    exports.compare = function (version) {
        var a = exports.SDKVersion.split('.');
        var b = String(version).split('.');

        try {
            for (var i = 0, len = Math.max(a.length, b.length); i < len; i++) {
                var l = isFinite(a[i]) && Number(a[i]) || 0,
                    r = isFinite(b[i]) && Number(b[i]) || 0;
                if (l < r) {
                    return -1;
                } else if (l > r) {
                    return 1;
                }
            }
        } catch (e) {
            return -1;
        }
        return 0;
    }

    exports.compare2 = function (sdkVersion,version) {
        var a = String(sdkVersion).split('.');
        var b = String(version).split('.');

        try {
            for (var i = 0, len = Math.max(a.length, b.length); i < len; i++) {
                var l = isFinite(a[i]) && Number(a[i]) || 0,
                    r = isFinite(b[i]) && Number(b[i]) || 0;
                if (l < r) {
                    return -1;
                } else if (l > r) {
                    return 1;
                }
            }
        } catch (e) {
            return -1;
        }
        return 0;
    }

    if (!exports.android && !exports.iOS) {
        console.log('QQJSSDK: not android or ios');
    }

	var formatQua = function (strQua) {
		strQua = strQua.toUpperCase();
		var arr = strQua.split("_");
		var OS_REG = /^(AND|IOS|IPH)$/;
		var APP_REG = /^(SQ|QZ|FM)$/;
		var VER_REG = /^\d+\.\d+\.\d+$/;
		var SUB_VER_REG = /^\d+$/;
		var res;
		if (arr.length == 7 && (OS_REG.test(arr[1]) && (APP_REG.test(arr[2]) && (VER_REG.test(arr[3]) && SUB_VER_REG.test(arr[4]))))) {
			res = { os: arr[1], version: arr[3], subVersion: arr[4], appType: arr[5], meybeQua: strQua };
		} else {
			res = {};
		}
		return res;
	}

	// qua计算
	var quaString = ua.match(/Qzone\/[^ ]*/) && ua.match(/Qzone\/[^ ]*/)[0] || "";
	if (quaString && quaString != "") {
		quaString = quaString.replace("Qzone/", "");
	}
	if (!quaString || quaString == "") {
		var qqQuaReg = /(V\S+_\S+_\S+_\S+_\S+_\S+_\S+)/;
		quaString = ua.match(qqQuaReg) && ua.match(qqQuaReg)[1] || "";
		if (!quaString || quaString == "") {
			quaString = ua.match(/QQ\/[^ ]*/) && ua.match(/QQ\/[^ ]*/)[0] || "";
			if (quaString && quaString != "") {
				quaString = quaString.replace("QQ/", "");
				var quaArr = quaString.split(".");
				if (quaArr && quaArr.length == 4) {
					quaString = "V1_IPH_SQ_" + quaArr[0] + "." + quaArr[1] + "." + quaArr[2] + "_1_APP_A";
				} else {
					quaString = "";
				}
			}
		}
	}
	exports.quaObj = formatQua(quaString);

	exports.isGameApp = !!ua.match(/QzGameApp/i);
	exports.gameAppQua = exports.isGameApp && (function(strQua){
    	strQua = strQua.toUpperCase();
		var arr = strQua.split("_");
		var OS_REG = /^(AND|IOS|IPH)$/;
		var APP_REG = /^([A-Z0-9]+)$/;
		var VER_REG = /^\d+\.\d+\.\d+$/;
		var SUB_VER_REG = /^\d+$/;
		var res;
		if (arr.length == 7 && (OS_REG.test(arr[1]) && (APP_REG.test(arr[2]) && (VER_REG.test(arr[3]) && SUB_VER_REG.test(arr[4]))))) {
			res = { os: arr[1], app: arr[2],version: arr[3], subVersion: arr[4], appType: arr[5], meybeQua: strQua };
		} else {
			res = {};
		}
		return res;
    })(quaString) || {};

    /*
     * 调用日志输出
     */
    function log (params) {
        var firebug = window.MQQfirebug;
        if ( exports.debuging && firebug && firebug.log ) {
            try {
                firebug.log(params);
            } catch (e) {}
        }
    }

    /*
     * 生成全局SN，并储存回调
     */
    function storeCallback(callback) {
        var sn = UUIDSeed++;
        if (callback) {
            aCallbacks[sn] = callback;
        }
        window.aCallbacks = aCallbacks;
        return sn;
    }

    /*
     * 回调统一执行入口
     */
    function execGlobalCallback(sn) {
        var callback = typeof sn === 'function' ? sn : aCallbacks[sn];
        var argus = SLICE.call(arguments, 1);
        if (typeof callback === 'function') {
            setTimeout(function() {
                // 调试
                log({
                    sn: sn
                });
                callback.apply(null, argus);
            }, 0);
        } else {
            console.log('QQJSSDK: not found such callback: ' + sn);
        }
    }

    /*
     * 使用 iframe 发起伪协议请求给客户端
     */
    function openURL(url, ns, method, sn) {
        // Console.debug('openURL: ' + url);

		//iframe替代方案
        if(window.CONSOLE_AVAILABLE){
        	console.log(url);
			return;
		}else if(window.PROMPT_AVAILABLE){
			prompt("USE_PROMPT_CONNECT",url);
			return;
		}


        var iframe = document.createElement('iframe');
        iframe.style.cssText = 'display:none;width:0px;height:0px;';
        var failCallback = function() {

            /*
                正常情况下是不会回调到这里的, 只有客户端没有捕获这个 url 请求,
                浏览器才会发起 iframe 的加载, 但这个 url 实际上是不存在的,
                会触发 404 页面的 onload 事件
            */
            sn && execGlobalCallback(sn, {
                retcode: -201,
                msg: 'error'
            });
        };
        if (exports.iOS) {

            /*
                ios 必须先赋值, 然后 append, 否者连续的 api调用会间隔着失败
                也就是 api1(); api2(); api3(); api4(); 的连续调用,
                只有 api1 和 api3 会真正调用到客户端
            */
            iframe.onload = failCallback;
            iframe.src = url;
        }
        var container = document.body || document.documentElement;
        container.appendChild(iframe);

        /*
            android 这里必须先添加到页面, 然后再绑定 onload 和设置 src
            1. 先设置 src 再 append 到页面, 会导致在接口回调(callback)中嵌套调用 api会失败,
                iframe会直接当成普通url来解析
            2. 先设置onload 在 append , 会导致 iframe 先触发一次 about:blank 的 onload 事件

         */

        if (exports.android) { // android 必须先append 然后赋值
            iframe.onload = failCallback;
            iframe.src = url;
        }

        // 调试
        log({
            ns: ns,
            method: method,
            url: url
        });

        // android 捕获了iframe的url之后, 也是中断 js 进程的, 所以这里可以用个 setTimeout 0 来删除 iframe
        setTimeout(function() {
            iframe.parentNode.removeChild(iframe);
        }, 0);

        // return returnValue;
        return null;
    }

    /**
     * @function core.invoke
     * @desc mqq 核心方法，用于调用客户端接口。
     * @param {String} namespace 命名空间
     * @param {String} method 接口名字
     * @param {Object} [params] API 调用的参数
     * @param {Function} [callback] API 调用的回调
     * @example
     * // 调用普通接口
     * // ios, android
     * mqq.invoke("ns", "method");
     *
     * @example
     * // 调用有返回值的接口
     * mqq.invoke("ns", "method", function(data){
     *     console.log(data);
     * });
     *
     * @example
     * // 调用有异步回调的接口
     * // ios, android
     * mqq.invoke("ns", "method", {
     *     "callback": handler, // 生成回调名字, 让客户端返回时可调用
     *     "p1": "p1",
     *     "p2": "p2",
     *     "p3": "p3"
     * });
     */
    function invokeClientMethod(ns, method, argus, callback) {
    	//兼容玩吧旧接口
    	if (ns == "game" && QZAppExternal[method] && !mqq.newVersion) {
    		if (typeof QZAppExternal[method] === 'function') {
    			QZAppExternal[method].call(arguments,callback,argus);
    			return;
    		};
    	};
    	if (doubleCallbackParams(ns,method,argus,callback)) {return;};
        // 参数合法性检查
        if (!ns || !method) {
            return null;
        }
        var arg = arguments,
            cb = arg[arg.length-1],
            url,
            sn,
            params; // sn 是回调函数的序列号

        if ( arg.length > 2 ) {
            if ( toString.call(argus) === '[object Object]' ) {
                params = argus;
            } else {
                params = {};
            }

            if ( typeof cb === 'function' ) {
                sn = storeCallback(cb);
                params.callback = String(sn);
            }
        } else {
        	params = {};
        	sn = storeCallback(function(){
        		console.log('CallbackFn for jsbridge://'+ ([ns,method].join(',')) +' is called');
        	});
            params.callback = String(sn);
        }

        // 通用版SDK
        if ( exports.jssdk ) {
            // jsbridge://ns/method?p=test&p2=xxx&p3=yyy#123
            url = 'jsbridge://' + encodeURIComponent(ns) + '/' + encodeURIComponent(method);

            if ( params ) {
            	console.log(params);
                url += '?p=' + encodeURIComponent(JSON.stringify(params))
            }
			if (!QZAppExternal.wkPostMessage(url)) {
				openURL(url, ns, method, sn);
			}
        }

        return null;

    }

    //////////////////////////////////// event /////////////////////////////////////////////////

    /**
     * @function core.addEventListener
     * @desc 监听客户端事件，该事件可能来自客户端业务逻辑，也可能是其他 WebView 使用 dispatchEvent 抛出的事件
     * @param {String} eventName 事件名字
     * @param {Function} handler 事件的回调处理函数
     * @param {Object} handler.data 该事件传递的数据
     * @param {Object} handler.source 事件来源
     * @param {string} handler.source.url 抛出该事件的页面地址
     * @example
     * mqq.addEventListener("hiEvent", function(data, source){
     *     console.log("someone says hi", data, source);
     * })
     *
     */
    function addEventListener(eventName, handler) {

    	// android 在使用事件之前需先初始化
        if ( !isInitEvent && exports.android ) {
            isInitEvent = true;
            mqq.invoke('event', 'init');
        }

        if (eventName === 'qbrowserVisibilityChange') {

            // 兼容旧的客户端事件
            document.addEventListener(eventName, handler, false);
            return true;
        }
        var evtKey = 'evt-' + eventName;
        (aCallbacks[evtKey] = aCallbacks[evtKey] || []).push(handler);
        return true;
    }

    /**
     * @function core.removeEventListener
     * @desc 移除客户端事件的监听器
     * @param {String} eventName 事件名字
     * @param {Function} [handler] 事件的回调处理函数，不指定 handler 则删除所有该事件的监听器
     *
     */
    function removeEventListener(eventName, handler) {
        var evtKey = 'evt-' + eventName;
        var handlers = aCallbacks[evtKey];
        var flag = false;
        if (!handlers) {
            return false;
        }
        if (!handler) {
            delete aCallbacks[evtKey];
            return true;
        }

        for (var i = handlers.length - 1; i >= 0; i--) {
            if (handler === handlers[i]) {
                handlers.splice(i, 1);
                flag = true;
            }
        }

        return flag;
    }

    // 这个方法时客户端回调页面使用的, 当客户端要触发事件给页面时, 会调用这个方法
    function execEventCallback(eventName, data, source ) {
    	if (eventName === 'qbrowserVisibilityChange') {
    		if(exports.iOS && exports.compare2(exports.quaObj.version, '7.3')<=0){
	    		//7.3之前这个事件不是发到document上的, 手动触发下, 7.4改
	    		var event = document.createEvent('HTMLEvents');  
				event.initEvent("qbrowserVisibilityChange", false, false);  
				event.eventType = 'message';  
				event.hidden = data && data.data && data.data.visible || 0;
				//触发document上绑定的自定义事件qbrowserVisibilityChange
				document.dispatchEvent(event);
	    		return;
	    	}
	    }
        var evtKey = 'evt-' + eventName;
        var handlers = aCallbacks[evtKey];        
        if (handlers) {
            handlers.forEach(function(handler) {           	
                execGlobalCallback(handler, data, source);
            });
        }
    }
    /**
     * @function core.dispatchEvent
     * @desc 抛出一个事件给客户端或者其他 WebView，可以用于 WebView 间通信，或者通知客户端对特殊事件做处理（客户端需要做相应开发）
     * @param {String} eventName 事件名字
     * @param {Object} options 事件参数
     * @param {Boolean} echo 当前webview是否能收到这个事件，默认为true
     * @param {Boolean} broadcast 是否广播模式给其他webview，默认为true
     * @param {Array|String} domains 指定能接收到事件的域名，默认只有同域的webview能接收，支持通配符，比如"*.qq.com"匹配所有qq.com和其子域、"*"匹配所有域名。注意当前webview是否能接收到事件只通过echo来控制，这个domains限制的是非当前webview。
     * @example
     * //1. WebView 1(www.qq.com) 监听 hello 事件
     * mqq.addEventListener("hello", function(data, source){
     *    console.log("someone says hi to WebView 1", data, source)
     * });
     * //2. WebView 2(www.tencent.com) 监听 hello 事件
     * mqq.addEventListener("hello", function(data, source){
     *    console.log("someone says hi to WebView 2", data, source)
     * });
     * //3. WebView 2 抛出 hello 事件
     * //不传配置参数，默认只派发给跟当前 WebView 相同域名的页面, 也就是只有 WebView 2能接收到该事件（WebView 1 接收不到事件，因为这两个 WebView 的域名不同域）
     * mqq.dispatchEvent("hello", {name: "abc", gender: 1});
     *
     * //echo 为 false, 即使 WebView 2 的域名在 domains 里也不会收到事件通知, 该调用的结果是 WebView 1 将接收到该事件
     * mqq.dispatchEvent("hello", {name:"alloy", gender:1}, {
     *     //不把事件抛给自己
     *     echo: false,
     *     //广播事件给其他 WebView
     *     broadcast: true,
     *     //必须是这些域名的 WebView 才能收到事件
     *     domains: ["*.qq.com", "*.tencent.com"]
     * });
     *
     * //echo 和 broadcast 都为 false, 此时不会有 WebView 会接收到事件通知, 但是客户端仍会收到事件, 仍然可以对该事件做处理, 具体逻辑可以每个业务自己处理
     * mqq.dispatchEvent("hello", {name:"alloy", gender:1}, {
     *     echo: false,
     *     broadcast: false,
     *     domains: []
     * });
     *
     * @support iOS 5.0
     * @support android 5.0
     */
    function dispatchEvent(eventName, data, options) {

        var params = {
            event: eventName,
            data: data || {},
            options: options || {}
        };

        invokeClientMethod('event', 'dispatchEvent', params);
    }

    /**
     * @event qbrowserTitleBarClick
     * @desc 点击标题栏事件，监听后点击手机QQ标题栏就会收到通知，可以用来实现点击标题滚动到顶部的功能
     * @param {Function} callback 事件回调
     * @param {Object} callback.data 事件参数
     * @param {Object} callback.data.x 点击位置的屏幕x坐标
     * @param {Object} callback.data.y 点击位置的屏幕y坐标
     * @param {Object} callback.source 事件来源
     * @example
     * mqq.addEventListener("qbrowserTitleBarClick", function(data, source){
     *     console.log("Receive event: qbrowserTitleBarClick, data: " + JSON.stringify(data) + ", source: " + JSON.stringify(source));
     * });
     *
     * @support iOS 5.2
     * @support android 5.2
     */

    /**
     * @event qbrowserOptionsButtonClick
     * @desc Android 的物理菜单键的点击事件，点击后会收到通知
     * @param {Function} callback 事件回调
     * @param {Object} callback.data 事件参数
     * @param {Object} callback.source 事件来源
     * @example
     * mqq.addEventListener("qbrowserOptionsButtonClick", function(data, source){
     *     console.log("Receive event: qbrowserOptionsButtonClick, data: " + JSON.stringify(data) + ", source: " + JSON.stringify(source));
     * });
     *
     * @support iOS not support
     * @support android 5.2
     */

    /**
     * @event qbrowserPullDown
     * @desc 页面下拉刷新时候会抛出该事件，主要用于与setPullDown交互，具体可参考setPullDown
     * @example
     * mqq.addEventListener("qbrowserPullDown", function () {
     *     // ... Your Code ...
     * });
     * @note 该事件可配合下拉刷新做交互，具体可参考`setPullDown`
     *
     * @support iOS 5.3
     * @support android 5.3
     */


    //////////////////////////////////// end event /////////////////////////////////////////////////
    function support(fn){    	
	   	var map = {
	   		iOS:{
	    		"mqq.qzui.topicSend":5.5,
	    		"mqq.qzui.topicComment":5.5,
	    		"mqq.qzui.setTransparentPullDown":5.5,
	    		"mqq.qzui.setMessageButton":5.5,
	    		"mqq.qzui.setUploadButton":5.6,
	    		"mqq.qzui.topicUploadVideo":5.7,
	    		"mqq.qzui.callNativeInput":5.6,
	    		"mqq.qzui.recommendMessage":6.0,
	    		"mqq.qzui.setTopbar":5.5,

	    		"mqq.ui.openUrl":5.5,
	    		"mqq.ui.setPullDown":5.5,
	    		"mqq.ui.showPicture":5.5,
	    		"mqq.ui.refreshTitle":5.5,    		
	    		"mqq.ui.popBack":5.5,
	    		"mqq.ui.closeWebViews":5.5,
	    		"mqq.ui.setTitleButtons":5.5,
	    		"mqq.ui.setLeftButton":5.5,
	    		"mqq.ui.setRightButton":5.5,
	    		"mqq.ui.setTitleButton":5.5,
				"mqq.ui.showShareMenu":5.5,

	    		"mqq.game.addGameShortcut":5.5,
                "mqq.game.preloadOfflinePackage":5.8,
                "mqq.game.getQUA":5.5,
                "mqq.game.getConn":5.5,
                "mqq.game.startAccelerometer":5.5,
                "mqq.game.stopAccelerometer":5.5,
                "mqq.game.loadgame":5.5,
                "mqq.game.vibrate":5.5,
                "mqq.game.preloadSound":5.5,
                "mqq.game.playLocalSound":5.5,
                "mqq.game.playLocalBackSound":5.5,
                "mqq.game.stopSound":5.5,
                "mqq.game.stopBackSound":5.5,
                "mqq.game.getDeviceInfo":5.5,
                "mqq.qzone.qzoneGameBar":5.5,
  
				"mqq.system.addShortcut":5.5,
				"mqq.system.refresh":5.8,

	    		"mqq.sensor.getLocation":5.5,
				"mqq.sensor.startListen":5.5,
				"mqq.sensor.stopListen":5.5,

				"mqq.media.playLocalSound":5.5,

	    		"mqq.device.getDeviceInfo":5.5,
	    		"mqq.device.getClientInfo":5.5,
	    		"mqq.device.getNetworkInfo":5.5,
	    		"mqq.device.getCPUInfo":5.5,
				"mqq.device.getMemInfo":5.5,

	    		"mqq.setShareInfo":5.5,
	    		"mqq.share.setShare":5.6,
				"mqq.share.toQQ":5.6,
				"mqq.share.toQz":5.5,
				"mqq.share.toWX":5.5,
				"mqq.share.toTL":5.5,

	    		"mqq.data.getPageLoadStamp":5.5,
	    		"mqq.data.getPerformance":5.5,
	    		"mqq.data.setClipboard":5.5,
				"mqq.data.getClipboard":5.5,
				"mqq.data.readH5Data":5.6,
				"mqq.data.deleteH5Data":5.5,
				"mqq.data.httpProxy":5.7,
				"mqq.data.refreshSkey":5.7,

	    		"mqq.app.isAppInstalledBatch":5.8,
				"mqq.app.isAppInstalled":5.8,
				"mqq.app.launchApp":5.8,
				
				"mqq.addEventListener":5.5,
				"mqq.removeEventListener":5.5,
				"mqq.dispatchEvent":5.5,
				"mqq.qzui.topicPlayVideo":'5.7.0.4',

				"mqq.qzone.mtaReport":6.0,

				"mqq.event.dispatchEvent":5.5,

				"end":0
	   		},
	   		android:{
				"mqq.qzui.topicSend":5.5,
	    		"mqq.qzui.topicComment":5.5,
	    		"mqq.qzui.setTransparentPullDown":5.5,
	    		"mqq.qzui.setMessageButton":5.5,
				"mqq.qzui.setUploadButton":5.6,
	    		"mqq.qzui.topicUploadVideo":5.7,
	    		"mqq.qzui.topicGetUgcKey":5.7,
	    		"mqq.qzui.topicPlayVideo":5.7,
				"mqq.qzui.callNativeInput":5.6,
				"mqq.qzui.setQzonePullDown":5.5,
				"mqq.qzui.recommendMessage":6.0,

				"mqq.ui.openUrl":5.5,
				"mqq.ui.pageVisibility":5.5,
				"mqq.ui.setPullDown":5.5,
				"mqq.ui.showPicture":5.5,
				//"mqq.ui.refreshTitle":5.5,
				"mqq.ui.popBack":5.5,
				"mqq.ui.closeWebViews":5.5,
				//"mqq.ui.setTitleButtons":5.5,
				"mqq.ui.setLeftButton":5.5,
				"mqq.ui.setRightButton":5.5,
				//"mqq.ui.setMessageButton":5.5,
				"mqq.ui.showActionSheet":5.5,
				"mqq.ui.showDialog":5.5,
				//"mqq.ui.setTitleButton":5.5,
				"mqq.ui.showShareMenu":5.5,

				"mqq.game.addGameShortcut":5.5,
				"mqq.game.preloadOfflinePackage":5.7,
				
				//"mqq.system.addGameShortcut":5.5,
				"mqq.system.addShortcut":5.5,

				"mqq.sensor.getLocation":5.5,
				"mqq.sensor.getRealLocation":5.5,
				"mqq.sensor.startListen":5.5,
				"mqq.sensor.stopListen":5.5,

				"mqq.media.playLocalSound":5.5,
				"mqq.media.preloadSound":5.5,
				"mqq.media.openImagePicker":5.6,
				"mqq.media.getCurrentVolume":5.6,

				"mqq.device.getDeviceInfo":5.5,
				"mqq.device.getClientInfo":5.5,
				"mqq.device.getNetworkInfo":5.5,
				"mqq.device.getCPUInfo":5.5,
				"mqq.device.getMemInfo":5.5,
				"mqq.device.getCPUCoreNum":6.0,

				"mqq.setShareInfo":5.5,

				//"mqq.data.pbReport":5.5,
				"mqq.data.getPageLoadStamp":5.5,
				"mqq.data.getPerformance":5.5,
				"mqq.data.deleteH5Data":5.5,
				"mqq.data.writeH5Data":5.5,
				"mqq.data.setClipboard":5.5,
				"mqq.data.getClipboard":5.5,
				"mqq.data.readH5Data":5.6,
				"mqq.data.deleteH5DataByHost":5.5,
				"mqq.data.httpProxy":5.7,
				"mqq.data.refreshSkey":5.7,
				"mqq.data.openLog":5.7,
				"mqq.data.closeLog":5.7,
				"mqq.data.readLines":5.7,

				"mqq.app.isAppInstalledBatch":5.5,
				"mqq.app.isAppInstalled":5.5,
				"mqq.app.launchApp":5.5,
				"mqq.app.checkAppInstalled":5.5,
				"mqq.app.checkAppInstalledBatch":5.5,
				
				"mqq.cover.setCover":6.0,
				
				"mqq.debug.detailLog":6.0,
				
				"mqq.qzDynamicAlbum.deletePhotos":5.7,
				"mqq.qzDynamicAlbum.saveDynamicAlbum":5.7,
				"mqq.qzDynamicAlbum.getPhotos":5.7,
				"mqq.qzDynamicAlbum.entryWriteMood":5.7,
				"mqq.qzDynamicAlbum.getSelectNum":5.7,
				"mqq.qzDynamicAlbum.entryWriteMoodAsync":5.7,
				"mqq.qzDynamicAlbum.toBase64":5.7,
				"mqq.qzDynamicAlbum.startPlay":6.1,
				"mqq.qzDynamicAlbum.endPlay":6.1,
				
				"mqq.gift.downloadVoiceGift":5.5,
				"mqq.gift.previewVoiceGift":5.5,
				"mqq.gift.previewNormalGift":5.5,
				"mqq.gift.isGiftsDownloaded":5.5,
				
				"mqq.QzoneData.offlineHttpProxy":6.1,
				
				"mqq.qzone.mtaReport":6.0,
				
				"mqq.qzpaster.selectpaster":5.5,
				
				"mqq.share.setShare":5.6,
				"mqq.share.toQQ":5.6,
				"mqq.share.toQz":5.5,
				"mqq.share.toWX":5.5,
				"mqq.share.toTL":5.5,
				
				"mqq.signin.signInSuccess":5.5,
				
				"mqq.vip.H5PayCallBack":5.8,

				"mqq.addEventListener":5.5,
				"mqq.removeEventListener":5.5,
				"mqq.dispatchEvent":5.5,
				
				"mqq.event.dispatchEvent":5.5,
				"mqq.event.init":5.5,		
				

				"end":0
	   		}
    	};


		var version;
		if (exports.iOS) {
			version = map["iOS"][fn] || 100;
		} else {
			version = map["android"][fn] || 100;
		}
    	if (exports.compare(version) == 1 || exports.compare(version) == 0) {
    		return true;
    	};
    	return false;	    
    }

    function doubleCallbackParams(ns, method, argus, callback)
    {
    	if (ns == "ui" && method == "setTitleButtons") {
    		var left = argus["left"];
    		var right = argus["right"];

    		if (left) {
    			mqq.invoke(ns,"setLeftButton",left,left.callback);
    		};

    		if (right) {
    			mqq.invoke(ns,"setRightButton",right,right.callback);
    		};

    		return true;
    	};

    	return false;
    }


    // for debug
    exports.__aCallbacks = aCallbacks;


    exports.invoke = invokeClientMethod;
    exports.execGlobalCallback = execGlobalCallback;

    // event
    exports.addEventListener = addEventListener;
    exports.removeEventListener = removeEventListener;

    exports.execEventCallback = execEventCallback;
    exports.dispatchEvent = dispatchEvent;

    exports.support = support;
    exports.callback = storeCallback;
    return exports;

});
//兼容
(function(){
	if(window.mqq){
		QZAppExternal.setShare = function(cbFn, params){
			if (typeof cbFn === 'object' && !params) {
				params = cbFn;
				cbFn = null;
			}
			mqq.invoke('share', 'setShare', params, cbFn);
		};
	    if (mqq.iOS && mqq.newVersion) {
	    	var funcMap = [['game','getPageVisibility'],['sensor','vibrate'],['game','startAccelerometer'],['game','stopAccelerometer'],
	    	               ['game','getQUA'],['game','getUserInfo'],['game','getConn'],['game','getDeviceInfo'],
	    	               ['game','isAppInstallIOS'],['game','loadgame'],['game','preloadSound'],['game','playLocalSound'],
	    	               ['game','playLocalBackSound'],['game','webviewConsole'],['game','setOrientation'],['game','getLocation'],
	    	               ['game','stopSound'],['game','stopBackSound'],['data','httpProxy'],['qzone','sendFeedback'],
	    	               ['system','refresh'],['qzone','qzoneMusic'],['qzone','qzoneBuyVip'],['qzone','callSchema'],
	    	               ['system','closeWebview'],['qzui','setTopbar'],['qzone','qzoneGameBar'],['qzone','data'],
	    	               ['game','reportScore'],['qzone','sendShortcut'],['qzone','finish'],['qzone','call'],
	    	               ['qzone','openVip']];

	    	for (var i = 0; i < funcMap.length; i++) {
	    		(function(arg){
		    		var module = funcMap[i][0];
		    		var method = funcMap[i][1];
		    		if (typeof QZAppExternal[method] == 'function') {
		    			QZAppExternal[method] = function(cbFn, params){
			                if (typeof cbFn === 'object' && !params) {
				                params = cbFn;
				                cbFn = null;
			                }
			                if (method == 'loadgame' && params && ('callback' in params)) {
			        	        params['_callback'] = params['callback']; 
			                };
			                mqq.invoke(module, method, params, cbFn);
		                };
		    		};
	    	    })(i);
	    	};														
        };
	}
})();

//兼容结合版mqqapi
(function(){
	if(window.mqq && !window.mqq.hackqqapi){
		var _invokeClientMethod = window.mqq.invoke;

		var funcMap = [['ui', 'popBack'], ['ui', 'showShareMenu'], ['ui', 'openUrl'],
			['ui', 'setPullDown'], ['ui', 'closeWebViews'], ['ui', 'refreshTitle'],
			['ui', 'setTitleButtons'], ['ui', 'showDialog'], ['ui', 'showActionSheet'],
			['ui', 'showPicture'], ['data', 'setClipboard'], ['data', 'getClipboard'],
			['device', 'getNetworkInfo'], ['sensor', 'vibrate'],
			['ui', 'setOnShareHandler', function () {
				if(mqq.isGameApp && (mqq.compare2(mqq.gameAppQua.version, '1.0.6')>=0 && mqq.android || mqq.iOS) || mqq.compare2(mqq.quaObj.version, '7.3')==0 && mqq.quaObj.subVersion == '1928' || mqq.compare2(mqq.quaObj.version, '7.4')>=0){
					_invokeClientMethod.apply(mqq, ['ui', 'setOnShareHandler'].concat(Array.prototype.slice.call(arguments)));
				}else{
					console.log('jsbridge暂不支持此方法');	
				}				
			}],['ui', 'setWebViewBehavior', function(param){
				console.log('jsbridge暂不支持此方法');
			}],
			['share', 'setShare'], ['data', 'setShareInfo', function (params, callback) {
				var to5Array = function(str){return [str,str,str,str,str]}
				_invokeClientMethod("share", "setShare", {
					type: "share",
					image: to5Array(params.image_url || params.imageUrl || ''),
					title: to5Array(params.title || ''),
					summary: to5Array(params.desc || ''),
					shareURL: to5Array(params.share_url || location.href)
				}, function (evt) {
					callback && callback.call(mqq, evt);
				}
				);
			}],
			['ui', 'shareMessage', function (params, callback) {
				params.share_type = params.share_type || 0;
				var shareType = "toQQ";
				if (params.share_type == 1) {
					shareType = "toQz";
				} else if (params.share_type == 2) {
					shareType = "toWX";
				} else if (params.share_type == 3) {
					shareType = "toTL";
				}
				var cb = function(code){
					setTimeout(function () {
						typeof callback === 'function' && (callback({ retCode: code }));
					}, 0);
				}

				// 回调有问题，目前统一点了就回调成功,7.3修复后去掉
				var cbmock = mqq.quaObj.version && mqq.compare2(mqq.quaObj.version, '7.3') < 0;

				cbmock && (cb(0));

				_invokeClientMethod("share", shareType, {
					title: params.title || '',
					desc: params.desc || '',
					link: params.share_url || params.targetUrl || location.href,
					imgUrl: params.image_url || params.imageUrl || '',
					type: '',
					dataUrl: ''
                }, function (evt) {
                    if (!cbmock) {
                        var code = evt && (evt.retCode);
                        if (typeof code === 'undefined') {
                            cb(-3);
                        } else {
                            cb(code);
                        }
                    }
                });
			}],
			['qzone', 'call', function (cbFn, params) {
				if (mqq.iOS && mqq.newVersion) {
					_invokeClientMethod.apply(mqq, ['qzone', 'call'].concat(Array.prototype.slice.call(arguments)));
				} else {
					// android 第一个参数是回调，这个调整下
					if (typeof cbFn === 'function') {
						QZAppExternal['call'].apply(QZAppExternal, Array.prototype.slice.call(arguments));
					} else {
						QZAppExternal['call'].apply(QZAppExternal, [params, cbFn]);
					}

				}
			}],
			['ui', 'setOnAddShortcutHandler', function(){
				if(mqq.isGameApp){
					console.log('小游戏微端不支持快捷方式');
				}else if(mqq.compare2(mqq.quaObj.version, '7.3') < 0){
					console.log('7.3以上版本jsbridge支持此方法');
				}else{
					_invokeClientMethod.apply(mqq, ['ui', 'setOnAddShortcutHandler'].concat(Array.prototype.slice.call(arguments)));
				}
				
			}],
			['ui', 'addShortcut', function (params) {
				if(mqq.isGameApp){
					console.log('小游戏微端不支持快捷方式');
					return;
				}
                params = params || {};
				var url = params.url||'', title = params.title || document.title||'', icon = params.icon||'';
				if(mqq.iOS){
					url = 'https://open.mobile.qq.com/api/qzone/shortcut.ios.html?'
						+ 'action=web&title=' + encodeURIComponent(title) + '&icon='+ encodeURIComponent(icon)+'&url='+encodeURIComponent(url);
                    params.url = url;
                    // url变更
				}
				if(mqq.compare2(mqq.quaObj.version, '7.3') >= 0){
                    var _callback = params.callback;
					_invokeClientMethod.apply(mqq, ['ui', 'addShortcut', params, function(evt) {
                        var result = evt && evt.code;
                        _callback && _callback({
                            result: typeof result === 'undefined'? -1 : result,
                            message: ''
                        })
                    }]);
					return;
				}
				_invokeClientMethod("system", "addShortcut", {
					'scheme': url,
					'title': title,
					'icon': icon
				}, function (evt) {
					if (params.callback) {
						params.callback({
							result: evt.code,
							message: ''
						})
					}
				}
				);
			}], ['ui', 'setOnCloseHandler', function (callback) {
				callback = callback || function () {
					_invokeClientMethod('ui', 'popBack');
				};
				_invokeClientMethod('ui', 'setLeftButton', { title: '返回', nosy: 1 }, callback);
			}],
			['media', 'showPicture', function (params, cbFn) {
				_invokeClientMethod('ui', 'showPicture', params, cbFn);
			}],['media', 'getPicture', function(param, callback){
				if(mqq.isGameApp){
					console.log('小游戏微端不支持选图');
					return;
				}
				param = param || {};
				if(mqq.compare2(mqq.quaObj.version, '7.2')<0){
					typeof callback == 'function' && callback(-1);
					return;
				}
				// 避免多次调用，锁下
				if(window._mqq_lock_getPicture){return}
				window._mqq_lock_getPicture = true;
				setTimeout(function(){
					window._mqq_lock_getPicture = false;
				}, 100);
				var p, initBase64Arr = [], result=[], qzoneUpPhotoIndex = 0, base64 = '';
				if(param.source === 1){ // 拍照
					p = {
                        key: 'custom_image',
                        type: 'camera',
                        subtype: 'system',
                        params: {
                            width: +param.outMaxWidth || 800,
                            height: +param.outMaxHeight || 800,
                            type : 'base64'
                        }
                    }
                    
				}else{
					p = {
                        key:'album_image',
                        type:'album',
                        params:{
                            width: +param.outMaxWidth || 800,
                            height: +param.outMaxHeight || 800,
                            limit: +param.max||1
                        }
                    }
                }
				
				if(window.__imageCallback){
					document.removeEventListener('WEBAPP_DATA', window.__imageCallback, false);
				}
				window.__imageCallback =  function(e){
					var data= e.data || {};
					var key = data.key;	
					if(key && key === 'custom_image'){
						base64 += data.content;//会分多次传输
						if(data.current == data.total - 1){  //传完一张图片
							if(data.content){
								typeof callback == 'function' && callback(0, [{
									data: 'data:image/jpeg;base64,' + base64
								}]);
								document.removeEventListener('WEBAPP_DATA', arguments.callee, false);
							}
						}
						//选相册，每张图片也会分多次，一张张收集
					}else if(key && key.match(/album_image/)){
						if(data.total == 0){
							return;
						}
						
						var index = key.split('_')[2];
						if(!index){
							//单张照片
							index = 0;
						}

						if(!initBase64Arr[index]){
							initBase64Arr[index] = '';
						}

						initBase64Arr[index] += e.data.content;
						if(e.data.current >= e.data.total - 1){
							qzoneUpPhotoIndex++;
							result.push({
								data: 'data:image/jpeg;base64,' + initBase64Arr[index]
							})
							if(qzoneUpPhotoIndex==p.params.limit){ //全部照片集齐
								typeof callback == 'function' && callback(0, result);
								initBase64Arr = []; result = []; qzoneUpPhotoIndex = 0;
								document.removeEventListener('WEBAPP_DATA', arguments.callee, false);
							}
						}
					}
				};
				document.addEventListener('WEBAPP_DATA', window.__imageCallback);
				window.QZAppExternal && QZAppExternal.call(p);
			}]
		];

		for (var i = 0; i < funcMap.length; i++) {
    		(function(arg){
	    		var module = funcMap[i][0];
	    		var method = funcMap[i][1];
	    		var convert = funcMap[i][2];
	    		if (typeof mqq[module] !== 'object') {
	    			mqq[module] = {};
	    		}

	    		if (typeof mqq[module][method] !== 'object') {
					if(window.mqq.jssdk){
						if(typeof convert === 'function'){
							mqq[module][method] = convert;
							mqq[module][method].hackqqapi = convert;
						}else{
							mqq[module][method] = function(){
								_invokeClientMethod.apply(mqq, [module, method].concat(Array.prototype.slice.call(arguments)));
							};
						}
					}else{
						mqq[module][method] = function(){
							console.log('当前环境不支持通用JSSDK.');
						};
	    			}
	    		}
    	    })(i);
    	};														
    
    	//hack invoke
		window.mqq.invoke = function(ns, method, argus, callback) {
			if(mqq[ns] && mqq[ns][method] && typeof mqq[ns][method].hackqqapi == 'function'){
				if(window.mqq.jssdk){
					mqq[ns][method].hackqqapi.apply(mqq, Array.prototype.slice.call(arguments, 2));	
				}else{
					console.log('当前环境不支持通用JSSDK.');
				}				
			}else{
				_invokeClientMethod.apply(mqq, arguments);
			}
		};
		window.mqq.hackqqapi = true;
	}
})();


window.define && define([],function(require,exports,module){
	return QZAppExternal;
})