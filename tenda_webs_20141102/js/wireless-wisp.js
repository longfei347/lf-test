repeater = {
	data: {},
		
	getData: function() {
		//{"WispAssociateSSID":"SSID\t关联状态\tMAC\t信道\t加密方式\t密码\t无线模式\t扩展信道\tWEP_MODE\tWEP_KEY_INDEX"}  
		$.get('/goform/getWispAssociateSSID?' + Math.random(), function (str, state, oreq) {
			if(oreq.responseText.indexOf("!DOCTYPE ") !== -1) {
				window.location.reload();
			}
			if (str) {
				data.mac = str.split("\t")[2];
			}
			//that.data = data;
			//that.init();
		});
		this.init();
	},
	
	init: function() {
		this.initView();
		this.initControl();
	},
	
	initView: function() {
		var that = this;
		if (data['repeat-mode'] === 'wisp') {
			$('#selecttip').show();
			$('#refresh').removeClass('refresh');
			setTimeout(that.refreshTable, 500);
		} else {
			$('#selecttip').hide();
			$('.ctrltable').hide();
			$('#wispSwitch').addClass("off");
		}
		if (data.wlRoamingEnable == 1) {
			$("#wlRoamingEnable").removeClass("off");
		}
		if (data['repeat-mode'] === 'wisp' && data.wlRoamingDisplay == 1) {
			$("#wander").removeClass("none");
		}
	},
	
	initControl: function() {
		var that = this;
		$(".cbody").on('click', function(e) {
			var target = e.target || e.srcElement, idx,
				$target = $(target);
			e.preventDefault();
			//e.stopPropagation();
			if ($('.popup').css('display') == "block") {
				if(target.id == 'pwd-ok') {//提交按钮
					repeater.validate.submit();
				} else if(target.id == 'pwd-cancel') {//取消按钮
					$('.popup').hide();
				} else if(!$(target).closest(".popup").length) {
					$('.popup').hide();
				}
			} else {
				if (target.id == "refresh" || target.parentNode.id == "refresh") {//刷新按钮
					if ($('#wispSwitch').hasClass("off")) {
						$('#wispSwitch').click();
					} else {
						that.refreshTable();
					}
				} else if (target.id == "wispSwitch" && !$target.hasClass('forbid')) {//开关按钮
					if ($('.ctrltable').css('display') !== "none") {
						if (data['repeat-mode'] === 'wisp') {
							$('.ctrltable').hide();
							$('#selecttip').hide();
							$('#wispSwitch').addClass("off");
							$('#wander').addClass("none");
							$("#wlRoamingEnable").addClass("off");
							//repeater.validate.submitData.wispEnable = 0;
							//repeater.validate.submit();
							$.post("/goform/wispSet", "wispEnable=0", function (req) {
								if(req.indexOf("!DOCTYPE ") !== -1) {
									window.location.reload();
									return;
								}
								alert(_("common_saved") + "," + _("wisp_savenote"));
							});
						} else {
							$('.ctrltable').hide();
							$('#selecttip').hide();
							if (data.wlRoamingDisplay == 1) {
								$('#wander').removeClass("none");
							}
							$('#wispSwitch').addClass("off");
						}
					} else {
						if (data.wlRoamingDisplay == 1) {
							$('#wander').removeClass("none");
						}
						$('#wispSwitch').removeClass("off").addClass("forbid");
						$('#selecttip').show();
						that.refreshTable();
					}
				} else if (target.id == 'wlRoamingEnable') {
					$("#wlRoamingEnable").toggleClass("off");
					if ($("#wlRoamingEnable").hasClass("off")) {
						$.post("/goform/wlRoamSet", "wlRoamingEnable=0");
					}
				} else if (target.className == 'ssid' || target.parentNode.className == 'ssid') {//点击具体无线信号
					if (target.nodeName == "DIV") {
						idx = $target.attr('dataIdx');
					} else {
						idx = $target.parent().attr('dataIdx');
					}
					that.selectSingal(idx);
					$(document).scrollTop(0);
					$('.popup').show();
					$('.popup').scrollTop(80);
					return true;
				}
			}
		});
	},
	
	refreshTable: function() {
		$('#refreshImg').hide();
		$('#loadingImg').show();
		$.get('/goform/getScanApList?' + Math.random(), function(json, state, oreq) {
		//返回值格式 ：{"apList":"ssid1\tmac1\tchannel1\t加密方式1\t信号强度1\t带宽1\t扩展信道1\rssid2\t..."}
			//var json = "ssid1\tmac1\t1\tWEP\t20\t40\t0\rssid2\tmac2\t11\tNONE\t60\t40\t1";
			/*if(oreq.responseText.indexOf("!DOCTYPE ") !== -1) {
				window.location.reload();
			}*/
			//that.data = json;
			repeater.data.networks = repeater.sortDataBySSID(json.split("\r"));
			repeater.newTable();
			$('#loadingImg').hide();
			$('#refreshImg').show();
			$('#wispSwitch').removeClass("forbid");
			$('.ctrltable').show();
		});
	},
	
	newTable: function() {
		var tr = "", tbody = "", nets_enc = "",
			len = repeater.data.networks.length,
			nets, ssid, powerRate, signalNum, i;
		//nets[6]:ssid,mac,channel,securityMode,strength,bandwidth,extendChannel
		for(i = 0; i < len; i++) {
			nets = repeater.data.networks[i].split("\t");
			signalNum = nets[4];
			ssid = nets[0];
			
			if (signalNum <= 15) {
				powerRate = '<a class="signal strong4"></a>';
			} else if (signalNum <= 30) {
				powerRate = '<a class="signal strong3"></a>';
			} else if (signalNum <= 60) {
				powerRate = '<a class="signal strong2"></a>';
			} else {
				powerRate = '<a class="signal strong1"></a>';
			}
			if(nets[3] == 'NONE') {
				nets_enc = '<a class="encrypt-none"></a>';
			} else {
				nets_enc = '<a class="encrypt"></a>';
			}
			if (data.mac && data.mac == nets[1]) {
				tr = '<tr class="cur-ssid"><td><div class="ssid" dataIdx="' + i + '">' + ssid + powerRate + nets_enc + '</div></td></tr>';
			} else {
				tr = '<tr><td><div class="ssid" dataIdx="' + i + '">' + ssid + powerRate + nets_enc + '</div></td></tr>';
			}
			tbody += tr;
		}
		$('.ctrltable').html('<table class="repeat-table">' + tbody + '</table>');
	},
	
	selectSingal: function(index) {
		var selIdx = parseInt(index,10),
			selSsid = document.getElementById('selectSsid'),
			dom_ssid = document.getElementById('ssidNote'),
			wep_key = document.getElementById('sta_wep_key'),
			wpa_pass = document.getElementById('sta_password'),
			selNet = repeater.data['networks'][selIdx],
			selValue = selNet.split("\t");
			
		selSsid.value = selNet;
		$("#sta_wep,#sta_wpa").hide();
		if (selValue[3] == "NONE") {
			dom_ssid.innerHTML = _("client_connect") + selValue[0];//'确认连接 '
		} else if (selValue[3] == "WEP") {
			$("#sta_wep").show();
			dom_ssid.innerHTML = _("wireless_pwdEmpty");//'请输入 ' + selValue[0] + ' 的密码'
		} else {
			dom_ssid.innerHTML = _("wireless_pwdEmpty");//'请输入 ' + selValue[0] + ' 的密码'
			$("#sta_wpa").show();
		}
	},
	
	sortDataBySSID: function(data) {
		data = data || [];
		return data.sort(function (x, y) {
			//x = x['s-ssid'].toLowerCase() || 'z';
			//y = y['s-ssid'].toLowerCase() || 'z';
			if (x > y) {
				return 1;
			} else {
				return -1;
			}
		});
	},
	
	validate: {
		submitData: {},
		
		submit: function() {
			var url = "/goform/wispSet";
			var vals = document.getElementById('selectSsid').value.split("\t"),
				wepval, wpaval;
			this.submitData.wispEnable = 1;
			this.submitData.staSSID = encodeURIComponent(vals[0]);
			this.submitData.staMac = vals[1];
			this.submitData.sta_channel = vals[2];
			this.submitData.sta_wireless_mode = vals[5],
			this.submitData.sta_exchannel = vals[6];
			this.submitData.sta_sec = vals[3];
			if ($("#wlRoamingEnable").hasClass("off")) {
				this.submitData.wlRoamingEnable = 0;
			} else {
				this.submitData.wlRoamingEnable = 1;
			}
			if (vals[3] == "NONE") {
				;
			} else if (vals[3] == "WEP") {
				wepval = document.getElementById('sta_wep_key');
				this.submitData.sta_wep_mode = document.getElementById('sta_wep_mode').value;
				this.submitData.sta_wep_key_index = document.getElementById('sta_wep_key_index').value;
				if (wepval.value == "") {
					alert(_("wireless_pwdEmpty"));//'请输入无线密码'
					return false;
				} else if (!(/^[\x00-\x7f]{5}$/.test(wepval.value) || /^[\x00-\x7f]{13}$/.test(wepval.value) ||
						/^[0-9a-f]{10}$/i.test(wepval.value) || /^[0-9a-f]{26}$/i.test(wepval.value))) {
					alert(_("wireless_wepErr"));//"请输入5或10个ASCII, 或者10或26个十六进制码!"
					wepval.focus();
					return false;
				}
				if (wepval.value.length == 5 || wepval.value.length == 13) {
					this.submitData.sta_wep_key_fmt = 1;
				} else {
					this.submitData.sta_wep_key_fmt = 0;
				}
				this.submitData.sta_wep_key = encodeURIComponent(wepval.value);
			} else {
				wpaval = document.getElementById('sta_password');
				if (!(/^[\x00-\x7f]{8,63}$/i.test(wpaval.value) || /^[0-9a-f]{64}$/i.test(wpaval.value))) {
					alert(_("wireless_pwdErr"));//"请输入8到63位ASCII, 或64位十六进制码!"
					return false;
				}
				this.submitData.sta_password = encodeURIComponent(wpaval.value);
			}

			$('#ssidNote').html(_("common_saving"));//"保存中，请稍后..."
			$.post(url, this.submitData, function (req) {
				if(req.indexOf("!DOCTYPE ") !== -1) {
					window.location.reload();
					return;
				}
				$('.popup').hide();
				alert(_("common_saved") + "," + _("wisp_savenote"));
				/*$('#ssidNote').html(_("common_saved") + "," + _("wisp_savenote"));//"数据保存成功！"
				setTimeout(function () {
					$('.popup').hide();
				}, 1000);*/
				//progressStrip(location.href.replace('wireless-wisp.asp', 'main.asp'), 280, '重启完成后需要连接无线信号才能继续操作</br>系统重启中，请稍候...');
			});
		}
	}
}

$(function() {
	translate();
	repeater.getData();
});