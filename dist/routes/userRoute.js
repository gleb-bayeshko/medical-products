"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _userModel = _interopRequireDefault(require("../models/userModel"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _expressValidator = require("express-validator");

var _util = require("../util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = (0, _express.Router)();
router.post("/register", [(0, _expressValidator.check)("email", "Invalid email").isEmail(), (0, _expressValidator.check)("password", "Invalid password: the minimum password length is 8 characters").isLength({
  min: 8
})], /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var errors, _req$body, name, email, password, dupEmail, hashPassword, user, newUser;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            errors = (0, _expressValidator.validationResult)(req);

            if (errors.isEmpty()) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", res.status(401).send(errors.array().map(function (current) {
              return current.msg;
            }).join("/n")));

          case 3:
            _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password;

            if (name) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(400).send("Name field is required"));

          case 6:
            _context.next = 8;
            return _userModel["default"].findOne({
              email: email
            });

          case 8:
            dupEmail = _context.sent;

            if (!dupEmail) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", res.status(400).send("An account with this email already exists"));

          case 11:
            _context.next = 13;
            return _bcrypt["default"].hash(password, 10);

          case 13:
            hashPassword = _context.sent;
            user = new _userModel["default"]({
              name: name,
              email: email,
              password: hashPassword,
              avatar: "/uploads/profile-img-empty.png",
              isAdmin: false
            });
            _context.next = 17;
            return user.save();

          case 17:
            newUser = _context.sent;

            if (newUser) {
              res.send({
                _id: newUser.id,
                name: newUser.name,
                secondName: newUser.secondName || "",
                country: newUser.country || "",
                city: newUser.city || "",
                sex: newUser.sex || "",
                avatar: newUser.avatar || "",
                email: newUser.email,
                isAdmin: newUser.isAdmin,
                cart: newUser.cart || [],
                token: (0, _util.getToken)(newUser)
              });
            } else {
              res.status(401).send("Invalid data");
            }

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.post("/signin", [(0, _expressValidator.check)("email", "Enter valid email").isEmail(), (0, _expressValidator.check)("password", "Enter password").exists()], /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var errors, _req$body2, email, password, signInUser, isPasswordsMatch;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            errors = (0, _expressValidator.validationResult)(req);

            if (errors.isEmpty()) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return", res.status(401).send(errors.array().map(function (current) {
              return current.msg;
            }).join("/n")));

          case 3:
            _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;

            if (!(password === "")) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", res.status(401).send("Enter password"));

          case 6:
            _context2.next = 8;
            return _userModel["default"].findOne({
              email: email
            });

          case 8:
            signInUser = _context2.sent;
            isPasswordsMatch = false;

            if (!signInUser) {
              _context2.next = 14;
              break;
            }

            _context2.next = 13;
            return _bcrypt["default"].compare(password, signInUser.password);

          case 13:
            isPasswordsMatch = _context2.sent;

          case 14:
            if (!(!signInUser || !isPasswordsMatch)) {
              _context2.next = 16;
              break;
            }

            return _context2.abrupt("return", res.status(401).send("Invalid email or password"));

          case 16:
            res.send({
              _id: signInUser.id,
              name: signInUser.name,
              secondName: signInUser.secondName || "",
              country: signInUser.country || "",
              city: signInUser.city || "",
              sex: signInUser.sex || "",
              avatar: signInUser.avatar || "",
              email: signInUser.email,
              isAdmin: signInUser.isAdmin,
              cart: signInUser.cart || [],
              token: (0, _util.getToken)(signInUser)
            });

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.post("/update-user-cart", _util.isAuth, /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var userId, _req$body3, currentCart, userCart, _user, _updatedUser, updatedCart, user, updatedUser;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            userId = req.user._id;
            _req$body3 = req.body, currentCart = _req$body3.currentCart, userCart = _req$body3.userCart;

            if (userCart) {
              _context3.next = 16;
              break;
            }

            _context3.next = 6;
            return _userModel["default"].findById(userId);

          case 6:
            _user = _context3.sent;

            if (_user) {
              _context3.next = 11;
              break;
            }

            return _context3.abrupt("return", res.status(404).send("User is not found"));

          case 11:
            _user.cart = currentCart;

          case 12:
            _context3.next = 14;
            return _user.save();

          case 14:
            _updatedUser = _context3.sent;
            return _context3.abrupt("return", res.status(200).send("User cart is updated successfully"));

          case 16:
            updatedCart = [].concat(_toConsumableArray(userCart.filter(function (product) {
              var currId = currentCart.map(function (curr) {
                return curr._id;
              });

              var _iterator = _createForOfIteratorHelper(currId),
                  _step;

              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  var id = _step.value;

                  if (id === product._id) {
                    return false;
                  }
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }

              return true;
            })), _toConsumableArray(currentCart));
            _context3.next = 19;
            return _userModel["default"].findById(userId);

          case 19:
            user = _context3.sent;

            if (user) {
              _context3.next = 24;
              break;
            }

            return _context3.abrupt("return", res.status(404).send("User is not found"));

          case 24:
            user.cart = updatedCart;

          case 25:
            _context3.next = 27;
            return user.save();

          case 27:
            updatedUser = _context3.sent;
            res.send(updatedCart);
            _context3.next = 35;
            break;

          case 31:
            _context3.prev = 31;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);
            res.status(400).send("Error while updating user cart");

          case 35:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 31]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
