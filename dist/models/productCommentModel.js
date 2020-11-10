"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var productCommentSchema = new _mongoose.Schema({
  productId: {
    type: String,
    required: true
  },
  comments: [{
    userId: {
      type: String,
      required: true
    },
    userRating: {
      type: Number,
      required: true
    },
    userComment: {
      type: String,
      required: true
    },
    userReviewDate: {
      type: Date,
      "default": 0,
      required: true
    }
  }]
});
var productCommentModel = (0, _mongoose.model)("ProductComment", productCommentSchema);
var _default = productCommentModel;
exports["default"] = _default;