client = {
	data: {},

	getData: function() {
		var that = this;
		$.get('/goform/getClientList?'+ Math.random(), function (req) {
			//var req = "Mac1\tIp1\tHostname1\tAllow\rMac2\tIp2\thostname2\tForbid";0,1,2,3
			that.data.clientList = req.split("\r").sort(function (x, y) {//By ip
				if (x.split("\t")[1] > y.split("\t")[1]) {
					return 1
				} else {
					return -1;
				}
			});
			that.init();
		});
	},
	
	init: function() {
		this.initView();
		this.initControl();
	},
	
	initView: function() {
		var list = this.data['clientList'],
			//enablecontrol = this.data['enablecontrol'],
			dataLen = list.length,
			allowdeny = [_("client_forbid"), _("client_allow")],
			tbody = "", record,
			i, j, td, hostName, spdlimit;
		
		for(i = 0; i< dataLen; i++) {
			record = list[i].split("\t");//Mac1\tIp1\tHostname1\tAllow/Forbid
			tbody += '<tr><td><div class="hostname">' + record[2] + '</div>' +
				'<span class="tab-info ipaddr">' + record[1] + '</span></td>';
			if (qosEnable == 1) {
				td = '<td><select data-mac="' + record[0] + '" data-ip="' + record[1] + '" class="fr" style="padding:0.4em; border-radius:5px;">';
				for (j = 0; j < 2; j++) {
					if (record[3] == j) {
						td += '<option value="' +j+ '" selected>' + allowdeny[j] + '</option>';
					} else {
						td += '<option value="' +j+ '">' + allowdeny[j] + '</option>';
					}
				}
				td += '</select></td>';
			} else {
				td = '<td><a class="'+ (record[3] == "0" ? "forbid" : "allow") +
				'"  data-mac="' + record[0] + '"></a><span class="fr mr10 shift">'+
				allowdeny[record[3]] + '</span></td>'
			}
			tbody += td + '</tr>';
		}
		setTimeout(function() {
			$('.ctrltable').html('<table class="netctrl-table1">' + tbody + '</table>');
			$('#mainTable').show();
		}, 500);
	},
	
	initControl: function() {
		$(".cbody").on('click', function(e) {
			var target = e.target || e.srcElement,
				tar;
			if(target.parentNode.id == "refresh") {
				location.reload();
			}
			if(target.id == "submit") {
				client.validate.checkAll();
			}
			tar = $(target);
			if (tar.hasClass("allow")) {//关
				tar.removeClass("allow").addClass("forbid");
				tar.next().html(_("client_forbid"));
			} else if (tar.hasClass('forbid')) {//开
				tar.removeClass("forbid").addClass("allow");
				tar.next().html(_("client_allow"));
			}
			/*if (tar.hasClass("allow") || tar.hasClass('forbid')) {
				if ($("#submit").hasClass("none")) {
					$("#submit").removeClass("none");
				}
			}*/
		});
	},
	
	validate: {
		submitData: {},
		
		checkAll: function() {
			this.getSubmitData();
		},
		
		getSubmitData: function() {
			this.submit();
		},
		
		submit: function() {
			$('.messagebox')[0].innerHTML = _("common_saving");//"保存中，请稍后..."
			$('.messagebox').show();
			if (qosEnable == 0) {
				if ($(".forbid").length == 0) {
					this.submitData.forbidMacList = 0;
				} else {
					this.submitData.forbidMacList = $(".forbid").map(function () {
						return $(this).attr("data-mac");
					}).get().join("~");
				}
			} else {
				var forbidMacList = [],
					qosList = [];
				$(".netctrl-table1 select").each(function () {
					if (this.value == 0) {
						forbidMacList.push($(this).attr("data-mac"));
					} else {
						qosList.push($(this).attr("data-ip") + "," + this.value);
					}
				});
				this.submitData.forbidMacList = forbidMacList.join("~");
				this.submitData.qosList = qosList.join("~");
			}
			$.post('/goform/setClientList', this.submitData, function (req) {
				setTimeout(function () {
					$('.messagebox').hide();
					window.location.reload();
				}, 1500);
				$('.messagebox')[0].innerHTML = _("common_saved");//"数据保存成功!"
			});
		}
	}
}
$(function () {
	translate();
	client.getData();
}); 