router.post("/update-info", _util.isAuth, /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var _req$body4, name, secondName, country, city, sex, user, userUpdated;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _req$body4 = req.body, name = _req$body4.name, secondName = _req$body4.secondName, country = _req$body4.country, city = _req$body4.city, sex = _req$body4.sex;
            _context4.next = 4;
            return _userModel["default"].findById(req.user._id);

          case 4:
            user = _context4.sent;

            if (name) {
              _context4.next = 7;
              break;
            }

            return _context4.abrupt("return", res.status(400).send("Name field must be filled"));

          case 7:
            if (!user) {
              _context4.next = 15;
              break;
            }

            user.name = name || user.name;
            user.secondName = secondName || user.secondName;
            user.country = country || user.country;
            user.city = city || user.city;
            user.sex = sex || user.sex;
            _context4.next = 16;
            break;

          case 15:
            return _context4.abrupt("return", res.status(404).send("Server error: user is not found"));

          case 16:
            _context4.next = 18;
            return user.save();

          case 18:
            userUpdated = _context4.sent;
            res.send({
              name: name || user.name,
              secondName: secondName || user.secondName,
              country: country || user.country,
              city: city || user.city,
              sex: sex || user.sex
            });
            _context4.next = 25;
            break;

          case 22:
            _context4.prev = 22;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", res.status(400).send("Server error: unable to update user data"));

          case 25:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 22]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
router.post("/update-password", _util.isAuth, /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var _req$body5, passwordPrev, passwordNew, user, isPrevPasswordsMatch, newPassword, userUpdated;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _req$body5 = req.body, passwordPrev = _req$body5.passwordPrev, passwordNew = _req$body5.passwordNew;

            if (!(passwordNew.length < 8)) {
              _context5.next = 4;
              break;
            }

            return _context5.abrupt("return", res.status(400).send("Invalid new password: the minimum password length is 8 characters"));

          case 4:
            _context5.next = 6;
            return _userModel["default"].findById(req.user._id);

          case 6:
            user = _context5.sent;
            _context5.next = 9;
            return _bcrypt["default"].compare(passwordPrev, user.password);

          case 9:
            isPrevPasswordsMatch = _context5.sent;

            if (isPrevPasswordsMatch) {
              _context5.next = 12;
              break;
            }

            return _context5.abrupt("return", res.status(400).send("Invalid current password"));

          case 12:
            _context5.next = 14;
            return _bcrypt["default"].hash(passwordNew, 10);

          case 14:
            newPassword = _context5.sent;
            user.password = newPassword;
            _context5.next = 18;
            return user.save();

          case 18:
            userUpdated = _context5.sent;
            return _context5.abrupt("return", res.status(200).send("Password was updated successfully"));

          case 22:
            _context5.prev = 22;
            _context5.t0 = _context5["catch"](0);
            return _context5.abrupt("return", res.status(400).send("Server error: unable to update password"));

          case 25:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 22]]);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
router.post("/update-avatar", _util.isAuth, /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var avatar, user, userUpdated;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            avatar = req.body.avatar.avatar;
            _context6.next = 4;
            return _userModel["default"].findById(req.user._id);

          case 4:
            user = _context6.sent;

            if (!user) {
              _context6.next = 9;
              break;
            }

            user.avatar = avatar || user.avatar;
            _context6.next = 10;
            break;

          case 9:
            return _context6.abrupt("return", res.status(404).send("Server error: user is not found"));

          case 10:
            _context6.next = 12;
            return user.save();

          case 12:
            userUpdated = _context6.sent;
            res.send({
              avatar: avatar || user.avatar
            });
            _context6.next = 19;
            break;

          case 16:
            _context6.prev = 16;
            _context6.t0 = _context6["catch"](0);
            return _context6.abrupt("return", res.status(400).send("Server error: unable to update avatar"));

          case 19:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 16]]);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;