var App = function () {
	// IE mode
	var isRTL = false;
	var isIE8 = false;
	var isIE9 = false;
	var isIE10 = false;

	var resizeHandlers = [];

	var assetsPath = '../assets/';

	var globalImgPath = 'global/img/';

	var globalPluginsPath = 'global/plugins/';

	var globalCssPath = 'global/css/';

	// initializes main settings
	var handleInit = function () {
		isIE8 = !!navigator.userAgent.match(/MSIE 8.0/);
		isIE9 = !!navigator.userAgent.match(/MSIE 9.0/);
		isIE10 = !!navigator.userAgent.match(/MSIE 10.0/);

		if (isIE10) {
			$('html').addClass('ie10'); // detect IE10 version
		}

		if (isIE10 || isIE9 || isIE8) {
			$('html').addClass('ie'); // detect IE10 version
		}
	};

	// runs callback functions set by App.addResponsiveHandler().
	var _runResizeHandlers = function () {
		// reinitialize other subscribed elements
		for (var i = 0; i < resizeHandlers.length; i++) {
			var each = resizeHandlers[i];
			each.call();
		}
	};

	// handle the layout reinitialization on window resize
	var handleOnResize = function () {
		var resize;
		if (isIE8) {
			var currheight;
			$(window).resize(function () {
				if (currheight == document.documentElement.clientHeight) {
					return; //quite event since only body resized not window.
				}
				if (resize) {
					clearTimeout(resize);
				}
				resize = setTimeout(function () {
					_runResizeHandlers();
				}, 50); // wait 50ms until window resize finishes.
				currheight = document.documentElement.clientHeight; // store last body client height
			});
		} else {
			$(window).resize(function () {
				if (resize) {
					clearTimeout(resize);
				}
				resize = setTimeout(function () {
					_runResizeHandlers();
				}, 50); // wait 50ms until window resize finishes.
			});
		}

		$(window).bind("load resize", function () {
			var topOffset = 50;
			var width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
			if (width < 768) {
				$('div.navbar-collapse').addClass('collapse');
				topOffset = 100; // 2-row-menu
			} else {
				$('div.navbar-collapse').removeClass('collapse');
			}

			var height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
			var height = height - topOffset;
			if (height < 1) height = 1;
			if (height > topOffset) {
				$("#page-wrapper").css("min-height", (height) + "px");
			}
		});

		var url = window.location;
		var element = $('ul.nav a').filter(function () {
			return this.href == url || url.href.indexOf(this.href) == 0;
		}).addClass('active').parent().parent().addClass('in').parent();
		if (element.is('li')) {
			element.addClass('active');
		}
	};

	// Fix input placeholder issue for IE8 and IE9
	var handleFixInputPlaceholderForIE = function () {
		//fix html5 placeholder attribute for ie7 & ie8
		if (isIE8 || isIE9) { // ie8 & ie9
			// this is html5 placeholder fix for inputs, inputs with placeholder-no-fix class will be skipped(e.g: we need this for password fields)
			$('input[placeholder]:not(.placeholder-no-fix), textarea[placeholder]:not(.placeholder-no-fix)').each(function () {
				var input = $(this);

				if (input.val() === '' && input.attr("placeholder") !== '') {
					input.addClass("placeholder").val(input.attr('placeholder'));
				}

				input.focus(function () {
					if (input.val() == input.attr('placeholder')) {
						input.val('');
					}
				});

				input.blur(function () {
					if (input.val() === '' || input.val() == input.attr('placeholder')) {
						input.val(input.attr('placeholder'));
					}
				});
			});
		}
	};

	// handle group element heights
	var handleHeight = function () {
		$('[data-auto-height]').each(function () {
			var parent = $(this);
			var items = $('[data-height]', parent);
			var height = 0;
			var mode = parent.attr('data-mode');
			var offset = parseInt(parent.attr('data-offset') ? parent.attr('data-offset') : 0);

			items.each(function () {
				if ($(this).attr('data-height') == "height") {
					$(this).css('height', '');
				} else {
					$(this).css('min-height', '');
				}

				var height_ = (mode == 'base-height' ? $(this).outerHeight() : $(this).outerHeight(true));
				if (height_ > height) {
					height = height_;
				}
			});

			height = height + offset;

			items.each(function () {
				if ($(this).attr('data-height') == "height") {
					$(this).css('height', height);
				} else {
					$(this).css('min-height', height);
				}
			});

			if (parent.attr('data-related')) {
				$(parent.attr('data-related')).css('height', parent.height());
			}
		});
	};

	// Handles Bootstrap Tabs.
	var handleTabs = function (option) {
		if ($().tabdrop) {
			if (option)
				$('.tabbable-tabdrop .nav-pills, .tabbable-tabdrop .nav-tabs').tabdrop(option);
			else
				$('.tabbable-tabdrop .nav-pills, .tabbable-tabdrop .nav-tabs').tabdrop(option);
		}
	};

	var addTab = function (id, title, content) {
		if ($('.tabbable .tab-content div[id="' + id + '"]').length === 0) {
			if ($('.tabbable').length === 0) {
				var tabs = '<div class="tabbable tabbable-tabdrop tabbable-close"><ul class="nav nav-tabs"></ul><div class="tab-content"></div></div>';
				$('.page-content-body').append(tabs);
			}

			var li = '<li><a id="tab' + id + '" href="#' + id + '" data-toggle="tab">' + title + '<span id="tabclose' + id + '" class="tab-close fa fa-close"></span></a></li>';
			var content = '<div class="tab-pane" id="' + id + '">' + content + '</div>';
			$('.tabbable .nav-tabs').append(li);
			$('.tabbable .tab-content').append(content);

			handleTabs('layout');
			$('#tabclose' + id).on('click', function () {
				var nextSelect = $(this).closest("li").prev('li:not(.dropdown)');
				if (nextSelect.length === 0) {
					nextSelect = $(this).closest("li").next('li:not(.dropdown)')
				}

				$(this).closest("li").remove();
				$('.tabbable .tab-content div[id="' + id + '"]').remove();

				if (nextSelect.length > 0) {
					$(nextSelect).find('a').tab('show');
				}

				handleTabs('layout');
			});
		}

		$('#tab' + id).tab('show');
	};

	//* END:CORE HANDLERS *//

	return {

		//main function to initiate the theme
		init: function () {
			//Core handlers
			handleInit(); // initialize core variables
			handleOnResize(); // set and handle responsive

			handleTabs(); // handle tabs
			//Handle group element heights
			this.addResizeHandler(handleHeight); // handle auto calculating height on window resize

			// Hacks
			handleFixInputPlaceholderForIE(); //IE8 & IE9 input placeholder issue fix

			$.fn.modal.Constructor.prototype.enforceFocus = function () {
			};

			$.fn.select2.defaults.set("theme", "bootstrap");
			Messenger.options = {
				extraClasses: 'messenger-fixed messenger-on-top',
				theme: 'air'
			};

			// handle ajax link within main content
			$('.sidebar-nav').on('click', '.ajaxify', function (e) {
				e.preventDefault();
				var url = $(this).attr("href");
				var pageContentBody = $('.page-content-body');
				var id = $(this).attr('data-code');
				var title = $(this).text();
				App.startPageLoading();

				$.ajax({
					type: "GET",
					cache: false,
					url: url,
					dataType: "html",
					success: function (res) {
						App.stopPageLoading();
						addTab(id, title, res);
					},
					error: function (xhr, ajaxOptions, thrownError) {
						addTab(id, title, '<h4>找不到指定页面！</h4>');
						App.stopPageLoading();
					}
				});
			});
		},

		//public function to remember last opened popover that needs to be closed on click
		setLastPopedPopover: function (el) {
			lastPopedPopover = el;
		},

		//public function to add callback a function which will be called on window resize
		addResizeHandler: function (func) {
			resizeHandlers.push(func);
		},

		//public functon to call _runresizeHandlers
		runResizeHandlers: function () {
			_runResizeHandlers();
		},

		initSlimScroll: function(el) {
			$(el).each(function() {
				if ($(this).attr("data-initialized")) {
					return; // exit
				}

				var height;

				if ($(this).attr("data-height")) {
					height = $(this).attr("data-height");
				} else {
					height = $(this).css('height');
				}

				$(this).slimScroll({
					allowPageScroll: true, // allow page scroll when the element scroll is ended
					size: '7px',
					color: ($(this).attr("data-handle-color") ? $(this).attr("data-handle-color") : '#bbb'),
					wrapperClass: ($(this).attr("data-wrapper-class") ? $(this).attr("data-wrapper-class") : 'slimScrollDiv'),
					railColor: ($(this).attr("data-rail-color") ? $(this).attr("data-rail-color") : '#eaeaea'),
					position: isRTL ? 'left' : 'right',
					height: height,
					alwaysVisible: ($(this).attr("data-always-visible") == "1" ? true : false),
					railVisible: ($(this).attr("data-rail-visible") == "1" ? true : false),
					disableFadeOut: true
				});

				$(this).attr("data-initialized", "1");
			});
		},

		// wrApper function to  block element(indicate loading)
		blockUI: function (options) {
			options = $.extend(true, {}, options);
			var html = '';
			if (options.animate) {
				html = '<div class="loading-message ' + (options.boxed ? 'loading-message-boxed' : '') + '">' + '<div class="block-spinner-bar"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>' + '</div>';
			} else if (options.iconOnly) {
				html = '<div class="loading-message ' + (options.boxed ? 'loading-message-boxed' : '') + '"><img src="' + this.getGlobalImgPath() + 'loading-spinner-grey.gif" align=""></div>';
			} else if (options.textOnly) {
				html = '<div class="loading-message ' + (options.boxed ? 'loading-message-boxed' : '') + '"><span>&nbsp;&nbsp;' + (options.message ? options.message : 'LOADING...') + '</span></div>';
			} else {
				html = '<div class="loading-message ' + (options.boxed ? 'loading-message-boxed' : '') + '"><img src="' + this.getGlobalImgPath() + 'loading-spinner-grey.gif" align=""><span>&nbsp;&nbsp;' + (options.message ? options.message : 'LOADING...') + '</span></div>';
			}

			if (options.target) { // element blocking
				var el = $(options.target);
				if (el.height() <= ($(window).height())) {
					options.cenrerY = true;
				}
				el.block({
					message: html,
					baseZ: options.zIndex ? options.zIndex : 1000,
					centerY: options.cenrerY !== undefined ? options.cenrerY : false,
					css: {
						top: '10%',
						border: '0',
						padding: '0',
						backgroundColor: 'none'
					},
					overlayCSS: {
						backgroundColor: options.overlayColor ? options.overlayColor : '#555',
						opacity: options.boxed ? 0.05 : 0.1,
						cursor: 'wait'
					}
				});
			} else { // page blocking
				$.blockUI({
					message: html,
					baseZ: options.zIndex ? options.zIndex : 1000,
					css: {
						border: '0',
						padding: '0',
						backgroundColor: 'none'
					},
					overlayCSS: {
						backgroundColor: options.overlayColor ? options.overlayColor : '#555',
						opacity: options.boxed ? 0.05 : 0.1,
						cursor: 'wait'
					}
				});
			}
		},

		// wrApper function to scroll(focus) to an element
		scrollTo: function(el, offeset) {
			var pos = (el && el.size() > 0) ? el.offset().top : 0;

			if (el) {
				if ($('body').hasClass('page-header-fixed')) {
					pos = pos - $('.page-header').height();
				} else if ($('body').hasClass('page-header-top-fixed')) {
					pos = pos - $('.page-header-top').height();
				} else if ($('body').hasClass('page-header-menu-fixed')) {
					pos = pos - $('.page-header-menu').height();
				}
				pos = pos + (offeset ? offeset : -1 * el.height());
			}

			$('html,body').animate({
				scrollTop: pos
			}, 'slow');
		},

		// wrApper function to  un-block element(finish loading)
		unblockUI: function (target) {
			if (target) {
				$(target).unblock({
					onUnblock: function () {
						$(target).css('position', '');
						$(target).css('zoom', '');
					}
				});
			} else {
				$.unblockUI();
			}
		},

		startPageLoading: function (options) {
			if (options && options.animate) {
				$('.page-spinner-bar').remove();
				$('body').append('<div class="page-spinner-bar"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>');
			} else {
				$('.page-loading').remove();
				$('body').append('<div class="page-loading"><img src="' + this.getGlobalImgPath() + 'loading-spinner-grey.gif"/>&nbsp;&nbsp;<span>' + (options && options.message ? options.message : '正在加载...') + '</span></div>');
			}
		},

		stopPageLoading: function () {
			$('.page-loading, .page-spinner-bar').remove();
		},

		alert: function (options) {

			options = $.extend(true, {
				container: "", // alerts parent container(by default placed after the page breadcrumbs)
				place: "append", // "append" or "prepend" in container
				type: 'success', // alert's type
				message: "", // alert's message
				close: true, // make alert closable
				reset: true, // close all previouse alerts first
				focus: true, // auto scroll to the alert after shown
				closeInSeconds: 0, // auto close after defined seconds
				icon: "" // put icon before the message
			}, options);

			var id = App.getUniqueID("App_alert");

			var html = '<div id="' + id + '" class="custom-alerts alert alert-' + options.type + ' fade in">' + (options.close ? '<button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button>' : '') + (options.icon !== "" ? '<i class="fa-lg fa fa-' + options.icon + '"></i>  ' : '') + options.message + '</div>';

			if (options.reset) {
				$('.custom-alerts').remove();
			}

			if (!options.container) {
				if ($('body').hasClass("page-container-bg-solid") || $('body').hasClass("page-content-white")) {
					$('.page-title').after(html);
				} else {
					if ($('.page-bar').size() > 0) {
						$('.page-bar').after(html);
					} else {
						$('.page-breadcrumb').after(html);
					}
				}
			} else {
				if (options.place == "append") {
					$(options.container).append(html);
				} else {
					$(options.container).prepend(html);
				}
			}

			if (options.focus) {
				App.scrollTo($('#' + id));
			}

			if (options.closeInSeconds > 0) {
				setTimeout(function () {
					$('#' + id).remove();
				}, options.closeInSeconds * 1000);
			}

			return id;
		},

		//wrApper function to update/sync jquery uniform checkbox & radios
		updateUniform: function (els) {
			$.uniform.update(els); // update the uniform checkbox & radios UI after the actual input control state changed
		},

		//public function to get a paremeter by name from URL
		getURLParameter: function (paramName) {
			var searchString = window.location.search.substring(1),
				i, val, params = searchString.split("&");

			for (i = 0; i < params.length; i++) {
				val = params[i].split("=");
				if (val[0] == paramName) {
					return unescape(val[1]);
				}
			}
			return null;
		},

		getUniqueID: function (prefix) {
			return 'prefix_' + Math.floor(Math.random() * (new Date()).getTime());
		},

		// check IE8 mode
		isIE8: function () {
			return isIE8;
		},

		// check IE9 mode
		isIE9: function () {
			return isIE9;
		},

		//check RTL mode
		isRTL: function () {
			return isRTL;
		},

		getAssetsPath: function () {
			return assetsPath;
		},

		setAssetsPath: function (path) {
			assetsPath = path;
		},

		setGlobalImgPath: function (path) {
			globalImgPath = path;
		},

		getGlobalImgPath: function () {
			return assetsPath + globalImgPath;
		},

		setGlobalPluginsPath: function (path) {
			globalPluginsPath = path;
		},

		getGlobalPluginsPath: function () {
			return assetsPath + globalPluginsPath;
		},

		getGlobalCssPath: function () {
			return assetsPath + globalCssPath;
		},

		getResponsiveBreakpoint: function (size) {
			// bootstrap responsive breakpoints
			var sizes = {
				'xs': 480,     // extra small
				'sm': 768,     // small
				'md': 992,     // medium
				'lg': 1200     // large
			};

			return sizes[size] ? sizes[size] : 0;
		}
	};

}();

jQuery(document).ready(function () {
	App.init(); // init metronic core componets
});