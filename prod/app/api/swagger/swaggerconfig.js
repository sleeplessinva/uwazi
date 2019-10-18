"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _express = _interopRequireDefault(require("express"));
var _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));

var _path = _interopRequireDefault(require("path"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =

app => {
  const swaggerDefinition = {
    info: {
      title: 'Uwazi API',
      version: '1.0.0',
      description: `Uwazi is an open-source solution for building and sharing document collections.
      <br>Remember that using the "Try it out" functionality will execute the requests over your local instalation!` },

    host: 'localhost:3000',
    basePath: '/api',
    tags: [
    { name: 'attachments' },
    { name: 'entities' }],

    definitions: {
      Error: {
        properties: {
          error: { type: 'string' } } } } };





  const options = {
    swaggerDefinition,
    apis: [`${__dirname}/../**/*.js`] };


  const swaggerSpec = (0, _swaggerJsdoc.default)(options);
  app.get('/api/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  app.use('/api', _express.default.static(_path.default.resolve(__dirname, '../../../public/swaggerUI')));
};exports.default = _default;