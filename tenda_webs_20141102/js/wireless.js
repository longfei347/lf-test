wireless = {
	data: data,
	
	getData: function() {
		data['ssid'] = decodeSSID(data['ssid']),
		data['ssid-pwd'] = decodeSSID(data['ssid-pwd']);
		data['pwdchange'] = 0;
		this.init();
	},
	
	init: function() {
		this.initView();
		translate();
		this.initControl();
	},
	
	initView: function() {
		var ssidElem = $('#ssid')[0],
			ssidPwdElem = $('#ssid-pwd')[0];
		if (data.wl_rate == 1) {
			ssidElem.value = data['ssid_5g'];
			ssidPwdElem.value = data['ssid-pwd_5g'];
			$("#wl_5").prop("checked", true);
			$(".wl-5").addClass("on").siblings().removeClass("on");
		} else {
			ssidElem.value = data['ssid'];
			ssidPwdElem.value = data['ssid-pwd'];
			if (data.wl_rate !== "0") {
				$(".wl-rate").parent().hide();
			}
		}
		/*if(data['enwps'] == 1) {
			ssidPwdElem.disabled = true;
			ssidElem.disabled = true;
			$('#submit')[0].disabled = true;
			$('.popup').show();
		} else {
			ssidPwdElem.disabled = false;
			ssidElem.disabled = false;
			$('.popup').hide();
		}*/
	},
	
	initControl: function() {
		$('#submit').on('click', function() {
			wireless.validate.checkAll();
		});
		$('#ssid-pwd').on('keyup', wireless.showPwdMsg);
		$(".wl-rate label").on("click", function () {
			$(this).addClass("on").siblings().removeClass("on");
			if ($(this).hasClass("wl-2")) {
				$('#ssid').val(data['ssid']);
				$('#ssid-pwd').val(data['ssid-pwd']);
			} else {
				$('#ssid').val(data['ssid_5g']);
				$('#ssid-pwd').val(data['ssid-pwd_5g']);
			}
		})
	},
	
	showPwdMsg: function() {
		if(wireless.data['pwdchange'] == 0) {
			wireless.data['pwdchange'] = 1;
			$('.popup')[0].innerHTML = _("wireless_popup");//"修改无线密码可能导致无线无法连接，建议同时修改无线信号名称"
			$('.popup').show();
			setTimeout(function(){
				$('.popup').hide();
			}, 3000);
		} else {
			return;
		}
	},
	
	validate: {
		submitData: {},
		
		checkAll: function() {
			this.getSubmitData();
		},
		
		getSubmitData: function() {
			var wl_rate = $(".wl-rate input:checked").val(), tmp = "";
			this.submitData['wl_rate'] = data.wl_rate == "" ? "" : wl_rate;
			this.submitData['ssid'] = document.getElementById('ssid').value;
			this.submitData['ssid-pwd'] = document.getElementById('ssid-pwd').value;
			this.submit();
		},
		
		submit: function() {
			var $formElem = $('#con-form'),
				submitData = $formElem.serialize(),
				url = "/goform/wirelessBasic",
				data = "Go=index.htm&";
			
			if(this.submitData['ssid'] == "") {
				alert(_("wireless_ssid"));//'无线信号名称不能为空'
				return;
			}
			//中文10字符限制***
			if (this.submitData['ssid'].length > 32 || (this.submitData['ssid'].match(/[\u2E80-\uFE4F]/g) &&
				this.submitData['ssid'].match(/[\u2E80-\uFE4F]/g).length * 2 +
				this.submitData['ssid'].length > 32)) {
				alert(_("wireless_ssidErr"));//'无线信号名称最大长度为32位, 中文字符占3个字节'
				return;
			}
			
			if(this.submitData['ssid-pwd'] !== '' && !(/^[\x00-\x7f]{8,63}$/.test(this.submitData['ssid-pwd']) || /^[0-9a-f]{64}$/i.test(this.submitData['ssid-pwd']))) {
				alert(_("wireless_pwdErr"));//'密码只能为8-64位的非中文字符'
				return;
			}
			if(wireless.data['transmitter'] === '1' && this.submitData['ssid-pwd'] !== wireless.data['ssid-pwd']) {
				if(!confirm(_("wireless_pwdNote1") + this.submitData['ssid-pwd'] + _("wireless_pwdNote2"))) {
					return;
				}
			}
			data += submitData;
			if (wireless.data.wlRoamingEnable == 1) {
				if (!confirm(_("wireless_roamNote"))) {//无线漫游已开启，若继续保存无线漫游将关闭！
					return false;
				} else {
					data += "&wlRoamingEnable=0";
				}
			}
			$('#submit')[0].disabled = true;
			$('.popup')[0].innerHTML = _("common_saving");//保存中，请稍后...
			$('#submit')[0].disabled = true;
			$('.popup').show();
			$.post(url, data, function (req) {
				setTimeout(function () {
					$('.popup').hide();
					window.location.reload();
				}, 1500);
				$('.popup')[0].innerHTML = _("common_saved");//"保存成功!"
			});
		}
	}
}

$(function() {
	wireless.getData();
})
