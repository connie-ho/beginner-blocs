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
        var _req$body, contractAddress, tokenId, _data$data, data, _err$response;

        return regeneratorRuntime.wrap(
          function _callee$(_context) {
            while (1) {
              switch ((_context.prev = _context.next)) {
                case 0:
                  (_req$body = req.body), (contractAddress = _req$body.contractAddress), (tokenId = _req$body.tokenId); // if (!tokenURI) {
                  //   return res.status(500).json({ error: 'Path must be specified' });
                  // }
                  // if (tokenURI.startsWith('data')) {
                  //   return res.send({
                  //     image: tokenURI.image,
                  //     name: tokenURI.name,
                  //     description: tokenURI.description,
                  //   });
                  // }

                  _context.prev = 1;
                  _context.next = 4;
                  return (0, _nftMetaData.fetchMetaDataAlchemy)({
                    contractAddress: contractAddress,
                    tokenId: tokenId,
                  });

                case 4:
                  data = _context.sent;

                  if (!((_data$data = data.data) !== null && _data$data !== void 0 && _data$data.metadata)) {
                    res.send({
                      image: '',
                      name: '',
                      description: '',
                    });
                  }

                  return _context.abrupt('return', res.send(data.data.metadata));

                case 9:
                  _context.prev = 9;
                  _context.t0 = _context['catch'](1);
                  console.log(_context.t0.message);
                  return _context.abrupt(
                    'return',
                    res
                      .status(
                        ((_err$response = _context.t0.response) === null || _err$response === void 0
                          ? void 0
                          : _err$response.status) ||
                          _context.t0.status ||
                          500
                      )
                      .json({
                        error: _context.t0.message,
                      })
                  );

                case 13:
                case 'end':
                  return _context.stop();
              }
            }
          },
          _callee,
          null,
          [[1, 9]]
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
