var boxWidth, barWidth, isTouch = typeof document.body.ontouchstart != "undefined";
function $(a) {
	return document.getElementById(a)
}
function rotate(e, a, d, g) {
	var b = Math.sin(e * Math.PI / 180),
	f = Math.cos(e * Math.PI / 180);
	if (this.filters) {
		if (g) {
			this.style.filter = "progid:DXImageTransform.Microsoft.Matrix(M11=" + f.toFixed(4) + ",M21=" + b.toFixed(4) + ",M12=" + (-b).toFixed(4) + ",M22=" + f.toFixed(4) + ",SizingMethod='auto expand')";
			if (e < 90) {
				this.style.left = d - (a * f) + a + "px";
				this.style.top = d - (d * f + a * b) + "px"
			} else {
				if (e < 180) {
					this.style.left = d + a * f + a + "px";
					this.style.top = d - a * b + "px"
				} else {
					if (e < 270) {
						this.style.left = d + (d * b + a * f) + a + "px";
						this.style.top = d + (a * b) + "px"
					} else {
						this.style.left = d * b - a * f + d + a + "px";
						this.style.top = a * b - d * f + d + "px"
					}
				}
			}
		} else {
			this.style.filter = "progid:DXImageTransform.Microsoft.Matrix(Dx=" + (a * (1 + b - f)).toFixed(2) + ",Dy=" + (d * (1 - b - f)).toFixed(2) + ",M11=" + f.toFixed(4) + ",M21=" + b.toFixed(4) + ",M12=" + (-b).toFixed(4) + ",M22=" + f.toFixed(4) + ")"
		}
	} else {
		this.style.transform = this.style.webkitTransform = this.style.mozTransform = this.style.oTransform = "matrix(" + f.toFixed(4) + "," + b.toFixed(4) + "," + (-b).toFixed(4) + "," + f.toFixed(4) + ",0,0)"
	}
}
function ajax(b) {
	var a = new XMLHttpRequest();
	b.beforeSend && b.beforeSend();
	a.onreadystatechange = function () {
		this.readyState == 4 && this.status == 200 && b.success && b.success(b.dataType == "xml" ? this.responseXML : b.dataType == "json" ? (typeof JSON == "undefined" ? (new Function("return " + this.responseText))() : JSON.parse(this.responseText)) : this.responseText)
	};
	a.open(b.type || "GET", b.url, b.async || true);
	b.type == "POST" && a.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	a.send(b.data || null)
}
function Lottery(a) {
	this.r = 0;
	this.v = 0.5;
	this.rCount = 3;
	this.context = a;
	this.t = 0;
	this.isLoaded = 0;
	this.isRun = 0
}
Lottery.prototype = {
	run : function () {
		var a = this,
		b = this.context.children[0];
		this.isRun = 1;
		(function () {
			a.v = a.isLoaded && a.r + 300 > a.t ? Math.max(0.2, (a.t - a.r) / 60) : Math.min(5, Math.max(0.5, a.r / 60));
			a.r += a.v;
			if (a.isLoaded && a.t - a.r < 0.5) {
				rotate.call(b, a.t, boxWidth / 2, boxWidth / 2, 0);
				if (a.result === 16) {
					hmPrize.sunny(a.url)
				} else {
					hmPrize.result(a.result, a.url);
					a.isRun = 0
				}
			} else {
				rotate.call(b, a.r, boxWidth / 2, boxWidth / 2, 0);
				a.timer = setTimeout(arguments.callee, 16.7)
			}
		})()
	},
	get : function (a) {
		var b = this;
		ajax({
			url : a + "?len=16&r=" + Math.random(),
			dataType : "json",
			success : function (d) {
				if (typeof d == "object") {
					if (d.status === 1) {
						var c = hmPrize.info.length - 1,
						e = d.data["count"],
						f = d.data["prize"];
						if (e < 1) {
							b.stop();
							alert("无抽奖次数！")
						} else {
							b.t = (c - f) * 360 / c - 180 / c + 360 * Math.abs((b.rCount - b.r / 360) | 1);
							b.result = f;
							b.url = d.data["url"];
							b.isLoaded = 1;
							$("counter").innerHTML = e - 1
						}
					} else {
						if (d.status === 9) {
							var c = hmPrize.info.length - 1;
							b.t = (c - 10) * 360 / c - 180 / c + 360 * Math.abs((b.rCount - b.r / 360) | 1);
							b.result = 16;
							b.url = d.data["url"];
							b.isLoaded = 1;
							$("counter").innerHTML = 0
						} else {
							b.stop();
							alert(d.message);
							showAcc()
						}
					}
				} else {
					b.stop();
					alert("出错，请重新抽奖。")
				}
			}
		})
	},
	stop : function () {
		clearTimeout(this.timer);
		rotate.call(this.context.children[0], 0, boxWidth / 2, boxWidth / 2, 0);
		this.r = 0
	},
	reset : function () {
		this.r = this.r % 360;
		this.v = 0.5;
		this.t = 0;
		this.isLoaded = 0;
		this.isRun = 0
	}
};
var hmPrize = {
	imgpath : "images/lottery/",
	info : [["prize_0.png", "天猫国际优惠券：<br />100张10元无门槛，有效期11月13日~11月30日"], ["prize_1.png", "不用卖肾也可以得到一台iPhone6 plus？来吧亲，敢抽就敢让你中！<br />（1名，色彩随机）"], ["prize_2.png", " 全球购优惠券：<br />100张10元门槛优惠券，有效期12月1日~12月13日"], ["prize_3.png", "蜜丝佛陀<br />蜜丝佛陀双效锁色亮<br />泽唇彩：10个"], ["prize_4.png", "抽中“免单大奖”的亲，双十一全部在话梅的消费都免费啦！<br />（1名）"], ["prize_5.png", "HARMAY话梅：<br />自主品牌加湿器200个"], ["prize_6.png", "天猫国际优惠券：<br />100张20元无门槛，有效期12月1日~12月31日"], ["prize_7.png", "薇姿<br />泉之净滢润泡沫洁面霜125ml：20个"], ["prize_8.png", "京东优惠券：<br />20张满299减50优惠券<br />有效期11月13日~11月30日"], ["prize_9.png", "现金奖：<br />敢点，十张“毛爷爷”就跟你回家<br />（1名）"], ["prize_10.png", "谢谢参与！"], ["prize_11.png", "理肤泉<br />舒缓调理喷雾300ml：20个"], ["prize_12.png", "天猫优惠券：<br />200张10元无门槛，有效期11月13日~12月31日"], ["prize_13.png", "碧欧泉<br />圣诞盖毯：20个"], ["prize_14.png", "淘宝店双十二20元无门槛优惠券"], ["prize_15.png", "安娜苏<br />Q版洋娃娃女士香水礼盒：10个"], ["prize_14.png", "阳光普照：<br />淘宝店双十二20元无门槛优惠券"]],
	box : {},
	show : function (c, b) {
		if (typeof c == "undefined") {
			return
		}
		b = b || event;
		var e = document.body.getBoundingClientRect(),
		a = b.clientX - e.left,
		f = b.clientY - e.top + 120,
		d = this.box[c];
		if (!d) {
			this.box[c] = d = document.createElement("div");
			d.innerHTML = '<div><img src="' + this.imgpath + this.info[c][0] + '" alt="" /></div><div>' + this.info[c][1] + "</div>";
			document.body.appendChild(d)
		}
		if (a + 360 > e.right - e.left) {
			d.style.left = a - 20 - 360 + "px";
			d.className = "prize_box prize_box2"
		} else {
			d.style.left = a + "px";
			d.className = "prize_box"
		}
		d.style.top = f + "px";
		d.style.display = "block"
	},
	touchShow : function (a) {
		var b = this.box[a];
		if (!b) {
			this.box[a] = b = document.createElement("div");
			b.className = "cover";
			b.innerHTML = '<div class="prize_box"><div><img src="' + this.imgpath + this.info[a][0] + '" alt="" /></div><div>' + this.info[a][1] + "</div></div>";
			document.body.appendChild(b);
			b.onclick = function () {
				this.style.display = "none"
			}
		}
		b.style.display = "block"
	},
	hide : function (a) {
		if (typeof a == "undefined") {
			return
		}
		this.box[a] && (this.box[a].style.display = "none")
	},
	moveout : function (a) {
		hmPrize.hide(this.idx)
	},
	result : function (d, a) {
		if (d == 10) {
			return
		}
		var c = $("resultList"),
		b = document.createElement("i");
		b.idx = d;
		b.setAttribute("data-url", a);
		b.tabIndex = -1;
		b.hideFocus = true;
		b.style.backgroundImage = "url(" + this.imgpath + this.info[d][0] + ")";
		c.appendChild(b)
	},
	sunny : function (a) {
		var b = $("sunny");
		if (!b) {
			b = document.createElement("div");
			b.id = "sunny";
			b.className = "cover";
			b.innerHTML = '<div><img src="' + this.imgpath + this.info[16][0] + '" alt="" />没抽中奖品的亲，别气馁哦~还有淘宝双十二的20元现金券送给你！<br />阳光普照奖：<br />淘宝店双十二20元无门槛优惠券（仅限淘宝双十二当天使用）<span>点击领取</span></div>';
			document.body.appendChild(b);
			b.firstChild.onclick = function () {
				window.open(this.url);
				this.parentNode.style.display = "none"
			}
		}
		b.firstChild.url = a;
		b.style.display = "block"
	}
};
(function () {
	var d = document.getElementById("lottery"),
	q = new Lottery(d),
	n = hmPrize.info,
	k = n.length - 1,
	b = 360 / k,
	p = document.createElement("span"),
	o = document.createElement("i"),
	e,
	a = document.createDocumentFragment(),
	f = $("resultList");
	boxWidth = d.clientWidth;
	barWidth = boxWidth * 0.124;
	while (k--) {
		e = p.cloneNode(false);
		o = o.cloneNode(false);
		o.idx = k;
		e.appendChild(o);
		rotate.call(e, k * b + b / 2, barWidth / 2, boxWidth / 2, 1);
		a.appendChild(e)
	}
	d.children[0].appendChild(a);
	d.onclick = function (s) {
		if (q.isRun) {
			return
		}
		s = s || event;
		var i = s.target || s.srcElement;
		if (i.tagName == "I" && isTouch) {
			hmPrize.touchShow(i.idx)
		} else {
			if (i.className == "btn") {
				var r = $("counter").innerHTML;
				if (r == "N") {
					location.href = "/entry"
				} else {
					if (r == "0") {
						alert("您已无抽奖次数！")
					} else {
						q.reset();
						q.get("/lotteryAjax");
						q.run()
					}
				}
			}
		}
	};
	f.onclick = function (s) {
		s = s || event;
		var r = s.target || s.srcElement,
		i;
		if (r.tagName == "I") {
			i = r.getAttribute("data-url");
			if (i) {
				window.open(i)
			} else {
				if (r.onblur == null) {
					r.onblur = hmPrize.moveout
				}
				isTouch ? hmPrize.touchShow(r.idx) : hmPrize.show(r.idx, s)
			}
		}
	};
	if (!isTouch) {
		d.onmousemove = function (r) {
			r = r || event;
			r.preventDefault && r.preventDefault();
			var i = r.target || r.srcElement;
			if (i.tagName == "I") {
				if (i.onmouseout == null) {
					i.onmouseout = hmPrize.moveout
				}
				hmPrize.show(i.idx, r)
			}
		}
	}
	var h = $("accCover");
	h.onclick = function (r) {
		r = r || event;
		var i = r.target || r.srcElement;
		if (i == this) {
			this.style.display = "none"
		}
	};
	h.children[0].onsubmit = function () {
		var r = this.getAttribute("action"),
		t = this.elements,
		s = t.length - 1,
		u = [];
		this.parentNode.style.display = "none";
		while (s--) {
			t[s].disabled || u.push(t[s].name + "=" + encodeURIComponent(t[s].value))
		}
		ajax({
			url : r,
			type : "POST",
			data : u.join("&"),
			success : function (i) {
				if (isNaN(i)) {
					alert(i)
				} else {
					if (i === "-1") {
						location.href = "/entry"
					} else {
						location.reload()
					}
				}
			}
		});
		return false
	};
	var m = $("acc_btn");
	m && (m.onclick = function () {
		if (q.isRun) {
			return
		}
		$("accCover").style.display = "block"
	});
	o = f.children;
	k = o.length;
	while (k--) {
		o[k].tabIndex = -1;
		o[k].hideFocus = true;
		o[k].style.backgroundImage = "url(" + hmPrize.imgpath + hmPrize.info[o[k].idx = o[k].getAttribute("data-idx")][0] + ")"
	}
	var j = $("userlist"),
	c = function () {
		var r = j.sH,
		v = j.liH,
		u = j.scrollTop,
		i = 0;
		(function () {
			i += (v - i) * 0.2;
			if (Math.abs(i - v) < 1) {
				j.scrollTop = u + v >= r ? 0 : u + v;
				r = v = u = i = null
			} else {
				j.scrollTop = u + i;
				setTimeout(arguments.callee, 16.7)
			}
		})()
	};
	if (!isTouch && j.scrollHeight > j.clientHeight) {
		j.sH = j.scrollHeight;
		j.appendChild(j.children[0].cloneNode(true));
		j.liH = j.children[0].children[0].offsetHeight;
		j.timer = setInterval(c, 2000);
		j.onmouseover = function () {
			clearInterval(this.timer)
		};
		j.onmouseout = function (r) {
			r = r || event;
			var i = r.relatedTarget || r.toElement;
			if (!this.contains(i)) {
				clearInterval(this.timer);
				this.timer = setInterval(c, 2000)
			}
		}
	}
	var g = $("mobile_index"),
	l = $("mobile_login");
	if (g) {
		if (isTouch && !sessionStorage.getItem("mobile_index")) {
			scrollTo(0, 0);
			g.ontouchstart = function (i) {
				i.preventDefault();
				i.stopPropagation();
				this.style.display = "none";
				sessionStorage.setItem("mobile_index", 1)
			}
		} else {
			g.style.display = "none"
		}
	}
	if (l && !isTouch) {
		l.style.display = "none"
	}
})();
