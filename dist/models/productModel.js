"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var productSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  color: {
    type: Array,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    "default": 0,
    required: true
  },
  reviewsNumber: {
    type: Number,
    "default": 0,
    required: true
  },
  date: {
    type: Date,
    "default": 0,
    required: true
  }
});
var productModel = (0, _mongoose.model)("Product", productSchema);
var _default = productModel;
exports["default"] = _default;