"use strict";

(function () {
  var MousewheelPlugin =
  /*#__PURE__*/
  function () {
    function MousewheelPlugin(app) {
      var _this = this;

      this.app = app;

      this.eventHandler = function (e) {
        return _this.onMouseWheel(e);
      };

      this.app.view.addEventListener('mousewheel', this.eventHandler, {
        passive: false
      });
      this.app.view.addEventListener('DOMMouseScroll', this.eventHandler, {
        passive: false
      });
    }

    var _proto = MousewheelPlugin.prototype;

    _proto.onMouseWheel = function onMouseWheel(e) {
      var target = this.findScrollTarget({
        x: e.offsetX,
        y: e.offsetY
      });

      if (target) {
        e.preventDefault();
        target.emit('mousewheel', this.deriveNormalizedWheelDelta(e), e);
      }
    };

    _proto.findScrollTarget = function findScrollTarget(pos) {
      var hit = this.app.renderer.plugins.interaction.hitTest(pos);
      if (hit && hit.interactiveMousewheel) return hit;
    };

    _proto.deriveNormalizedWheelDelta = function deriveNormalizedWheelDelta(e) {
      if (e.detail) {
        if (e.wheelDelta) return e.wheelDelta / e.detail / 40 * (e.detail > 0 ? 1 : -1); // Opera
        else return -e.detail / 3; // Firefox
      } else return e.wheelDelta / 120; // IE,Safari,Chrome

    };

    _proto.destroy = function destroy() {
      this.app.view.removeEventListener('mousewheel', this.eventHandler);
      this.app.view.removeEventListener('DOMMouseScroll', this.eventHandler);
    };

    return MousewheelPlugin;
  }();

  Object.defineProperty(PIXI.DisplayObject.prototype, 'interactiveMousewheel', {
    get: function get() {
      return this._interactiveMousewheel;
    },
    set: function set(enabled) {
      this._interactiveMousewheel = enabled;

      if (enabled && !this.interactive) {
        this.interactive = true;
      }
    }
  });
  PIXI.Application.registerPlugin({
    init: function init(options) {
      this._mousewheelPlugin = new MousewheelPlugin(this);
    },
    destroy: function destroy() {
      this._mousewheelPlugin.destroy();
    }
  });
})();