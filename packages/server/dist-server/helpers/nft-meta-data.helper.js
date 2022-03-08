'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.fetchMetaDataAlchemy = exports.fetchMetaData = void 0;

var _axios = _interopRequireDefault(require('axios'));

var _retryAxios = _interopRequireDefault(require('retry-axios'));

var _dotenv = _interopRequireDefault(require('dotenv'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err);
      }
      _next(undefined);
    });
  };
}

_dotenv['default'].config();

_retryAxios['default'].attach();

var fetchMetaData = /*#__PURE__*/ (function () {
  var _ref = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee(tokenURI) {
      var retryConfig, meta;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch ((_context.prev = _context.next)) {
            case 0:
              retryConfig = {
                raxConfig: {
                  retry: 5,
                  // number of retry when facing 4xx or 5xx
                  noResponseRetries: 5,
                  // number of retry when facing connection error
                  onRetryAttempt: function onRetryAttempt(err) {
                    var cfg = _retryAxios['default'].getConfig(err);

                    console.log('Retry attempt #'.concat(cfg.currentRetryAttempt, ' for ').concat(tokenURI)); // track current trial
                  },
                },
              };
              _context.next = 3;
              return _axios['default'].get(tokenURI, retryConfig);

            case 3:
              meta = _context.sent;
              return _context.abrupt('return', meta.data);

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee);
    })
  );

  return function fetchMetaData(_x) {
    return _ref.apply(this, arguments);
  };
})();

exports.fetchMetaData = fetchMetaData;

_retryAxios['default'].attach();

var fetchMetaDataAlchemy = /*#__PURE__*/ (function () {
  var _ref3 = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee2(_ref2) {
      var tokenId, contractAddress, retryConfig, baseURL, tokenURL, data;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch ((_context2.prev = _context2.next)) {
            case 0:
              (tokenId = _ref2.tokenId), (contractAddress = _ref2.contractAddress);
              retryConfig = {
                raxConfig: {
                  retry: 5,
                  noResponseRetries: 5,
                  onRetryAttempt: function onRetryAttempt(err) {
                    var cfg = _retryAxios['default'].getConfig(err);

                    console.log(
                      'Retry attempt #'
                        .concat(cfg.currentRetryAttempt, ' for ')
                        .concat(tokenId, ' on ')
                        .concat(contractAddress)
                    );
                  },
                },
              };
              baseURL = 'https://eth-ropsten.alchemyapi.io/v2/'.concat(process.env.ALCHEMY_API_KEY, '/getNFTMetadata');
              tokenURL = ''
                .concat(baseURL, '?contractAddress=')
                .concat(contractAddress, '&tokenId=')
                .concat(tokenId, '&tokenType=erc721');
              _context2.next = 6;
              return _axios['default'].get(tokenURL);

            case 6:
              data = _context2.sent;
              return _context2.abrupt('return', data);

            case 8:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2);
    })
  );

  return function fetchMetaDataAlchemy(_x2) {
    return _ref3.apply(this, arguments);
  };
})();

exports.fetchMetaDataAlchemy = fetchMetaDataAlchemy;
