"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var IntroScroll =
/*#__PURE__*/
function () {
  function IntroScroll() {
    var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, IntroScroll);

    this.settings = Object.assign({}, {
      element: '#intro',
      wrapper: '#wrapper',
      container: '#container',
      trigger: '#intro__link',
      scrollClass: 'is-scrolled',
      duration: 1500,
      afterScroll: null
    }, settings);
    this.win = window;
    this.doc = document;
    this.element = this.getElement(this.settings.element);
    this.wrapper = this.getElement(this.settings.wrapper);
    this.container = this.getElement(this.settings.container);
    this.trigger = this.getElement(this.settings.trigger);
    this.scrollClass = this.settings.scrollClass;
    this.duration = this.settings.duration;
    this.afterScroll = this.settings.afterScroll;
    this.isScrolling = false;
    this.init();
  }

  _createClass(IntroScroll, [{
    key: "init",
    value: function init() {
      this.bind();
    }
  }, {
    key: "getElement",
    value: function getElement(selector) {
      return this.doc.querySelector(selector);
    }
  }, {
    key: "swipe",
    value: function swipe(element) {
      var touchstartX = 0;
      var touchstartY = 0;
      var touchendX = 0;
      var touchendY = 0;
      var onSwipeUp = new Event('onswipeup');
      var onSwipeRight = new Event('onswiperight');
      var onSwipeDown = new Event('onswipedown');
      var onSwipeLeft = new Event('onswipeleft');
      var onTap = new Event('tap');
      element.addEventListener('touchstart', function (event) {
        touchstartX = event.changedTouches[0].screenX;
        touchstartY = event.changedTouches[0].screenY;
      }, false);
      element.addEventListener('touchend', function (event) {
        touchendX = event.changedTouches[0].screenX;
        touchendY = event.changedTouches[0].screenY;
        handleTouch();
      }, false);

      var handleTouch = function handleTouch() {
        if (touchendX < touchstartX) {
          element.dispatchEvent(onSwipeLeft);
        }

        if (touchendX > touchstartX) {
          element.dispatchEvent(onSwipeRight);
        }

        if (touchendY < touchstartY) {
          element.dispatchEvent(onSwipeUp);
        }

        if (touchendY > touchstartY) {
          element.dispatchEvent(onSwipeDown);
        }

        if (touchendY === touchstartY) {
          element.dispatchEvent(onTap);
        }
      };
    }
  }, {
    key: "bind",
    value: function bind() {
      var _this = this;

      var win = this.win;
      var trigger = this.trigger;
      var element = this.element;
      var wrapper = this.wrapper;
      var container = this.container;
      this.swipe(element);
      this.swipe(wrapper);
      element.addEventListener('mousewheel', function (event) {
        if (event.deltaY > 0) {
          _this.enableScroll();
        }
      }, false);
      element.addEventListener('onswipeup', function (event) {
        _this.enableScroll();
      }, false);
      wrapper.addEventListener('onswipedown', function (event) {
        if (_this.win.pageYOffset <= 0) {
          _this.disableScroll();
        }
      }, false);
      container.addEventListener('mousewheel', function (event) {
        if (event.deltaY < 0 && _this.win.pageYOffset <= 0) {
          _this.disableScroll();
        }
      }, false);
      win.addEventListener('mousewheel', function (event) {
        if (win.pageYOffset <= 0 && wrapper.classList.contains(_this.scrollClass) && event.deltaY < 0) {
          _this.disableScroll();
        }
      }, false);
      trigger.addEventListener('click', function (event) {
        event.preventDefault();

        if (!wrapper.classList.contains(_this.scrollClass) || win.pageYOffset > 1) {
          _this.enableScroll();
        }
      }, false);
    }
  }, {
    key: "enableScroll",
    value: function enableScroll() {
      var _this2 = this;

      this.wrapper.classList.add(this.scrollClass);
      this.isScrolling = true;
      setTimeout(function () {
        _this2.doc.body.style.overflow = 'visible';
        _this2.isScrolling = false;
        typeof _this2.afterScroll === 'function' && _this2.afterScroll(_this2);
      }, this.duration);
    }
  }, {
    key: "disableScroll",
    value: function disableScroll() {
      if (this.isScrolling) {
        return;
      }

      this.wrapper.classList.remove(this.scrollClass);
      this.doc.body.style.overflow = 'hidden';
    }
  }]);

  return IntroScroll;
}();

exports.default = IntroScroll;