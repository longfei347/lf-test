main = {
	data: data,
	
	init: function() {
		if (!CookieUtil.get("lang")) {
			CookieUtil.set("lang", "cn");
		}
		if (CookieUtil.get("lang") == "en") {
			$(".header span").removeClass("cn").addClass("en").html("中文&nbsp;&nbsp;&nbsp;");
		} else {
			$(".header span").removeClass("en").addClass("cn").html("&nbsp;&nbsp;En");
		}
		this.initView();
		this.initControl();
	},
	
	initView: function() {
		var id, elem;
		var conState = {
				"0": _("main_disconnected"),//"未连接"
				"1": _("main_connected"),//"已连接"
				"2": _("main_connecting")//"连接中"
			},
			conType = {
				"0": _("main_staticIp"),//"静态IP"
				"1": _("main_dhcp"),//"动态IP"
				"2": _("main_adsl")//"ADSL拨号"
			};
		if (data["repeat-mode"] != "wisp") {
			this.data.superSsid = _("main_disabled");//"未启用"
		} else {
			this.data.superSsid = _("main_superSsid") + data["super-ssid"];//"中继信号："
		}
		for(id in this.data) {
			if(this.data.hasOwnProperty(id) && (elem = document.getElementById(id))) {
				if (id == "con-state") {
					;
					/*if (this.data['con-state'] == 0) {
						$(elem).html(conState[data['con-state']]).prop("class","text-error")
					} else if (this.data['con-state'] == 1) {
						$(elem).html(conState[data['con-state']]).prop("class","text-success")
					} else if (this.data['con-state'] == 1) {
						$(elem).html(conState[data['con-state']]).prop("class","text-info")
					}*/
				} else if (id == "con-type") {
					$(elem).html(conType[data['con-type']]);
				} else {
					elem.innerHTML = this.data[id];
				}
			}
		}
		translate();
	},
	
	initControl: function() {
		$('#web-pc')[0].href = "http://" + this.data['lanip'];
		$(".header span").on("click", function() {
			var $t = $(this);
			if ($t.hasClass("cn")) {
				$t.removeClass("cn").addClass("en").html("中文&nbsp;&nbsp;&nbsp;");
				langUtil("en");
			} else {
				$t.removeClass("en").addClass("cn").html("&nbsp;&nbsp;En");
				langUtil("cn");
			}
			main.initView();
		})
		this.data.errNo = setInterval(function () {
			$.get("/goform/GeterroNo", function(s) {//phystatus~connectStatus~errno
				var con = s.split("~");
				if (con[0] == "0") {
					if (data['repeat-mode'] == "router") {
						$("#con-note").html(_("main_wireErr")).prop("class","text-error");//"请插入网线"
					} else {
						$("#con-note").html(_("main_ssidErr")).prop("class","text-error");//"SSID未关联"
					}
				} else {
					if (con[1] == 0 || con[1] == 2) {
						if (con[2] == "pppAuthFailed") {
							$("#con-note").html(_("main_disconnected") + ": " + _("main_adslErr"));//"ADSL用户名或密码错误"
						} else if (con[2] == "checkResultPPPoe") {
							$("#con-note").html(_("main_disconnected") + ": " + _("main_forAdsl"));//"建议使用ADSL拨号"
						} else if (con[2] == "checkResultDHCP") {
							$("#con-note").html(_("main_disconnected") + ": " + _("main_forDhcp"));//"建议使用动态IP"
						} else {
							$("#con-note").html(_("main_disconnected"));
						}
					} else if (con[1] == 1) {
						$('#con-note').prop("class",'text-success').html(_("main_connected"));
					} 
				}
			})
		}, 3000)
	},
	
	refresh: function() {
	}
}

$(function () {
	/*if (location.href.indexOf(data.lanIp) == -1) {
		location.href = "http://" + data.lanIp + "/main.asp";
	}*/
	main.init();
}); 
