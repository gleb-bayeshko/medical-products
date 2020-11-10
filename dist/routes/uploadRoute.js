"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _multer = _interopRequireDefault(require("multer"));

var _sharp = _interopRequireDefault(require("sharp"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _constants = require("../constants");

var _util = require("../util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, callback) {
    if (_fs["default"].existsSync("uploads/".concat(file.fieldname))) {
      try {
        switch (file.fieldname) {
          case _constants.FIELDNAME_AVATAR_IMAGE:
            callback(null, "uploads/".concat(file.fieldname, "/temp"));
            break;

          case _constants.FIELDNAME_PRODUCT_IMAGE:
            callback(null, "uploads/".concat(file.fieldname));
            break;
        }
      } catch (error) {
        return new Error("Server error: unable to create folder for uploaded file");
      }
    } else {
      try {
        switch (file.fieldname) {
          case _constants.FIELDNAME_AVATAR_IMAGE:
            _fs["default"].mkdirSync("uploads/".concat(file.fieldname));

            _fs["default"].mkdirSync("uploads/".concat(file.fieldname, "/temp"));

            _fs["default"].mkdirSync("uploads/".concat(file.fieldname, "/resized"));

            callback(null, "uploads/".concat(file.fieldname, "/temp"));
            break;

          case _constants.FIELDNAME_PRODUCT_IMAGE:
            _fs["default"].mkdirSync("uploads/".concat(file.fieldname));

            callback(null, "uploads/".concat(file.fieldname));
            break;
        }
      } catch (error) {
        return new Error("Server error: unable to create folder for uploaded file");
      }
    }
  },
  filename: function filename(req, file, callback) {
    callback(null, "".concat(Date.now(), "-").concat(file.originalname));
  }
});

var checkFileType = function checkFileType(file, callback) {
  var fileTypes = /jpeg|jpg|png/;
  var isExtensionCorrect = fileTypes.test(_path["default"].extname(file.originalname).toLowerCase());
  var isMimeCorrect = fileTypes.test(file.mimetype);

  if (isExtensionCorrect && isMimeCorrect) {
    return callback(null, true);
  } else {
    callback("Invalid type of file. Only jpg, jpeg and png files are allowed");
  }
};

var uploadProductImage = (0, _multer["default"])({
  storage: storage,
  fileFilter: function fileFilter(req, file, callback) {
    checkFileType(file, callback);
  }
}).single(_constants.FIELDNAME_PRODUCT_IMAGE);
var uploadAvatarImage = (0, _multer["default"])({
  storage: storage,
  fileFilter: function fileFilter(req, file, callback) {
    checkFileType(file, callback);
  }
}).single(_constants.FIELDNAME_AVATAR_IMAGE);

var router = _express["default"].Router();

router.post("/:fieldname", _util.isAuth, function (req, res) {
  var multerErrors = _constants.multerErrorMessages;

  try {
    switch (req.params.fieldname) {
      case _constants.FIELDNAME_PRODUCT_IMAGE:
        uploadProductImage(req, res, function (error) {
          if (error) {
            return res.status(400).json({
              message: multerErrors[error.code]
            });
          } else {
            try {
              res.send("/".concat(req.file.path.replace(/\\/g, "/")));
            } catch (error) {
              return res.status(400).json({
                message: "Error while sending image path"
              });
            }
          }
        });
        break;

      case _constants.FIELDNAME_AVATAR_IMAGE:
        uploadAvatarImage(req, res, /*#__PURE__*/function () {
          var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(error) {
            var outputPath;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (!error) {
                      _context.next = 4;
                      break;
                    }

                    return _context.abrupt("return", res.status(400).json({
                      message: multerErrors[error.code] || error.message || error
                    }));

                  case 4:
                    outputPath = "".concat(req.file.destination.replace("/temp", "/resized"), "/").concat(req.file.filename);
                    _context.prev = 5;
                    _context.next = 8;
                    return (0, _sharp["default"])(req.file.path).resize(200, 200, {
                      fit: "cover"
                    }).toFile(outputPath);

                  case 8:
                    _fs["default"].unlinkSync(req.file.path);

                    res.send("/".concat(outputPath.replace(/\\/g, "/")));
                    _context.next = 15;
                    break;

                  case 12:
                    _context.prev = 12;
                    _context.t0 = _context["catch"](5);
                    return _context.abrupt("return", res.status(400).json({
                      message: "Error while sending image path"
                    }));

                  case 15:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, null, [[5, 12]]);
          }));

          return function (_x) {
            return _ref.apply(this, arguments);
          };
        }());
        break;
    }
  } catch (error) {
    res.status(400).json({
      message: "Error while uploading image. Try again."
    });
  }
});
var _default = router;
exports["default"] = _default;