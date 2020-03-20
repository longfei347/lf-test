systool = {
	data : data,
	init : function () {
		$("#curMac").val(data.curMac);
		/*$.get('/goform/getClientList?'+ Math.random(), function (req) {
			//var req = "Mac1\tIp1\tHostname1\tAllow\rMac2\tIp2\thostname2\tForbid";
			data.clientList = req.split("\r").sort(function (x, y) {//By ip
				if (x.split("\t")[1] > y.split("\t")[1]) {
					return 1
				} else {
					return -1;
				}
			});
			var list = this.data['clientList'],
				//enablecontrol = this.data['enablecontrol'],
				dataLen = list.length,
				allowdeny = {Allow: _("client_allow"), Forbid: _("client_forbid")},
				tbody = "", record,
				i, tr, hostName, spdlimit;
			
			for(i = 0; i< dataLen; i++) {
				record = list[i].split("\t");//Mac1\tIp1\tHostname1\tAllow/Forbid
				
				tr = '<tr><td><div class="hostname">' + record[2] + '</div>' +
					'<span class="tab-info ipaddr">' + record[1] + '</span></td>' +
					'<td><a class="'+ (record[3] == "Forbid" ? "forbid" : "allow") +
					'"  data-mac="' + record[0] + '"></a><span class="fr mr10 shift">'+
					allowdeny[record[3]] + '</span></td></tr>';
				tbody += tr;
			}
			setTimeout(function() {
				$('.ctrltable').html('<table class="netctrl-table1">' + tbody + '</table>');
				$('#mainTable').show();
			}, 500);
		});*/
		var conState = {
				"0": _("main_disconnected"),//"未连接"
				"1": _("main_connected"),//"已连接"
				"2": _("main_connecting")//"连接中"
			},
			conType = {
				"0": _("main_staticIp"),//"静态IP"
				"1": _("main_dhcp"),//"动态IP"
				"2": _("main_adsl")//"ADSL拨号"
			}, id, elem;
		if (this.data['con-state'] == '0') {
			$('#con-state').removeClass('text-success text-info');
			$('#con-state').addClass('text-error');
		} else if(this.data['con-state'] == '1') {
			$('#con-state').removeClass('text-error text-info');
			$('#con-state').addClass('text-success');
		} else {
			$('#con-state').removeClass('text-success text-error');
			$('#con-state').addClass('text-info');
		}
		data['con-state'] = conState[data['con-state']];
		data['con-type'] = conType[data['con-type']];
		for(id in this.data) {
			if(this.data.hasOwnProperty(id) && (elem = document.getElementById(id))) {
				elem.value = this.data[id];
			}
		}
		translate();
		this.initControl();
		//setTimeout(systool.refesh, 5000);
	},

	initControl : function () {
		$(".cbody").on('click', function (e) {
			var target = e.target || e.srcElement,
				tar = $(target);
			if(target.id == "refresh") {
				location.reload();
			}
			if(target.id == "submit") {
				systool.validate.checkAll();
			}
			if (tar.hasClass("allow")) {//关
				tar.removeClass("allow").addClass("forbid");
				tar.next().html(_("client_forbid"));
			} else if (tar.hasClass('forbid')) {//开
				tar.removeClass("forbid").addClass("allow");
				tar.next().html(_("client_allow"));
			}
			if (tar.hasClass("allow") || tar.hasClass('forbid')) {
				if ($("#submit").hasClass("none")) {
					$("#submit").removeClass("none");
				}
			}
			if ($('#pwdiv').css("display") !== "none") {
				if (target.id == 'set-pwd-cancel') {
					$('#pwdiv').hide();
				} else if (target.id == 'set-pwd-sure') {
					systool.validate.checkAll();
				} else if (!$(target).closest(".popup").length) { //非密码输入框
					$('#pwdiv').hide();
				}
			} else if ($('#macdiv').css("display") !== "none") {
				if (target.id == 'set-mac-cancel') {
					$('#macdiv').hide();
				} else if (target.id == 'set-mac-sure') {
					systool.validate.checkAll();
				}  else if (target.id == 'hostMac') {
					$("#curMac").val(data.hostMac);
				}  else if (target.id == 'facMac') {
					$("#curMac").val(data.facMac);
				} else if (!$(target).closest(".popup").length) {
					$('#macdiv').hide();
				}
			} else {
				if (target.id == 'restore') {
					var url = "/goform/RestoreSet";
					if (confirm(_("systool_restoreNote"))) {
						$.get(url, function () {});
						setTimeout(function () {
							progressStrip(location.href.replace('systool.asp', 'main.asp'), 450, _('systool_restoreNote1'));
						}, 50);
						//document.restorefrm.submit();
					}
				} else if (target.id == 'reboot') {
					var url = "/goform/Reboot";
					if (window.confirm(_("systool_rebootConfirm"))) {
						$.get(url, function () {});
						setTimeout(function () {
							progressStrip(location.href.replace('systool.asp', 'main.asp'), 450, _('systool_rebootNote'));
						}, 50);
						//document.rebootfrm.submit();
					}
				} else if (target.id == 'set-pwd') {
					//$('#gbx_overlay').show();
					$('#pwdiv').show();
					if (systool.data['hasoldpwd'] == '0') {
						$('#oldPW').hide();
					}
				}  else if (target.id == 'set-mac') {
					$('#macdiv').show();
				} else if (target.id == 'upgrade') {
					$('#upgradediv').show();
				}
			}
		});
	},

	hideUpgrade: function() {
		$('#upgradediv').hide();
	},
	
	validate : {
		submitData : {},

		checkAll : function () {
			this.getSubmitData();
		},

		getSubmitData : function () {
			var oldpwdElem = document.getElementById('oldPW'),
			oldPW = oldpwdElem.value,
			newpwdElem = document.getElementById('newPW'),
			newPW = newpwdElem.value,
			pwd2Elem = document.getElementById('ConfirmPW'),
			ConfirmPW = pwd2Elem.value,
			curMac = document.getElementById('curMac'),
			tmp;
			if ($("#pwdiv").css("display") === "block") {
				if (oldPW != systool.data.pass) {
					alert(_("systool_pwdErr1"));
					oldpwdElem.value = "";
					newpwdElem.value = "";
					pwd2Elem.value = "";
					return false;
				}
				if (newPW.length < 3) { // && systool.data['hasoldpwd'] !== '1'
					alert(_("systool_pwdErr2"));
					newpwdElem.focus();
					return;
				}
				if (ConfirmPW !== newPW) {
					alert(_("systool_pwdErr3"));
					pwd2Elem.focus();
					return;
				}
				this.submitData.submitStr = "&newPW=" + encodeURIComponent(newPW);
				if (oldPW) {
					this.submitData.submitStr += "&oldPW=" + encodeURIComponent(oldPW);
				}
				$('.messagebox')[0].innerHTML = _("common_saving");//"数据保存中..."
				$('#pwdiv').hide();
				$('.messagebox').show();
				$.post('/goform/setPassword', this.submitData.submitStr, function (req) {
					window.location.href = "login.asp";
				});
				//this.submit();
			} else if ($("#macdiv").css("display") === "block") {
				if (!valid.checkMac(curMac.value)) {
					curMac.focus();
					return false;
				} else {
					$('.messagebox')[0].innerHTML = _("systool_saveNote");//数据保存中.功能在重启后长效.
					$('#macdiv').hide();
					$('.messagebox').show();
					$.post('/goform/MACclone', "macAddr=" + curMac.value , function(s) {
						setTimeout(function() {
							$('.messagebox').hide();
						}, 1000);
					});
				}
			} else {
				if ($(".forbid").length == 0) {
					this.submitData.forbidMacList = 0;
				} else {
					this.submitData.forbidMacList = $(".forbid").map(function () {
						return $(this).attr("data-mac");
					}).get().join("~");
				}
				$.post('/goform/setClientList', this.submitData, function (req) {
					setTimeout(function () {
						$('.messagebox').hide();
						window.location.reload();
					}, 1500);
					$('.messagebox')[0].innerHTML = _("common_saved");//"数据保存成功!"
				});
			}
		},
	}
}
$(function () {
	systool.init();
});
