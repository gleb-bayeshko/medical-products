"use strict";

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _config = _interopRequireDefault(require("./config"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _userRoute = _interopRequireDefault(require("./routes/userRoute"));

var _productRoute = _interopRequireDefault(require("./routes/productRoute"));

var _uploadRoute = _interopRequireDefault(require("./routes/uploadRoute"));

var _productCommentRoute = _interopRequireDefault(require("./routes/productCommentRoute"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();

_dotenv["default"].config();

var mongodbURL = _config["default"].MONGODB_URL;

_mongoose["default"].connect(mongodbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})["catch"](function (error) {
  return console.log(error.reason);
});

app.use("/uploads", _express["default"]["static"](_path["default"].join(__dirname, "/../uploads")));
app.use(_bodyParser["default"].json());
app.use("/api/users", _userRoute["default"]);
app.use("/api/products", _productRoute["default"]);
app.use("/api/product-comments", _productCommentRoute["default"]);
app.use("/api/uploads", _uploadRoute["default"]);
app.use(_express["default"]["static"](_path["default"].join(__dirname, '/../app/build')));
app.get('*', function (req, res) {
  res.sendFile(_path["default"].join("".concat(__dirname, "/../app/build/index.html")));
});
app.listen(_config["default"].PORT, function () {
  console.log("Server is up on ".concat(_config["default"].PORT, " port"));
});