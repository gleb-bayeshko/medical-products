"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var userSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  secondName: {
    type: String
  },
  country: {
    type: String
  },
  city: {
    type: String
  },
  sex: {
    type: String
  },
  avatar: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true,
    dropDups: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true,
    "default": false
  },
  cart: {
    type: Array,
    required: true,
    "default": []
  }
});
var userModel = (0, _mongoose.model)("User", userSchema);
var _default = userModel;
exports["default"] = _default;