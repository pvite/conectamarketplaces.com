__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HsNavScroller; });
/* harmony import */ var velocity_animate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! velocity-animate */ "./node_modules/velocity-animate/velocity.js");
/* harmony import */ var velocity_animate__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(velocity_animate__WEBPACK_IMPORTED_MODULE_0__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
* HSNavScroller Plugin
* @version: 2.0.0 (Sat, 06 Jul 2021)
* @requires: Velocity 1.5.2 or later
* @author: HtmlStream
* @license: Htmlstream Libraries (https://htmlstream.com/)
* Copyright 2021 Htmlstream
*/

var dataAttributeName = 'data-hs-nav-scroller-options';
var defaults = {
  type: 'horizontal',
  target: '.active',
  offset: 0,
  delay: 20
};

var HsNavScroller = /*#__PURE__*/function () {
  function HsNavScroller(el, options, id) {
    _classCallCheck(this, HsNavScroller);

    this.collection = [];
    var that = this;
    var elems;

    if (el instanceof HTMLElement) {
      elems = [el];
    } else if (el instanceof Object) {
      elems = el;
    } else {
      elems = document.querySelectorAll(el);
    }

    for (var i = 0; i < elems.length; i += 1) {
      that.addToCollection(elems[i], options, id || elems[i].id);
    }

    if (!that.collection.length) {
      return false;
    } // initialization calls


    that._init();

    return this;
  }

  _createClass(HsNavScroller, [{
    key: "_init",
    value: function _init() {
      var that = this;

      var _loop = function _loop(i) {
        var _$el = void 0;

        var _options = void 0;

        if (that.collection[i].hasOwnProperty('$initializedEl')) {
          return "continue";
        }

        _$el = that.collection[i].$el;
        _options = that.collection[i].options;

        if (_options.type == 'vertical') {
          velocity_animate__WEBPACK_IMPORTED_MODULE_0___default()(_$el, 'scroll', {
            container: _$el,
            offset: _$el.querySelector(_options.target).offsetTop - _options.offset,
            duration: _options.delay,
            axis: 'y'
          });
        } else if (_options.type == 'horizontal') {
          _options.nav = _$el.querySelector('.nav');
          _options.prev = _$el.querySelector('.hs-nav-scroller-arrow-prev');
          _options.next = _$el.querySelector('.hs-nav-scroller-arrow-next');
          _options.activeElementLeftPosition = _options.nav.querySelector(_options.target).offsetLeft;
          _options.scrollMaxLeft = parseInt((_options.nav.scrollWidth.toFixed() - _options.nav.clientWidth).toFixed());
          _options.scrollPosition = _options.nav.scrollLeft;

          if (_options.scrollPosition <= 0) {
            _options.prev.style.display = 'none';
          }

          if (_options.scrollMaxLeft <= 0) {
            _options.next.style.display = 'none';
          }

          that.onResize(_$el, _options);
          window.addEventListener('resize', function () {
            return that.onResize(_$el, _options);
          });

          var navRect = _options.nav.getBoundingClientRect(),
              prevRect = _options.prev.getBoundingClientRect(),
              nextRect = _options.next.getBoundingClientRect();

          if (_options.activeElementLeftPosition > navRect.width / 2) {
            velocity_animate__WEBPACK_IMPORTED_MODULE_0___default()(_options.nav, 'scroll', {
              container: _options.nav,
              offset: _options.activeElementLeftPosition - _options.offset - prevRect.width,
              duration: _options.delay,
              axis: 'x'
            });
          }

          _options.next.addEventListener('click', function () {
            velocity_animate__WEBPACK_IMPORTED_MODULE_0___default()(_options.nav, 'scroll', {
              container: _options.nav,
              offset: _options.scrollPosition + _options.nav.clientWidth - nextRect.width,
              duration: _options.delay,
              axis: 'x'
            });
          });

          _options.prev.addEventListener('click', function () {
            velocity_animate__WEBPACK_IMPORTED_MODULE_0___default()(_options.nav, 'scroll', {
              container: _options.nav,
              offset: _options.scrollPosition - _options.nav.clientWidth + prevRect.width,
              duration: _options.delay,
              axis: 'x'
            });
          });

          _options.nav.addEventListener('scroll', function () {
            var scrollMaxLeft = (parseInt(_options.nav.scrollWidth.toFixed()) - parseInt(_options.nav.clientWidth)).toFixed(),
                scrollPosition = _options.nav.scrollLeft; // Hide or Show Back Arrow

            if (scrollPosition <= 0) {
              _options.prev.style.display = 'none';
            } else {
              _options.prev.style.display = 'flex';
            } // Hide or Show Next Arrow


            if (scrollPosition >= scrollMaxLeft) {
              _options.next.style.display = 'none';
            } else {
              _options.next.style.display = 'flex';
            }
          });
        }
      };

      for (var i = 0; i < that.collection.length; i += 1) {
        var _ret = _loop(i);

        if (_ret === "continue") continue;
      }
    }
  }, {
    key: "onResize",
    value: function onResize($el, settings) {
      var scrollMaxLeft = parseInt(settings.nav.scrollWidth.toFixed()) - parseInt(settings.nav.clientWidth.toFixed()),
          scrollPosition = settings.nav.scrollLeft;

      if (scrollPosition <= 0) {
        settings.prev.style.display = 'none';
      } else {
        settings.prev.style.display = 'flex';
      }

      if (scrollMaxLeft <= 0) {
        settings.next.style.display = 'none';
      } else {
        settings.next.style.display = 'flex';
      }
    }
  }, {
    key: "addToCollection",
    value: function addToCollection(item, options, id) {
      this.collection.push({
        $el: item,
        id: id || null,
        options: Object.assign({}, defaults, item.hasAttribute(dataAttributeName) ? JSON.parse(item.getAttribute(dataAttributeName)) : {}, options)
      });
    }
  }, {
    key: "getItem",
    value: function getItem(item) {
      if (typeof item === 'number') {
        return this.collection[item].$initializedEl;
      } else {
        return this.collection.find(function (el) {
          return el.id === item;
        }).$initializedEl;
      }
    }
  }]);

  return HsNavScroller;
}();



//# sourceURL=webpack://HsNavScroller/./src/js/hs-nav-scroller.js?