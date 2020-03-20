connect = {
	data: data,
	getData: function() {
		//this.data['show-net-error'] = true;
		//this.data.changeView = false;
		$.get("/goform/GeterroNo", function(s) {//phystatus~connectStatus~errno
				var con = s.split("~");
				if (con[0] == "0") {
					if (data['repeat-mode'] == "router") {
						$("#con-stat").html(_("main_wireErr")).prop("class","text-error");//"请插入网线"
					} else {
						$("#con-stat").html(_("main_ssidErr")).prop("class","text-error");//"SSID未关联"
					}
				} else {
					if (con[1] == 0 || con[1] == 2) {
						if (con[2] == "pppAuthFailed") {
							$("#con-stat").html(_("main_disconnected") + ": " + _("main_adslErr"));//"ADSL用户名或密码错误"
						} else if (con[2] == "checkResultPPPoe") {
							$("#con-stat").html(_("main_disconnected") + ": " + _("main_forAdsl"));//"建议使用ADSL拨号"
						} else if (con[2] == "checkResultDHCP") {
							$("#con-stat").html(_("main_disconnected") + ": " + _("main_forDhcp"));//"建议使用动态IP"
						} else {
							$("#con-stat").html(_("main_disconnected"));
						}
					} else if (con[1] == 1) {
						$('#con-stat').prop("class",'text-success').html(_("main_connected"));
					} 
				}
			})
	},
	
	init: function() {
		this.initView();
		this.getData();
		translate();
		this.initControl();
		setInterval(this.getData, 3000);
	},
	
	initView: function() {
		var id,
			elem,
			conState = {
				"0": _("main_disconnected"),//"未连接"
				"1": _("main_connected"),//"已连接"
				"2": _("main_connecting")//"连接中"
			},
			typeObj = {
				"0": "type-static",
				"1": "type-dhcp",
				"2": "type-adsl"
			};
		for(id in this.data) {
			if(this.data.hasOwnProperty(id) && (elem = document.getElementById(id))) {
				elem.value = this.data[id];
			}
			if (id == "wanMTU") {
				$("#dhcpMTU,#staticMTU").val(this.data[id]);
			}
		}
		$('label[for="' + typeObj[this.data['con-type']] + '"]' ).addClass("ui-btn-active").click();
		showConnectType(this.data['con-type']);
		/*if (this.data.link == 1) {
			$("#con-stat").html(conState[this.data["con-state"]]).prop("class","text-success");
		} else {
			$("#con-stat").html(_("main_wireErr")).prop("class","text-error");
		}*/
	},
	
	initControl: function() {
		//切换tab显示
		var $connectInfo = $("#connectInfo");
		$(':radio').on('click', function() {
			showConnectType(this.value);
			if(this.value !== connect.data['con-type']) {
				$connectInfo.hide();
			} else {
				$connectInfo.show();
			}
		});
		$('label[class*="ui-btn"]').on('click', function() {
			$('label[class*="ui-btn"]').removeClass('ui-btn-active');
			$(this).addClass('ui-btn-active');
		});
		$('#submit').on('click', function() {
			connect.validate.checkAll();
		});
	},
	
	validate: {
		submitData: {},
		
		checkAll: function() {
			this.getSubmitData();
		},
		
		getSubmitData: function() {
			this.submitData = {};
			if($('#type-adsl')[0].checked) {
				this.submitData['wanMode'] = 2;
				this.submitData['wanPppoeUserName'] = $('#wanPppoeUserName')[0].value;
				this.submitData['wanPppoePassword'] = $('#wanPppoePassword')[0].value;
				this.submitData['wanPppoeMTU'] = $('#wanPppoeMTU')[0].value;
			} else if($('#type-static')[0].checked) {
				this.submitData['wanMode'] = 0;
				this.submitData['wanIpAddr'] = $('#wanIpAddr')[0].value;
				this.submitData['wanNetMask'] = $('#wanNetMask')[0].value;
				this.submitData['wanGateWay'] = $('#wanGateWay')[0].value;
				this.submitData['wanDNS1'] = $('#wanDNS1')[0].value;
				this.submitData['wanDNS2'] = $('#wanDNS2')[0].value;
				this.submitData['wanMTU'] = $('#staticMTU')[0].value;
			} else {
				this.submitData['wanMode'] = 1;
				this.submitData['wanMTU'] = $('#dhcpMTU')[0].value;
			}
			this.submit();
		},
		
		submit: function() {
			var url = "/goform/wanSet",
				adsl_user = $('#wanPppoeUserName')[0],
				adsl_pwd = $('#wanPppoePassword')[0],
				adsl_mtu = $('#wanPppoeMTU')[0],
				wanIp = $('#wanIpAddr')[0].value,
				wanGateway = $('#wanGateWay')[0].value,
				wanDns1 = $('#wanDNS1')[0].value,
				wanDns2 = $('#wanDNS2')[0].value,
				lanIp = connect.data['lan-ip'],
				lanMask = '255.255.255.0',
				wanMask = $('#wanNetMask')[0].value;
			if($('#type-adsl')[0].checked) {
				if(!/^[^'"%&\\]+$/.test(adsl_user.value)) {
					alert(_("wanset_adslErr1"));//'宽带用户名不能为空或含有 \' " % \\ 等字符！'
					adsl_user.focus();
					return false;
				}
				if(!/^[^'"%&\\]+$/.test(adsl_pwd.value)) {
					alert(_("wanset_adslErr2"));//'宽带密码不能为空或含有 \' " % \\ 等字符！'
					adsl_pwd.focus();
					return false;
				}
				if(isNaN(adsl_mtu.value) || +adsl_mtu.value < 576 || +adsl_mtu.value > 1492) {
					alert(_("wanset_MtuErr1"));//"MTU值设置不正确，必须为576到1492之间的数字"
					adsl_mtu.focus();
					return false;
				}
			} else if($('#type-static')[0].checked) {
				if (valid.ip.all(wanIp, _("wanset_ip")) || valid.mask(wanMask) || valid.ip.all(wanGateway, _("wanset_gateway")) ||
					valid.ip.all(wanDns1, _("wanset_dns1")) || (!(wanDns2 == "" || wanDns2 == "0.0.0.0") && valid.ip.all(wanDns2, _("wanset_dns2")))) {
					return 0;
				}

				if (isSameNet(lanIp, wanIp, lanMask, wanMask)) {
					alert(_("wanset_ipErr1"));//'IP 地址不能与登录IP在同一网段！'
					$('#wanIpAddr')[0].focus();
					return 0;
				}
				if (wanGateway === lanIp) {
					alert(_("wanset_ipErr2"));//'默认网关不能与登录IP相同！'
					$('#wanGateWay')[0].focus();
					return 0;
				}
				if (wanIp === wanGateway  || wanIp === wanDns1 || wanIp === wanDns2) {
					alert(_("wanset_ipErr3"));//'IP 地址不能与默认网关或 DNS 服务器相同！'
					return 0;
				}
				if(ipMaskMergeOk(wanIp, wanMask)) {
					return 0;
				}
				if(isNaN(this.submitData['wanMTU']) || +this.submitData['wanMTU'] < 576 || +this.submitData['wanMTU'] > 1500) {
					alert(_("wanset_MtuErr2"));//"MTU值设置不正确，必须为576到1500之间的数字"
					return false;
				}
			} else {
				if(isNaN(this.submitData['wanMTU']) || +this.submitData['wanMTU'] < 576 || +this.submitData['wanMTU'] > 1500) {
					alert(_("wanset_MtuErr2"));
					return false;
				}
			}
			$('#submit').prop("disabled", true);
			$('.messagebox').html(_("common_saving")).show();//"保存中，请稍后..."
			$.post(url, this.submitData, function (req) {
				$('.messagebox')[0].innerHTML = _("common_saved");//"保存成功！"
				setTimeout(function () {
					$('#submit').prop("disabled", false);
					$('.messagebox').hide();
					window.location.reload();
				}, 1500);
			});
		}
	}
	
};
	
function showConnectType(conType) {
	var id,
		tabObj = {
			"0": "tab-static",
			"1": "tab-dhcp",
			"2": "tab-adsl"
		};
	id = tabObj[conType];
	$('.connect-type').addClass('none');
	$('#' + id).removeClass('none');
}

function wispSameNetWithSuper() {
	if(connect.data['show-net-error'] == false) {
		return;
	}
	var ipnum = connect.data['lan-ip'].split("."),
		m,
		newIp,
		conMassage,
		loc;
	
	m = (parseInt(ipnum[2], 10) + 1) % 256;
	newIp = ipnum[0] + "." + ipnum[1] + "." + m + "." + ipnum[3];
	
	conMassage = "检测到IP地址冲突，登录 IP 地址将自动修改为" +
			newIp + "，请以" + newIp + "重新登录界面。";
	
	if(confirm(conMassage)) {
		$.mobile.loading( "show", {
			 text: conMassage,
			 textVisible: true,
			 theme: 'c',
			 textonly: true,
			 html: ''
		});
		loc = "/goform/AdvSetLanip?GO=main.asp" + "&LANIP=" + newIp + "&LANMASK=255.255.255.0";
		window.location = loc;
	} else {
		connect.data['show-net-error'] = false;
	}
}

$(function() {
	connect.init();
});
