'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _express = _interopRequireDefault(require('express'));

var _axios = _interopRequireDefault(require('axios'));

var _dotenv = _interopRequireDefault(require('dotenv'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

_dotenv['default'].config();

var router = _express['default'].Router();

router.post('/', function (req, res, _next) {
  var tokenURI = req.body.tokenURI;

  if (!tokenURI) {
    return res.status(500).json({
      error: 'Path must be specified',
    });
  }

  if (tokenURI.startsWith('data')) {
    return res.send({
      image: tokenURI.image,
      name: tokenURI.name,
      description: tokenURI.description,
    });
  }

  return _axios['default']
    .get(tokenURI, {
      headers: {
        Authorization: 'Bearer '.concat(process.env.PINATA_JWT_TOKEN),
        'Retry-After': 1,
      },
    })
    .then(function (data) {
      return res.send(data.data);
    })
    ['catch'](function (err) {
      var _err$response;

      console.log(tokenURI);
      console.log(err.message);
      res
        .status(
          ((_err$response = err.response) === null || _err$response === void 0 ? void 0 : _err$response.status) || 500
        )
        .json({
          error: err,
        });
    });
});
var _default = router;
exports['default'] = _default;
