"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _productModel = _interopRequireDefault(require("../models/productModel"));

var _productCommentModel = _interopRequireDefault(require("../models/productCommentModel"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _expressValidator = require("express-validator");

var _util = require("../util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = (0, _express.Router)();
router.post("/", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var categoryReq, sort, category, products;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            categoryReq = req.body.category;
            sort = req.body.sort;
            category = "".concat(categoryReq[0].toUpperCase()).concat(categoryReq.slice(1));
            _context.prev = 3;
            products = [];

            if (!(category === "All")) {
              _context.next = 11;
              break;
            }

            _context.next = 8;
            return _productModel["default"].find({});

          case 8:
            products = _context.sent;
            _context.next = 14;
            break;

          case 11:
            _context.next = 13;
            return _productModel["default"].find({
              category: category
            });

          case 13:
            products = _context.sent;

          case 14:
            _context.t0 = sort;
            _context.next = _context.t0 === "PRODUCTS_SORT_DATE_DESC" ? 17 : _context.t0 === "PRODUCTS_SORT_DATE_ASC" ? 19 : _context.t0 === "PRODUCTS_SORT_RATING_ASC" ? 21 : _context.t0 === "PRODUCTS_SORT_RATING_DESC" ? 23 : 25;
            break;

          case 17:
            products = products.sort(function (a, b) {
              return b.date.getTime() - a.date.getTime();
            });
            return _context.abrupt("break", 25);

          case 19:
            products = products.sort(function (a, b) {
              return a.date.getTime() - b.date.getTime();
            });
            return _context.abrupt("break", 25);

          case 21:
            products = products.sort(function (a, b) {
              return a.rating - b.rating;
            });
            return _context.abrupt("break", 25);

          case 23:
            products = products.sort(function (a, b) {
              return b.rating - a.rating;
            });
            return _context.abrupt("break", 25);

          case 25:
            res.send(products);
            _context.next = 32;
            break;

          case 28:
            _context.prev = 28;
            _context.t1 = _context["catch"](3);
            console.log(_context.t1);
            res.status(400).json({
              message: "Server error: unable to load product list"
            });

          case 32:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 28]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.post("/cart-products-list", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var productsToLoad, productsList;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            productsToLoad = req.body.productsToLoad;
            _context3.next = 4;
            return Promise.all(productsToLoad.map( /*#__PURE__*/function () {
              var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(product) {
                var foundProduct;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return _productModel["default"].findById(product._id);

                      case 2:
                        foundProduct = _context2.sent;

                        if (!foundProduct) {
                          _context2.next = 8;
                          break;
                        }

                        foundProduct.qty = product.qty;
                        return _context2.abrupt("return", {
                          foundProduct: foundProduct,
                          qty: product.qty,
                          colorActive: product.colorActive
                        });

                      case 8:
                        return _context2.abrupt("return", null);

                      case 9:
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

          case 4:
            productsList = _context3.sent;
            res.send(productsList.filter(function (elem) {
              return elem !== null;
            }));
            _context3.next = 12;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);
            res.status(400).json({
              message: "Server error: unable to load cart product list"
            });

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 8]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.post("/save-card", _util.isAuth, _util.isAdmin, /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var _req$body, name, category, image, color, price, brand, description, product, newProduct;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _req$body = req.body, name = _req$body.name, category = _req$body.category, image = _req$body.image, color = _req$body.color, price = _req$body.price, brand = _req$body.brand, description = _req$body.description;
            product = new _productModel["default"]({
              name: name,
              category: category,
              image: image,
              color: color,
              price: price,
              brand: brand,
              description: description,
              date: Date.now()
            });
            _context4.next = 5;
            return product.save();

          case 5:
            newProduct = _context4.sent;

            if (!newProduct) {
              _context4.next = 8;
              break;
            }

            return _context4.abrupt("return", res.status(200).json({
              message: "Product card created successfully",
              data: newProduct
            }));

          case 8:
            _context4.next = 13;
            break;

          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4["catch"](0);
            res.status(400).json({
              message: "An error occurred while creating a product card. Fill the fields correctly"
            });

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 10]]);
  }));

  return function (_x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}());
router["delete"]("/delete-card/:id", _util.isAuth, _util.isAdmin, /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var productId, deletedProduct;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            productId = req.params.id;
            _context5.next = 4;
            return _productModel["default"].findById(productId);

          case 4:
            deletedProduct = _context5.sent;

            if (!deletedProduct) {
              _context5.next = 9;
              break;
            }

            _context5.next = 8;
            return deletedProduct.remove();

          case 8:
            return _context5.abrupt("return", res.status(200).json({
              message: "Product card deleted successfully",
              data: deletedProduct
            }));

          case 9:
            _context5.next = 14;
            break;

          case 11:
            _context5.prev = 11;
            _context5.t0 = _context5["catch"](0);
            res.status(400).json({
              message: "An error occurred while deleting a product card"
            });

          case 14:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 11]]);
  }));

  return function (_x8, _x9) {
    return _ref5.apply(this, arguments);
  };
}());
router.put("/save-card/:id", _util.isAuth, _util.isAdmin, /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var _req$body2, name, category, image, color, price, brand, description, productId, productExisting, updatedProduct;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _req$body2 = req.body, name = _req$body2.name, category = _req$body2.category, image = _req$body2.image, color = _req$body2.color, price = _req$body2.price, brand = _req$body2.brand, description = _req$body2.description;
            productId = req.params.id;
            _context6.next = 5;
            return _productModel["default"].findById(productId);

          case 5:
            productExisting = _context6.sent;

            if (productExisting) {
              productExisting.name = name;
              productExisting.category = category;
              productExisting.image = image;
              productExisting.color = color;
              productExisting.price = price;
              productExisting.brand = brand;
              productExisting.description = description;
            }

            _context6.next = 9;
            return productExisting.save();

          case 9:
            updatedProduct = _context6.sent;

            if (!updatedProduct) {
              _context6.next = 12;
              break;
            }

            return _context6.abrupt("return", res.status(200).json({
              message: "Product card updated successfully",
              data: updatedProduct
            }));

          case 12:
            _context6.next = 17;
            break;

          case 14:
            _context6.prev = 14;
            _context6.t0 = _context6["catch"](0);
            res.status(400).json({
              message: "An error occurred while updating a product card. Fill the fields correctly"
            });

          case 17:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 14]]);
  }));

  return function (_x10, _x11) {
    return _ref6.apply(this, arguments);
  };
}());
router.get("/:category/:id", /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var id, product;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            id = req.params.id;
            _context7.next = 3;
            return _productModel["default"].findOne({
              _id: id
            });

          case 3:
            product = _context7.sent;
            product ? res.send(product) : res.status(404).send({
              errorMessage: "Product does not exist!"
            });

          case 5:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function (_x12, _x13) {
    return _ref7.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;