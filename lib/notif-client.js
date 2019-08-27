"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotifClient = void 0;

var _socket = _interopRequireDefault(require("socket.io-client"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var NotifClient =
/*#__PURE__*/
function () {
  function NotifClient(url, path, functions) {
    var _this = this;

    var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    _classCallCheck(this, NotifClient);

    var options = {
      autoConnect: false,
      path: path,
      cookieHttpOnly: false,
      pingTimeout: 60000,
      transportOptions: {
        polling: {
          extraHeaders: {}
        }
      }
    };
    if (opts['licensegroup'] && opts['licensegroup'] !== '') options['transportOptions']['polling']['extraHeaders']['x-wni-licensegroup'] = opts['licensegroup'];
    if (opts['idtoken'] && opts['idtoken'] !== '') options['transportOptions']['polling']['extraHeaders']['id-token'] = opts['idtoken'];
    this.socket = (0, _socket.default)(url, options); // register functions

    ['connect', 'message', 'disconnect', 'reconnect_error', 'error'].forEach(function (key) {
      var func = functions[key];
      if (func) _this.socket.on(key, func);
    });
  }

  _createClass(NotifClient, [{
    key: "connect",
    value: function connect() {
      this.socket.open();
    }
  }, {
    key: "disconnect",
    value: function disconnect() {
      this.socket.close();
    }
  }, {
    key: "isConnected",
    value: function isConnected() {
      return this.socket.connected;
    }
  }]);

  return NotifClient;
}();

exports.NotifClient = NotifClient;