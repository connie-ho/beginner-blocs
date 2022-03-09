'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _express = _interopRequireDefault(require('express'));

var _path = _interopRequireDefault(require('path'));

var _cookieParser = _interopRequireDefault(require('cookie-parser'));

var _morgan = _interopRequireDefault(require('morgan'));

var _cors = _interopRequireDefault(require('cors'));

var _index = _interopRequireDefault(require('./routes/index/index'));

var _nftMetaData = _interopRequireDefault(require('./routes/nft-meta-data/nft-meta-data'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var app = (0, _express['default'])();
app.use((0, _cors['default'])());
app.use((0, _morgan['default'])('dev'));
app.use(_express['default'].json());
app.use(
  _express['default'].urlencoded({
    extended: false,
  })
);
app.use((0, _cookieParser['default'])());
app.use(_express['default']['static'](_path['default'].join(__dirname, '../public')));
app.use('/api/nft-meta-data', _nftMetaData['default']);
app.use('/', _index['default']);
var _default = app;
exports['default'] = _default;
