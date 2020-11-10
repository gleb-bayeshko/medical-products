"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FIELDNAME_AVATAR_IMAGE = exports.FIELDNAME_PRODUCT_IMAGE = exports.multerErrorMessages = void 0;
var multerErrorMessages = {
  LIMIT_PART_COUNT: "Too many parts",
  LIMIT_FILE_SIZE: "File too large",
  LIMIT_FILE_COUNT: "Too many files",
  LIMIT_FIELD_KEY: "Field name too long",
  LIMIT_FIELD_VALUE: "Field value too long",
  LIMIT_FIELD_COUNT: "Too many fields",
  LIMIT_UNEXPECTED_FILE: "Unexpected field"
};
exports.multerErrorMessages = multerErrorMessages;
var FIELDNAME_PRODUCT_IMAGE = "product-image";
exports.FIELDNAME_PRODUCT_IMAGE = FIELDNAME_PRODUCT_IMAGE;
var FIELDNAME_AVATAR_IMAGE = "avatar-image";
exports.FIELDNAME_AVATAR_IMAGE = FIELDNAME_AVATAR_IMAGE;