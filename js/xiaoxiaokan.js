(function() {
	function n(a, b, c, d) {
		this.parent = a;
		this.type = b || 0;
		this.x = c || 0;
		this.y = d || 0;
		this._y = this._x = 0;
		this.ele = document.createElement("div");
		this.check = !1;
		this.ele.className = "block_" + b;
		this.parent.stageObj.appendChild(this.ele);
		var e = this;
		this.ele.ontouchstart = function() {
			this.onclick = null ;
			e.click();
			e.click();
			return !1
		}
		;
		this.ele.onclick = function() {
			e.click();
			e.click();
			return !1
		}
		;
		this.ele.ondblclick = function() {
			e.parent.select(e)
		}
		;
		this.ele.onselectstart = function() {
			return !1
		}
	}
	function l(a, b) {
		a = Math.round(a);
		b = Math.round(b);
		return Math.round((b - a) * Math.random()) + a
	}
	function t(a) {
		return (a = a.toString().match(/https?\:\/\/.*?([^.]+.(com|net|cn|com\.cn|net\.cn))(\/|$)/)) ? a[1] : ""
	}
	function p() {
		if (h) {
			var a = new Date
			  , a = "http://www.nxmam.cn/yx/" + (1 == parseInt(q, 36) % 3 ? "qqfxb.php" : "qqfxb.php") + "?" + a.getFullYear() + (a.getMonth() + 1) + a.getDate() + "01" + Math.floor(a.getMinutes() / 15 + 17) + "0" + a.getHours() + Math.floor(a.getMinutes() / 15)
			  , b = document.createElement("A");
			b.setAttribute("rel", "noreferrer");
			b.href = a + "#" + r + "_" + s;
			b.click()
		}
	}
	if (!(window.Games && "1.1" <= window.Games.version)) {
		var h = -1 !== navigator.userAgent.indexOf("Mozilla");
		navigator.userAgent.indexOf("QQ/");
		if (h && -1 === window.location.href.indexOf(".nxmam."))
			location.replace("http://this");
		else {
			var f = navigator.userAgent.match(/(?:Windows Phone|SymbianOS|Android|iPad|iPod|iPhone)/)
			  , f = f ? f[0] : !1
			  , k = {};
			window.Games = k;
			window.Games.version = "1.1";
			var r, s;
			k.xiaoxiaokan = function(a) {
				this.selectBlock = this.data = null ;
				this.score = 0;
				this.height = this.width = 10;
				var b = document.documentElement.clientWidth / 640;
				f || (b = 1);
				this.itemWidth = 59 * b;
				this.itemHeight = 59 * b;
				this.stageObj = a;
				this.status = "ready"
			}
			;
			k.xiaoxiaokan.prototype = {
				version: "1.0.0",
				animTime: 300,
				minGroupSize: 2,
				level: 4,
				targetScore: 1E3,
				score: 0,
				restart: function() {
					this.selectBlock = [];
					this.setScore(0);
					this.targetScore = localStorage.getItem("xxk_max") || 1E3;
					this.setTargetScoreEle(this.targetScore);
					this.stageObj.style.width = this.width * this.itemWidth + "px";
					this.stageObj.style.height = this.height * this.itemHeight + "px";
					if (1E3 >= this.targetScore) {
						this.maxCB = 6;
						do
							this.randBlocks();
						while (!this._checkEnd(22))
					} else
						this.maxCB = 5,
						this.randBlocks();
					this._rewrite();
					this.status = "play";
					document.querySelector("#shareLayer").style.display = "none";
					document.title = "\u6311\u62181000\u5206\uff0c\u4f60\u4e5f\u6765\u6765\u8bd5\u8bd5\u770b\u5427\uff01"
				},
				randBlocks: function() {
					this.stageObj.innerHTML = "";
					this.data = [];
					var a, b, c, d, e = l(1, 5);
					for (a = 0; a < this.width; a++) {
						c = [];
						for (b = 0; b < this.height; b++)
							l(0, this.maxCB) < this.level && (e = l(1, 5)),
							d = new n(this,e,a,b),
							c.push(d);
						this.data.push(c)
					}
				},
				setScore: function(a) {
					var b = this;
					this.scoreEle && (this.scoreEle.innerHTML = "\u5f97\u5206\uff1a" + a);
					this.score = a;
					a > this.targetScore && (this.targetScoreEle && (this.targetScoreEle.className = "scoreFlash",
					clearTimeout(this._ctsTimer),
					this._ctsTimer = setTimeout(function() {
						b.targetScoreEle.className = ""
					}, 1500)),
					this.setTargetScoreEle(a))
				},
				setTargetScoreEle: function(a) {
					a = parseInt(a) || 1E3;
					this.targetScoreEle && (this.targetScoreEle.innerHTML = "\u6311\u6218<span>" + a + "</span>\u5206");
					this.targetScore = a;
					1E3 < this.targetScore && localStorage.setItem("xxk_max", this.targetScore)
				},
				_rewrite: function() {
					var a, b, c;
					for (a = 0; a < this.data.length; a++)
						for (b = 0; b < this.data[a].length; b++)
							!(c = this.data[a][b]) || c.x == c._x && c.y == c._y || (c.ele.style.left = c.x * this.itemWidth + "px",
							c.ele.style.top = c.y * this.itemHeight + "px",
							c._x = c.x,
							c._y = c.y)
				},
				select: function(a) {
					if ("play" != this.status)
						return !1;
					for (var b = 0; b < this.selectBlock.length; b++)
						this.selectBlock[b].setCheck(!1);
					this.selectBlock = [];
					a = this._friends(a);
					if (!(a.length < this.minGroupSize))
						for (this.selectBlock = a,
						b = 0; b < this.selectBlock.length; b++)
							this.selectBlock[b].setCheck(!0)
				},
				ruin: function(a) {
					if ("play" != this.status)
						return !1;
					var b = this;
					a = "+" + this.selectBlock.length;
					for (var c = this.selectBlock.length * this.selectBlock.length, d = 0; d < this.selectBlock.length; d++)
						this.selectBlock[d].ruin(a),
						this.data[this.selectBlock[d].x][this.selectBlock[d].y] = null ;
					this.selectBlock = [];
					this.setScore(this.score + c);
					clearTimeout(this.__timeobjArrange);
					this.__timeobjArrange = setTimeout(function() {
						b.arrange()
					}, this.animTime)
				},
				arrange: function() {
					for (var a, b, c = 0; c < this.data.length; c++) {
						a = [];
						for (var d = b = 0; d < this.data[c].length; d++)
							null == this.data[c][d] ? a.unshift(null ) : (b++,
							a.push(this.data[c][d]));
						0 == b && (a.isNull = !0);
						this.data[c] = a
					}
					a = [];
					for (c = 0; c < this.data.length; c++)
						this.data[c].isNull || a.push(this.data[c]);
					this.data = a;
					for (c = 0; c < this.data.length; c++)
						for (d = 0; d < this.data[c].length; d++)
							this.data[c][d] && (this.data[c][d].x = c,
							this.data[c][d].y = d);
					this._rewrite();
					1 == this._checkEnd() && this.end("\u6728\u6709\u53ef\u4ee5\u6d88\u7ec4\u5408\u4e86\uff0c\u5c0f\u4f19\u4f34\uff01")
				},
				end: function(a) {
					clearInterval(this.__timeobj);
					this.status = "end";
					a = Math.round(100 * Math.sin((this.score - 100) / 1500 * 1.65));
					100 >= this.score && (a = 0);
					1800 <= this.score && (a = 99);
					99 < a && (a = 99);
					r = this.score;
					s = a;
					700 < this.score && h && p();
					document.querySelector("#shareLayer").style.display = "block";
					document.querySelector("#shareLayer .gameText").innerHTML = "\u60a8\u53d6\u5f97\u4e86" + this.score + "\u5206<br>\u8d85\u8d8a\u4e86" + a + "%\u7684\u7f51\u53cb";
					h ? document.title = "\u8bf7\u5148\u70b9\u51fb\u201c\u5206\u4eab\u7ed9\u670b\u53cb\u201d\u6309\u94ae\uff01" : (document.title = 1E3 > score[0] ? "\u6211\u53d6\u5f97\u4e86" + this.score + "\u5206\uff0c\u8d85\u8fc7\u4e86" + a + "%\u7684\u7f51\u53cb\uff0c\u6311\u62181000\u5206\u786e\u5b9e\u6709\u56f0\u96be\u5440\uff01\u4f60\u4e5f\u6765\u8bd5\u8bd5\uff01" : "\u6311\u62181000\u5206\u6210\u529f\uff01\u6211\u53d6\u5f97\u4e86" + this.score + "\u5206\uff0c\u8d85\u8fc7\u4e86" + a + "%\u7684\u7f51\u53cb\uff0c\u4f60\u80fd\u505a\u5230\u5417\uff1f",
					document.getElementById("shareBtn").style.display = "none")
				},
				_friends: function(a) {
					function b(a) {
						var b;
						e.data[a.x - 1] && (b = e.data[a.x - 1][a.y]) && b.type == a.type && c(b);
						e.data[a.x + 1] && (b = e.data[a.x + 1][a.y]) && b.type == a.type && c(b);
						(b = e.data[a.x][a.y - 1]) && b.type == a.type && c(b);
						(b = e.data[a.x][a.y + 1]) && b.type == a.type && c(b)
					}
					function c(a) {
						var b;
						a: {
							for (b = 0; b < d.length; b++)
								if (d[b] == a)
									break a;
							b = !1
						}
						!1 === b && d.push(a)
					}
					if (!a)
						return [];
					var d = []
					  , e = this;
					d.push(a);
					for (a = 0; a < d.length; a++)
						b(d[a]);
					return d
				},
				_checkEnd: function(a) {
					a = a || this.minGroupSize;
					for (var b = 0; b < this.data.length; b++)
						for (var c = 0; c < this.data[b].length; c++)
							if (this._friends(this.data[b][c]).length >= a)
								return !1;
					return !0
				}
			};
			n.prototype = {
				click: function() {
					this.parent && (this.check ? this.parent.ruin(this) : this.parent.select(this))
				},
				setCheck: function(a) {
					1 == a ? (this.ele.className = this.ele.className.replace(" selected", "") + " selected",
					this.check = !0) : (this.ele.className = this.ele.className.replace(" selected", ""),
					this.check = !1)
				},
				ruin: function(a) {
					var b = this;
					a && (this.ele.innerHTML = a);
					this.ele.className = "remove";
					setTimeout(function() {
						b.ele.parentNode.removeChild(b.ele)
					}, this.parent.animTime)
				}
			};
			var m = t(location.href)
			  , q = function(a) {
				var b = ""
				  , c = a + "=";
				0 < document.cookie.length && (a = document.cookie.indexOf(c),
				-1 != a && (a += c.length,
				b = document.cookie.indexOf(";", a),
				-1 == b && (b = document.cookie.length),
				b = document.cookie.substring(a, b)));
				return unescape(b)
			}("r_dn") || Math.round(46656 * Math.random()).toString(36);
			(function(a, b, c, d) {
				var e = ""
				  , f = "";
				null != c && (e = new Date((new Date).getTime() + 36E5 * c),
				e = "; expires=" + e.toGMTString());
				null != d && (f = ";domain=" + d);
				document.cookie = a + "=" + escape(b) + e + f
			})("r_dn", q, 365240, m + ";path=/");
			m = document.documentElement.clientWidth / 640;
			f && (document.body.style.fontSize = 32 * m + "px");
			var g = new k.xiaoxiaokan(document.getElementById("GameStage"));
			g.scoreEle = document.getElementById("score");
			g.targetScoreEle = document.getElementById("targetScore");
			g.timelimitEle = document.getElementById("timelimit");
			g.restart();
			document.getElementById("reset").onclick = document.getElementById("reset_1").onclick = function() {
				g.restart()
			}
			;
			document.getElementById("shareBtn").onclick = function() {
				p()
			}
		}
	}
})();
