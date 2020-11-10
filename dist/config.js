"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  MONGODB_URL: process.env.MONGODB_URL || "mongodb://localhost/medical_products",
  JWT_SECRET: process.env.JWT_SECRET || "secret",
  PORT: process.env.PORT || 5000
};
exports["default"] = _default;