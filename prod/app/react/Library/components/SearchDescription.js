"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.mapStateToProps = mapStateToProps;exports.default = exports.SearchDescription = void 0;var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRedux = require("react-redux");

var _libraryFilters = _interopRequireDefault(require("../helpers/libraryFilters"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};if (desc.get || desc.set) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}}newObj.default = obj;return newObj;}}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {if (!REACT_ELEMENT_TYPE) {REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol["for"] && Symbol["for"]("react.element") || 0xeac7;}var defaultProps = type && type.defaultProps;var childrenLength = arguments.length - 3;if (!props && childrenLength !== 0) {props = { children: void 0 };}if (props && defaultProps) {for (var propName in defaultProps) {if (props[propName] === void 0) {props[propName] = defaultProps[propName];}}} else if (!props) {props = defaultProps || {};}if (childrenLength === 1) {props.children = children;} else if (childrenLength > 1) {var childArray = new Array(childrenLength);for (var i = 0; i < childrenLength; i++) {childArray[i] = arguments[i + 3];}props.children = childArray;}return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null };}

function getPropertyText(prop, values) {
  const options = values.map(value => prop.options.find(o => o.id === value));
  const labels = options.map(o => o && o.label).filter(l => l);
  return labels.join(', ');
}

function getPropertiesTexts(query, properties) {
  return Object.keys(query.filters).reduce((descriptions, propName) => {
    const { values } = query.filters[propName];
    const property = properties.find(p => p.name === propName);
    if (!values || !property) {
      return descriptions;
    }
    const propText = `${property.label}: ${getPropertyText(property, values)}`;
    return [...descriptions, propText];
  }, []);
}

class SearchDescription extends _react.Component {
  render() {
    const { searchTerm, query, properties } = this.props;
    const descriptions = query && query.filters ? getPropertiesTexts(query, properties) : [];
    const descriptionText = descriptions.length ? ` ${descriptions.join(' - ')}` : '';
    return (
      _jsx("span", {}, void 0, searchTerm, descriptionText));

  }}exports.SearchDescription = SearchDescription;


SearchDescription.defaultProps = {
  query: undefined };








function mapStateToProps({ thesauris, templates, relationTypes }, { query }) {
  const properties = query && query.filters ?
  _libraryFilters.default.URLQueryToState(query, templates.toJS(), thesauris.toJS(), relationTypes.toJS()).properties :
  [];
  return {
    properties };

}var _default =

(0, _reactRedux.connect)(mapStateToProps)(SearchDescription);exports.default = _default;