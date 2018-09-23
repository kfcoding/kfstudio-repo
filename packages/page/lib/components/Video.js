"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * An video embed component.
 *
 * @type {Component}
 */
var Video =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Video, _React$Component);

  function Video() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Video);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Video)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onChange", function (e) {
      var video = e.target.value;
      var _this$props = _this.props,
          node = _this$props.node,
          editor = _this$props.editor;
      editor.change(function (c) {
        return c.setNodeByKey(node.key, {
          data: {
            video: video
          }
        });
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onClick", function (e) {
      e.stopPropagation();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "renderVideo", function () {
      var _this$props2 = _this.props,
          node = _this$props2.node,
          isFocused = _this$props2.isFocused;
      var video = node.data.get('video');
      var wrapperStyle = {
        position: 'relative',
        outline: isFocused ? '2px solid blue' : 'none'
      };
      var maskStyle = {
        display: isFocused ? 'none' : 'block',
        position: 'absolute',
        top: '0',
        left: '0',
        height: '100%',
        width: '100%',
        cursor: 'cell',
        zIndex: 1
      };
      var iframeStyle = {
        display: 'block'
      };
      return _react.default.createElement("div", {
        style: wrapperStyle
      }, _react.default.createElement("div", {
        style: maskStyle
      }), _react.default.createElement("iframe", {
        id: "ytplayer",
        type: "text/html",
        width: "640",
        height: "476",
        src: video,
        frameBorder: "0",
        style: iframeStyle
      }));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "renderInput", function () {
      var node = _this.props.node;
      var video = node.data.get('video');
      var style = {
        marginTop: '5px',
        boxSizing: 'border-box'
      };
      return _react.default.createElement("input", {
        value: video,
        onChange: _this.onChange,
        onClick: _this.onClick,
        style: style
      });
    });

    return _this;
  }

  _createClass(Video, [{
    key: "render",

    /**
     * Render.
     *
     * @return {Element}
     */
    value: function render() {
      var isSelected = this.props.isSelected;
      return _react.default.createElement("div", this.props.attributes, this.renderVideo(), isSelected ? this.renderInput() : null);
    }
    /**
     * Render the Youtube iframe, responsively.
     *
     * @return {Element}
     */

  }]);

  return Video;
}(_react.default.Component);
/**
 * Export.
 */


var _default = Video;
exports.default = _default;