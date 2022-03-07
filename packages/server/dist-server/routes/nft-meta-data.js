'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _express = _interopRequireDefault(require('express'));

var _dotenv = _interopRequireDefault(require('dotenv'));

var _nftMetaData = require('../helpers/nft-meta-data.helper');

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

var router = _express['default'].Router();

router.post(
  '/',
  /*#__PURE__*/ (function () {
    var _ref = _asyncToGenerator(
      /*#__PURE__*/ regeneratorRuntime.mark(function _callee(req, res, _next) {
        var tokenURI, meta, _err$response;

        return regeneratorRuntime.wrap(
          function _callee$(_context) {
            while (1) {
              switch ((_context.prev = _context.next)) {
                case 0:
                  tokenURI = req.body.tokenURI;

                  if (tokenURI) {
                    _context.next = 3;
                    break;
                  }

                  return _context.abrupt(
                    'return',
                    res.status(500).json({
                      error: 'Path must be specified',
                    })
                  );

                case 3:
                  if (!tokenURI.startsWith('data')) {
                    _context.next = 5;
                    break;
                  }

                  return _context.abrupt(
                    'return',
                    res.send({
                      image: tokenURI.image,
                      name: tokenURI.name,
                      description: tokenURI.description,
                    })
                  );

                case 5:
                  _context.prev = 5;
                  _context.next = 8;
                  return (0, _nftMetaData.fetchMetaData)(tokenURI);

                case 8:
                  meta = _context.sent;
                  return _context.abrupt('return', res.send(meta));

                case 12:
                  _context.prev = 12;
                  _context.t0 = _context['catch'](5);
                  console.log(tokenURI);
                  console.log(_context.t0.message);
                  return _context.abrupt(
                    'return',
                    res
                      .status(
                        ((_err$response = _context.t0.response) === null || _err$response === void 0
                          ? void 0
                          : _err$response.status) || 500
                      )
                      .json({
                        error: _context.t0.message,
                      })
                  );

                case 17:
                case 'end':
                  return _context.stop();
              }
            }
          },
          _callee,
          null,
          [[5, 12]]
        );
      })
    );

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  })()
);
var _default = router;
exports['default'] = _default;
