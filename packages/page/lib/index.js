"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _slateReact = require("slate-react");

var _UIComponent = _interopRequireDefault(require("./UIComponent"));

var _reactCodemirror = _interopRequireDefault(require("react-codemirror"));

var _slateEditCode = _interopRequireDefault(require("slate-edit-code"));

var _slatePrism = _interopRequireDefault(require("slate-prism"));

var _slateNoEmpty = _interopRequireDefault(require("slate-no-empty"));

var _CodeBlock = _interopRequireDefault(require("./components/CodeBlock"));

var _Container = _interopRequireDefault(require("./components/Container"));

var _Blockquote = _interopRequireDefault(require("./components/Blockquote"));

var _Coder = _interopRequireDefault(require("./components/Coder"));

var _slateAutoReplace = _interopRequireDefault(require("slate-auto-replace"));

var _slateEditList = _interopRequireDefault(require("slate-edit-list"));

var _slateEditBlockquote = _interopRequireDefault(require("slate-edit-blockquote"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CodePlugin = (0, _slateEditCode.default)({
  onlyIn: function onlyIn(node) {
    return node.type === 'code_block';
  }
});
var ListPlugin = (0, _slateEditList.default)();
var QuotePlugin = (0, _slateEditBlockquote.default)();
var plugins = [(0, _slatePrism.default)({
  onlyIn: function onlyIn(node) {
    return node.type === 'code_block';
  },
  getSyntax: function getSyntax(node) {
    return node.data.get('syntax');
  }
}), CodePlugin, (0, _slateNoEmpty.default)('paragraph'), (0, _slateAutoReplace.default)({
  trigger: 'space',
  before: /^(1\.)$/,
  transform: function transform(change, e, matches) {
    console.log(matches);
    return ListPlugin.changes.wrapInList(change, 'ol_list').focus();
  }
}), (0, _slateAutoReplace.default)({
  trigger: 'space',
  before: /^(>)$/,
  transform: function transform(change) {
    return QuotePlugin.changes.wrapInBlockquote(change).focus();
  }
}), ListPlugin, QuotePlugin];

var KfstudioPage =
/*#__PURE__*/
function (_React$Component) {
  _inherits(KfstudioPage, _React$Component);

  function KfstudioPage() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, KfstudioPage);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(KfstudioPage)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "renderNode", function (props) {
      var attributes = props.attributes,
          children = props.children;
      var type = props.node.type;

      switch (type) {
        case 'container':
          return _react.default.createElement(_Container.default, props);

        case 'paragraph':
          return _react.default.createElement("p", props.attributes, props.children);

        case 'dummy':
          return _react.default.createElement("div", _extends({}, props.attributes, {
            style: {
              position: 'absolute',
              top: -999
            }
          }), props.children);

        case 'code_block':
          return _react.default.createElement(_CodeBlock.default, props);

        case 'page':
          return _react.default.createElement("div", _extends({
            style: {
              width: props.node.data.get('w'),
              height: props.node.data.get('h')
            }
          }, props.attributes), props.children);

        case 'code_line':
          return _react.default.createElement("div", _extends({
            className: "codeLine"
          }, props.attributes, {
            style: {
              margin: '0'
            }
          }), props.children);

        case 'coder':
          return _react.default.createElement(_Coder.default, props);

        case 'ol_list':
        case 'ol':
          return _react.default.createElement("ol", attributes, children);

        case 'ul_list':
        case 'ul':
          return _react.default.createElement("ul", attributes, children);

        case 'list_item':
        case 'li':
          return _react.default.createElement("li", attributes, children);

        case 'blockquote':
          return _react.default.createElement(_Blockquote.default, props, children);
      }

      return;

      if (type === 'textbox') {
        return _react.default.createElement(_UIComponent.default, _extends({}, props, {
          active: true
        }));
      } else if (type === 'coder') {
        return _react.default.createElement(_UIComponent.default, props);
      } else if (type === 'codemirror') {
        var options = {
          lineNumbers: true,
          mode: 'javascript'
        };
        return _react.default.createElement(_reactCodemirror.default, {
          value: '123',
          style: {
            height: '100%'
          },
          options: options
        });
      } else if (type === 'test') {
        return _react.default.createElement(_UIComponent.default, props);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onClick", function () {// let cg = this.props.value.change().deselect();
      // this.props.onChange(cg);
    });

    return _this;
  }

  _createClass(KfstudioPage, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          value = _this$props.value,
          onChange = _this$props.onChange,
          schema = _this$props.schema;
      return _react.default.createElement(_slateReact.Editor, {
        onClick: this.onClick,
        className: "editor",
        plugins: plugins,
        value: value,
        onChange: onChange,
        renderNode: this.renderNode,
        style: {
          height: '100%',
          position: 'relative'
        },
        schema: schema
      });
    }
  }]);

  return KfstudioPage;
}(_react.default.Component);

var _default = KfstudioPage;
exports.default = _default;