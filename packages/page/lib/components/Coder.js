"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _reactSplitPane = _interopRequireDefault(require("react-split-pane"));

var _reactCodemirror = _interopRequireDefault(require("react-codemirror"));

require("codemirror/lib/codemirror.css");

require("antd/lib/icon/style/css");

require("./Coder.css");

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

require('codemirror/mode/python/python');

var Coder =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Coder, _React$Component);

  function Coder() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Coder);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Coder)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      outputHeight: 0,
      output: '正在运行...'
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "run", function () {
      fetch('http://run.kfcoding.com', {
        method: 'POST',
        body: JSON.stringify({
          language: 'python3',
          code: _this.props.node.data.get('code')
        })
      }).then(function (res) {
        return res.json();
      }).then(function (data) {
        return _this.setState({
          output: data.result || data.error
        });
      });

      _this.setState({
        outputHeight: 200
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "hideOutput", function () {
      _this.setState({
        outputHeight: 0
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "updateCode", function (code) {
      var _this$props = _this.props,
          node = _this$props.node,
          editor = _this$props.editor;
      var change = editor.value.change().setNodeByKey(node.key, {
        data: node.get('data').merge({
          code: code
        })
      });
      editor.onChange(change);
    });

    return _this;
  }

  _createClass(Coder, [{
    key: "render",
    value: function render() {
      var node = this.props.node;
      var options = {
        lineNumbers: true,
        mode: 'python'
      };
      return _react.default.createElement(_reactSplitPane.default, {
        split: "horizontal",
        primary: "second",
        defaultSize: this.state.outputHeight,
        size: this.state.outputHeight,
        minSize: 0,
        paneStyle: {
          overflow: 'auto'
        },
        style: {
          border: '1px solid #eee'
        }
      }, _react.default.createElement("div", {
        style: {
          height: '100%'
        }
      }, _react.default.createElement("div", {
        style: {
          borderBottom: '1px solid #eee',
          height: 30,
          lineHeight: '30px',
          paddingLeft: 28
        }
      }, _react.default.createElement(_antd.Icon, {
        type: "caret-right",
        onClick: this.run
      })), _react.default.createElement("div", {
        style: {
          height: 'calc(100% - 30px)'
        },
        onClick: function onClick(e) {
          return e.stopPropagation();
        }
      }, _react.default.createElement(_reactCodemirror.default, {
        value: node.data.get('code'),
        onChange: this.updateCode,
        options: options,
        style: {
          height: '100%'
        }
      }))), _react.default.createElement("div", null, _react.default.createElement(_antd.Icon, {
        type: "down",
        style: {
          position: 'absolute',
          right: 2,
          top: 2
        },
        onClick: this.hideOutput
      }), this.state.output));
    }
  }]);

  return Coder;
}(_react.default.Component);

var _default = Coder;
exports.default = _default;