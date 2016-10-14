(function ($) {

	var Modal = function (container, options) {

		this.options = options;

		if (container === window || container === document) {
			this.options.local = false;
		} else {
			this.options.local = true;
		}

		this.container = this.options.local ? $(container) : $('body');
		this.containerWidth = this.options.local ? this.container.innerWidth() : $(window).width();
		this.containerHeight = this.options.local ? this.container.innerHeight() : $(document).height();
		this.options.before(this);
	};

	Modal.prototype.backdrop = function () {

		if (!this.options.backdrop || this.container.children('.En-modal-backdrop').length > 0) {
			return this;
		}

		var element = $('<div>').addClass('En-modal-backdrop')
			.appendTo(this.container)
			.css({
				width : this.options.local ? this.containerWidth : this.containerWidth + $(window).scrollLeft(),
				height : this.containerHeight
			})
			.fadeTo("slow", 0.6);

		if (!this.options.local) {
			$(window).on('resize scroll', function () {
				var win = $(window);
				element.css({
					height : win.height() + win.scrollTop(),
					width : win.width() + win.scrollLeft()
				});
			});
		}

		return this;
	};

	Modal.prototype.removeEvent = function () {

		var that = this;
		this.container.children('.En-modal').find('.En-modal-remove').click(function () {
			that.container.children('.En-modal').remove();
			that.container.children('.En-modal-backdrop').remove();
		});

		return this;
	};

	Modal.prototype.show = function () {

		var that = this;
		var element = this.container.children('.En-modal');
		element = element.length > 0 ? element : $('<div>').addClass('En-modal').appendTo(this.container);

		if (!this.options.local) {
			$(window).resize(function () {
				that.setPosition(element);
			});
		}

		if (this.options.local && this.container.css('position') !== 'absolute' && this.container.css('position') !== 'fixed') {
			this.container.css('position', 'relative');
		}

		element.html(this.options.content);
		this.setPosition(element);
		if (this.options.remote) {
			element.load(this.options.remote, function () {
				that.setPosition(element, true);
				that.options.after(that);
				that.removeEvent();
			});
		} else {
			this.options.after(this);
			this.removeEvent();
		}

		return this;
	};

	Modal.prototype.setPosition = function (element, isAnimate) {

		var width = element.width();
		var height = element.height();
		var winWidth = $(window).width();
		var top = this.options.local ? (height > this.containerHeight ? 0 : this.containerHeight / 2 / 10 - height / 2) : 100 + $(window).scrollTop();
		var left = this.options.local ? (width > this.containerWidth ? 0 : this.containerWidth / 2 - width / 2) : width > winWidth ? 0 + $(window).scrollLeft() : (winWidth / 2 + $(window).scrollLeft()) - width / 2;

		if (isAnimate) {
			element.animate({
				left : left
			}, 'fast');
		} else {
			element.css({
				top : top,
				left : left
			});
		}

		return this;
	};

	$.fn.modal = function (options) {
		var setings = $.extend($.fn.modal.defaults, options);
		this.each(function () {
			new Modal(this, setings).backdrop().show();
		});
		return this;
	};

	$.fn.modal.defaults = {
		local : false,
		backdrop : true,
		remote : false,
		content : '<p class="En-modal-loading"></p>',
		before : function () {},
		after : function () {}

	};
	$.fn.modal.Constructor = Modal;

})(jQuery);

/* example
 .En-modal{position:absolute;}
.En-modal-backdrop{top:0px;left: 0px;position:absolute;background-color:#999;opacity:0; filter:alpha(opacity=0);}
.En-modal-loading{background:url(img/modal.loading.gif) no-repeat; width: 16px; height: 11px;}
.En-modal-remove{cursor: pointer;} */