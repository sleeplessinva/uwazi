"use strict";Object.defineProperty(exports, "__esModule", { value: true });Object.defineProperty(exports, "NeedAuthorization", { enumerable: true, get: function () {return _NeedAuthorization.default;} });exports.default = void 0;var actions = _interopRequireWildcard(require("./actions"));
var _NeedAuthorization = _interopRequireDefault(require("./components/NeedAuthorization"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};if (desc.get || desc.set) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}}newObj.default = obj;return newObj;}}var _default =

{
  actions };exports.default = _default;