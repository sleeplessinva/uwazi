"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.ViewerDefaultMenu = void 0;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _redux = require("redux");
var _ShowIf = _interopRequireDefault(require("../../App/ShowIf"));
var _UI = require("../../UI");

var _uiActions = require("../actions/uiActions");function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};if (desc.get || desc.set) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}}newObj.default = obj;return newObj;}}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {if (!REACT_ELEMENT_TYPE) {REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol["for"] && Symbol["for"]("react.element") || 0xeac7;}var defaultProps = type && type.defaultProps;var childrenLength = arguments.length - 3;if (!props && childrenLength !== 0) {props = { children: void 0 };}if (props && defaultProps) {for (var propName in defaultProps) {if (props[propName] === void 0) {props[propName] = defaultProps[propName];}}} else if (!props) {props = defaultProps || {};}if (childrenLength === 1) {props.children = children;} else if (childrenLength > 1) {var childArray = new Array(childrenLength);for (var i = 0; i < childrenLength; i++) {childArray[i] = arguments[i + 3];}props.children = childArray;}return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null };}

class ViewerDefaultMenu extends _react.Component {
  render() {
    return (
      _jsx("div", { className: this.props.active ? 'active' : '' }, void 0,
      _jsx(_ShowIf.default, { if: !this.props.panelIsOpen }, void 0,
      _jsx("div", { className: "btn btn-primary", onClick: this.props.openPanel.bind(null, 'viewMetadataPanel') }, void 0,
      _jsx(_UI.Icon, { icon: "chart-bar" })))));




  }}exports.ViewerDefaultMenu = ViewerDefaultMenu;


const mapStateToProps = ({ documentViewer }) => ({
  panelIsOpen: !!documentViewer.uiState.get('panel'),
  doc: documentViewer.doc,
  targetDoc: !!documentViewer.targetDoc.get('_id') });










ViewerDefaultMenu.contextTypes = {
  confirm: _propTypes.default.func };


function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({ openPanel: _uiActions.openPanel }, dispatch);
}var _default =

(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ViewerDefaultMenu);exports.default = _default;