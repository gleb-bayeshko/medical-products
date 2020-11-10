"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _productModel = _interopRequireDefault(require("../models/productModel"));

var _productCommentModel = _interopRequireDefault(require("../models/productCommentModel"));

var _userModel = _interopRequireDefault(require("../models/userModel"));

var _util = require("../util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = (0, _express.Router)();
router.post("/create-review", _util.isAuth, /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, productId, userId, userRating, userComment, userReviewDate, productComment, comments, updatedProductComment, product, updatedProduct;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, productId = _req$body.productId, userId = _req$body.userId, userRating = _req$body.userRating, userComment = _req$body.userComment, userReviewDate = _req$body.userReviewDate;
            _context.next = 4;
            return _productCommentModel["default"].findOne({
              productId: productId
            });

          case 4:
            productComment = _context.sent;

            if (!productComment) {
              productComment = new _productCommentModel["default"]({
                productId: productId,
                comments: []
              });
            }

            if (!productComment.comments.some(function (comment) {
              return comment.userId === userId;
            })) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", res.status(403).send("You can leave only one review for each product"));

          case 8:
            comments = productComment.comments.slice(0);
            comments.push({
              userId: userId,
              userRating: userRating,
              userComment: userComment,
              userReviewDate: userReviewDate
            });
            productComment.comments = comments;
            _context.next = 13;
            return productComment.save();

          case 13:
            updatedProductComment = _context.sent;
            _context.next = 16;
            return _productModel["default"].findById(productId);

          case 16:
            product = _context.sent;
            product.rating = (updatedProductComment.comments.reduce(function (acc, review) {
              return acc += review.userRating;
            }, 0) / updatedProductComment.comments.length).toFixed(1);
            product.reviewsNumber = updatedProductComment.comments.length;
            _context.next = 21;
            return product.save();

          case 21:
            updatedProduct = _context.sent;
            res.status(200).send(updatedProductComment.comments);
            _context.next = 29;
            break;

          case 25:
            _context.prev = 25;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            res.status(400).send("Error while adding review");

          case 29:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 25]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.post("/reviews", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var productId, productComment, reviews;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            productId = req.body.productId;
            _context3.next = 4;
            return _productCommentModel["default"].findOne({
              productId: productId
            });

          case 4:
            productComment = _context3.sent;

            if (!productComment) {
              productComment = new _productCommentModel["default"]({
                productId: productId,
                comments: []
              });
            }

            _context3.next = 8;
            return Promise.all(productComment.comments.map( /*#__PURE__*/function () {
              var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(comment) {
                var user;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return _userModel["default"].findById(comment.userId);

                      case 2:
                        user = _context2.sent;
                        return _context2.abrupt("return", {
                          userRating: comment.userRating,
                          userComment: comment.userComment,
                          userReviewDate: comment.userReviewDate.getTime(),
                          userAvatar: user.avatar,
                          userName: user.name,
                          userSecondName: user.secondName || "",
                          userId: user._id
                        });

                      case 4:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x5) {
                return _ref3.apply(this, arguments);
              };
            }()));

          case 8:
            reviews = _context3.sent;
            res.status(200).send(reviews);
            _context3.next = 16;
            break;

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);
            res.status(400).send("Error while loading comments");

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 12]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.post("/product-rating", /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var productId, product;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            productId = req.body.productId;
            _context4.next = 4;
            return _productModel["default"].findById(productId);

          case 4:
            product = _context4.sent;
            res.status(200).send({
              rating: product.rating,
              reviewsNumber: product.reviewsNumber
            });
            _context4.next = 11;
            break;

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](0);
            res.status(404).send("Product not found");

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 8]]);
  }));

  return function (_x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;