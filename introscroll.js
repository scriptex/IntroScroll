;(function(window, document, undefined) {
	var win = window;
	var doc = document;

	// Default settings
	var defaults = {
		element     : '#intro',
		wrapper     : '#wrapper',
		container   : '#container',
		trigger     : '#intro__link',
		scrollClass : 'is-scrolled',
		duration    : 1500,
		afterScroll : null
	};

	/**
	 * Merges default settings with user's
	 * @private
	 * @param  {Object} defaults         Default settings
	 * @param  {Object} options          User options
	 * @return {Object}                  Merged values of defaults and options
	 */
	function extend(defaults, options) {
		var extended = {};
		var prop;

		for ( prop in defaults ) {
			if ( defaults.hasOwnProperty(prop) ) {
				extended[prop] = defaults[prop];
			};
		};

		for ( prop in options ) {
			if ( options.hasOwnProperty(prop) ) {
				extended[prop] = options[prop];
			};
		};

		return extended;
	};

	/**
	 * Makes a DOM query and returns a DOM element
	 * @private 
	 * @param  {String}                 Selector
	 * @return {Object}                 DOM Element
	 */
	function getElement(element) {
		return doc.querySelector(element);
	};

	/**
	 * Creates custom events for touch gestures
	 * @private
	 * @param  {Object}   element       DOM element
	 * @return {Void}
	 */
	function swipe(element) {
		var touchstartX  = 0;
		var touchstartY  = 0;
		var touchendX    = 0;
		var touchendY    = 0;
		var onSwipeUp    = new Event('onswipeup');
		var onSwipeRight = new Event('onswiperight');
		var onSwipeDown  = new Event('onswipedown');
		var onSwipeLeft  = new Event('onswipeleft');
		var onTap        = new Event('tap');

		element.addEventListener('touchstart', function(event) {
		    touchstartX = event.changedTouches[0].screenX;
		    touchstartY = event.changedTouches[0].screenY;
		}, false);

		element.addEventListener('touchend', function(event) {
		    touchendX = event.changedTouches[0].screenX;
		    touchendY = event.changedTouches[0].screenY;

		    handleTouch();
		}, false);

		function handleTouch() {
		    if ( touchendX < touchstartX ) {
		        element.dispatchEvent(onSwipeLeft);
		    };

		    if ( touchendX > touchstartX ) {
		    	element.dispatchEvent(onSwipeRight);
		    };

		    if ( touchendY < touchstartY ) {
		    	element.dispatchEvent(onSwipeUp);
		    };

		    if ( touchendY > touchstartY ) {
		    	element.dispatchEvent(onSwipeDown);
		    };

		    if ( touchendY === touchstartY ) {
		        element.dispatchEvent(onTap);
		    };
		};
	};

	/**
	 * Initializes IntroScroll constructor
	 * @constructor
	 * @param  {Object}                 Settings
	 * @return {Void}                   IntroScroll instance
	 */
	function IntroScroll(options) {
		var settings = extend(defaults, options);

		this.element     = getElement(settings.element);
		this.wrapper     = getElement(settings.wrapper);
		this.container   = getElement(settings.container);
		this.trigger     = getElement(settings.trigger);
		this.scrollClass = settings.scrollClass;
		this.duration    = settings.duration || 1500;
		this.afterScroll = settings.afterScroll;
		this.isScrolling = false;

		this.init();
	};

	IntroScroll.prototype.init = function() {
		this.bind();
	};

	IntroScroll.prototype.bind = function() {
		var that = this;
		
		swipe(that.element);
		swipe(that.wrapper);

		that.element.addEventListener('mousewheel', function(event) {
			if ( event.deltaY > 0 ) {
				that.enableScroll();
			};
		}, false);

		that.element.addEventListener('onswipeup', function(event) {
			that.enableScroll();
		});

		that.wrapper.addEventListener('onswipedown', function(event) {
			if ( win.pageYOffset === 0 ) {
				that.disableScroll();
			};
		});

		that.container.addEventListener('mousewheel', function(event) {
			if ( event.deltaY < 0 && win.pageYOffset === 0 ) {
				that.disableScroll();
			};
		}, false);
		
		win.addEventListener('mousewheel', function(event) {
			if ( win.pageYOffset === 0 && that.wrapper.classList.contains(that.scrollClass) && event.deltaY < 0 ) {
				that.disableScroll();
			};
		}, false);

		that.trigger.addEventListener('click', function(event) {
			event.preventDefault();

			if ( !that.wrapper.classList.contains(that.scrollClass) || win.pageYOffset > 1 )  {
				that.enableScroll();
			};
		}, false);
	};
	
	IntroScroll.prototype.enableScroll = function() {
		var that = this;

		that.wrapper.classList.add(that.scrollClass);
		
		that.isScrolling = true;
		
		setTimeout(function() {
			doc.body.style.overflow = 'visible';

			that.isScrolling = false;

			if ( typeof that.afterScroll === 'function' ) {
				that.afterScroll(that);
			};
		}, that.duration);
	};
	
	IntroScroll.prototype.disableScroll = function() {
		if ( this.isScrolling ) {
			return;
		};

		this.wrapper.classList.remove(this.scrollClass);

		doc.body.style.overflow = 'hidden';
	};

	window.IntroScroll = IntroScroll;

	// Example Initialization
	// var introScroll = new IntroScroll({
		// element     : '#intro',
		// wrapper     : '#wrapper',
		// container   : '#container',
		// trigger     : '#intro__link',
		// scrollClass : 'is-scrolled',
		// duration    : 1500,
		// afterScroll : null
	// });
})(window, document);
