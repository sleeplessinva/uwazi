"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _reactRouter = require("react-router");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {if (!REACT_ELEMENT_TYPE) {REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol["for"] && Symbol["for"]("react.element") || 0xeac7;}var defaultProps = type && type.defaultProps;var childrenLength = arguments.length - 3;if (!props && childrenLength !== 0) {props = { children: void 0 };}if (props && defaultProps) {for (var propName in defaultProps) {if (props[propName] === void 0) {props[propName] = defaultProps[propName];}}} else if (!props) {props = defaultProps || {};}if (childrenLength === 1) {props.children = children;} else if (childrenLength > 1) {var childArray = new Array(childrenLength);for (var i = 0; i < childrenLength; i++) {childArray[i] = arguments[i + 3];}props.children = childArray;}return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null };}

const PayPalDonateLink = ({ paypalid, classname, children, currency, amount }) => {
  const amountParam = amount ? `&amount=${amount}` : '';
  const url = `https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=${paypalid}&currency_code=${currency}${amountParam}&source=url`;
  classname += ' paypal-donate';
  return _jsx(_reactRouter.Link, { className: classname, href: url, target: "_blank", rel: "noreferrer noopener" }, void 0, children);
};

PayPalDonateLink.defaultProps = {
  children: '',
  classname: '',
  amount: null };var _default =














PayPalDonateLink;exports.default = _default;