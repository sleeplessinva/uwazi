"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _reactReduxForm = require("react-redux-form");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {if (!REACT_ELEMENT_TYPE) {REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol["for"] && Symbol["for"]("react.element") || 0xeac7;}var defaultProps = type && type.defaultProps;var childrenLength = arguments.length - 3;if (!props && childrenLength !== 0) {props = { children: void 0 };}if (props && defaultProps) {for (var propName in defaultProps) {if (props[propName] === void 0) {props[propName] = defaultProps[propName];}}} else if (!props) {props = defaultProps || {};}if (childrenLength === 1) {props.children = children;} else if (childrenLength > 1) {var childArray = new Array(childrenLength);for (var i = 0; i < childrenLength; i++) {childArray[i] = arguments[i + 3];}props.children = childArray;}return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null };}

const TextFilter = ({ onChange, model, label }) =>
_jsx(_reactReduxForm.Field, { model: model }, void 0,
_jsx("ul", { className: "search__filter is-active" }, void 0,
_jsx("li", {}, void 0,
_jsx("label", {}, void 0, label)),

_jsx("li", { className: "wide" }, void 0,
_jsx("input", { className: "form-control", onChange: onChange }))));





TextFilter.defaultProps = {
  onChange: () => {},
  label: '' };var _default =











TextFilter;exports.default = _default;