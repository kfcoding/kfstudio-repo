"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRnd = require("react-rnd");

var _antd = require("antd");

require("antd/lib/icon/style/css");

require("antd/lib/tooltip/style/css");

var _reactKeydown = _interopRequireDefault(require("react-keydown"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _dec, _class;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n    border: 2px solid #333;\n    cursor: move;\n  "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  width: 100%;\n  height: 100%;\n  ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var DragDiv = _styledComponents.default.div(_templateObject(), function (props) {
  return props.active && (0, _styledComponents.css)(_templateObject2());
});

var Container = (_dec = (0, _reactKeydown.default)('backspace'), (_class =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Container, _React$Component);

  function Container() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Container);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Container)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onDelete", function () {
      var cg = _this.props.editor.value.change().removeNodeByKey(_this.props.node.key);

      _this.props.editor.onChange(cg);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onClick", function (e) {
      e.preventDefault();
      e.stopPropagation(); // this.props.editor.change(change => change.blur())
      // this.props.editor.change(change => {
      //   const cg = change.setNodeByKey(this.props.node.key, {isSelected: true})
      //   this.props.editor.onChange(cg);
      // })
      //this.props.editor.value.set('focusBlock', this.props.node.key)
      // this.props.store.setActiveInstance(this.props.node);
      //e.stopPropagation();
    });

    return _this;
  }

  _createClass(Container, [{
    key: "test",
    value: function test() {
      console.log('aaa');
      var cg = this.props.editor.value.change().removeNodeByKey(this.props.node.key);
      this.props.editor.onChange(cg);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var node = this.props.node;
      return _react.default.createElement(_reactRnd.Rnd, _extends({}, this.props.attributes, {
        // dragHandleClassName='drag'
        style: {
          border: this.props.isSelected ? '2px solid #900' : 'none'
        },
        resizeHandleStyles: {
          top: {
            width: 8,
            height: 8,
            left: 'calc(50% - 4px)',
            top: -4,
            border: '1px solid #333'
          },
          bottom: {
            width: 8,
            height: 8,
            left: 'calc(50% - 4px)',
            border: '1px solid #333',
            bottom: -4
          },
          left: {
            width: 8,
            height: 8,
            top: 'calc(50% - 4px)',
            border: '1px solid #333',
            left: -4
          },
          right: {
            width: 8,
            height: 8,
            top: 'calc(50% - 4px)',
            border: '1px solid #333',
            right: -4
          }
        },
        cancel: ".cancel",
        default: {
          x: node.data.get('x') - node.data.get('x') % 10,
          y: node.data.get('y') - node.data.get('y') % 10,
          height: node.data.get('h'),
          width: node.data.get('w')
        },
        position: {
          x: node.data.get('x') - node.data.get('x') % 10,
          y: node.data.get('y') - node.data.get('y') % 10
        },
        size: {
          height: node.data.get('h'),
          width: node.data.get('w')
        },
        bounds: ".editor",
        dragGrid: [10, 10],
        resizeGrid: [10, 10],
        onResize: function onResize(e, d, r, delta, position) {
          var change = _this2.props.editor.value.change().setNodeByKey(node.key, {
            data: node.get('data').merge(_objectSpread({
              w: r.offsetWidth,
              h: r.offsetHeight
            }, position))
          });

          _this2.props.editor.onChange(change);

          e.stopPropagation();
        },
        onDragStop: function onDragStop(e, d) {
          var change = _this2.props.editor.value.change().setNodeByKey(node.key, {
            data: node.get('data').merge({
              x: d.x,
              y: d.y
            })
          });

          _this2.props.editor.onChange(change);

          e.stopPropagation();
        },
        resizeHandleWrapperStyle: {
          display: this.props.isSelected ? 'block' : 'none'
        },
        tabIndex: this.props.node.key
      }), _react.default.createElement("div", {
        className: "cancel",
        style: {
          cursor: 'default',
          overflow: 'hidden',
          width: '100%',
          height: '100%'
        }
      }, this.props.children));
    }
  }]);

  return Container;
}(_react.default.Component), (_applyDecoratedDescriptor(_class.prototype, "test", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, "test"), _class.prototype)), _class));
var _default = Container;
exports.default = _default;