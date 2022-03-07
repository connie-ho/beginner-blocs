'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.fetchMetaData = void 0;

var _axios = _interopRequireDefault(require('axios'));

var _retryAxios = _interopRequireDefault(require('retry-axios'));

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
                timeout: 60, // don't forget this one
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
