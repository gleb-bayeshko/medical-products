"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAdmin = exports.isAuth = exports.getToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getToken = function getToken(user) {
  return _jsonwebtoken["default"].sign({
    _id: user._id,
    name: user.name,
    secondName: user.secondName || "",
    country: user.country || "",
    city: user.city || "",
    sex: user.sex || "",
    avatar: user.avatar || "",
    email: user.email,
    isAdmin: user.isAdmin,
    cart: user.cart || []
  }, _config["default"].JWT_SECRET, {
    expiresIn: "24h"
  });
};

exports.getToken = getToken;

var isAuth = function isAuth(req, res, next) {
  var token = req.headers.authorization;

  if (token) {
    var onlyToken = token.slice(7, token.length);

    _jsonwebtoken["default"].verify(onlyToken, _config["default"].JWT_SECRET, function (error, decode) {
      if (error) return res.status(401).json({
        message: "Invalid token"
      });
      req.user = decode;
      next();
      return;
    });
  } else {
    return res.status(401).json({
      message: "Token is not supplied"
    });
  }
};

exports.isAuth = isAuth;

var isAdmin = function isAdmin(req, res, next) {
  if (req.user && req.user.isAdmin) return next();
  return res.status(401).json({
    message: "Admin token is not valid"
  });
};

exports.isAdmin = isAdmin;