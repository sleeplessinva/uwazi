"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;require("react-datepicker/dist/react-datepicker.css");

var _reactDatepicker2 = _interopRequireDefault(require("react-datepicker"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _moment = _interopRequireDefault(require("moment"));function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};if (desc.get || desc.set) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}}newObj.default = obj;return newObj;}}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {if (!REACT_ELEMENT_TYPE) {REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol["for"] && Symbol["for"]("react.element") || 0xeac7;}var defaultProps = type && type.defaultProps;var childrenLength = arguments.length - 3;if (!props && childrenLength !== 0) {props = { children: void 0 };}if (props && defaultProps) {for (var propName in defaultProps) {if (props[propName] === void 0) {props[propName] = defaultProps[propName];}}} else if (!props) {props = defaultProps || {};}if (childrenLength === 1) {props.children = children;} else if (childrenLength > 1) {var childArray = new Array(childrenLength);for (var i = 0; i < childrenLength; i++) {childArray[i] = arguments[i + 3];}props.children = childArray;}return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null };}

class DatePicker extends _react.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onChange = this.onChange.bind(this);
    if (props.value) {
      this.state.value = _moment.default.utc(props.value, 'X');
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.value) {
      this.setState({ value: _moment.default.utc(newProps.value, 'X') });
    }
  }

  onChange(value) {
    const { onChange, endOfDay, useTimezone } = this.props;
    this.setState({ value });
    if (!value) {
      onChange(null);
    } else {
      if (!useTimezone) {
        value.add(value.utcOffset(), 'minute');
      }

      if (endOfDay) {
        const method = useTimezone ? value : value.utc();
        method.endOf('day');
      }

      onChange(parseInt(value.utc().format('X'), 10));
    }
  }

  render() {
    let { locale, format } = this.props;
    locale = locale || 'en';
    format = format || 'DD/MM/YYYY';
    const { value } = this.state;

    return (
      _jsx(_reactDatepicker2.default, {
        dateFormat: format,
        className: "form-control",
        onChange: this.onChange,
        selected: value,
        locale: locale,
        placeholderText: format,
        isClearable: true,
        fixedHeight: true,
        showYearDropdown: true }));


  }}


DatePicker.defaultProps = {
  onChange: () => {},
  value: undefined,
  endOfDay: false,
  locale: undefined,
  format: undefined,
  useTimezone: false };var _default =











DatePicker;exports.default = _default;