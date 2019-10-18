"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _react = _interopRequireDefault(require("react"));

var _Layout = require("../../Layout");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {if (!REACT_ELEMENT_TYPE) {REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol["for"] && Symbol["for"]("react.element") || 0xeac7;}var defaultProps = type && type.defaultProps;var childrenLength = arguments.length - 3;if (!props && childrenLength !== 0) {props = { children: void 0 };}if (props && defaultProps) {for (var propName in defaultProps) {if (props[propName] === void 0) {props[propName] = defaultProps[propName];}}} else if (!props) {props = defaultProps || {};}if (childrenLength === 1) {props.children = children;} else if (childrenLength > 1) {var childArray = new Array(childrenLength);for (var i = 0; i < childrenLength; i++) {childArray[i] = arguments[i + 3];}props.children = childArray;}return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null };}

const withIcon = (v) =>
v.icon ? _jsx(_react.default.Fragment, {}, void 0, _jsx(_Layout.Icon, { className: "item-icon item-icon-center", data: v.icon }), v.value) : v.value;


const interpose = (array, separator) => [].concat(...array.map(e => [separator, e])).slice(1);

const renderList = (prop) =>
_jsx("ul", { className: "multiline" }, void 0,
prop.value.map((v, index) => {
  const key = `${prop.name}_${index}`;
  return _jsx("li", {}, key, withIcon(v));
}));



const renderCompact = (prop) =>
prop.type === 'multidate' || prop.type === 'multidaterange' ?
interpose(prop.value.map(v => v.value), _jsx("br", {})) :
interpose(prop.value.map(v => withIcon(v)), ', ');


const ValueList = ({ property, compact }) =>
compact ? renderCompact(property) : renderList(property);var _default =


ValueList;exports.default = _default;