import express from "express";
import multer from "multer";
import sharp from "sharp";
import path from "path";
import fs from "fs";
import {
  FIELDNAME_AVATAR_IMAGE,
  FIELDNAME_PRODUCT_IMAGE,
  multerErrorMessages,
} from "../constants";
import { isAuth } from "../util";

const storage = multer.diskStorage({
  destination(req, file, callback) {
    console.log('START DESTINATION');
    if (!fs.existsSync(`uploads`)) {
      fs.mkdirSync(`uploads`);
    }

    if (fs.existsSync(`uploads/${file.fieldname}`)) {
      try {
        switch (file.fieldname) {
          case FIELDNAME_AVATAR_IMAGE:
            if (!fs.existsSync(`uploads/${file.fieldname}/temp`)) {
              fs.mkdirSync(`uploads/${file.fieldname}/temp`);
            }

            if (!fs.existsSync(`uploads/${file.fieldname}/resized`)) {
              fs.mkdirSync(`uploads/${file.fieldname}/resized`);
            }
            callback(null, `uploads/${file.fieldname}/temp`);
            break;
          case FIELDNAME_PRODUCT_IMAGE:
            callback(null, `uploads/${file.fieldname}`);
            break;
        }
      } catch (error) {
        return new Error(
          `Server error: unable to create folder for uploaded file`
        );
      }
    } else {
      try {
        switch (file.fieldname) {
          case FIELDNAME_AVATAR_IMAGE:
            fs.mkdirSync(`uploads/${file.fieldname}`);
            fs.mkdirSync(`uploads/${file.fieldname}/temp`);
            fs.mkdirSync(`uploads/${file.fieldname}/resized`);

            callback(null, `uploads/${file.fieldname}/temp`);
            break;
          case FIELDNAME_PRODUCT_IMAGE:
            fs.mkdirSync(`uploads/${file.fieldname}`);

            callback(null, `uploads/${file.fieldname}`);
            break;
        }
      } catch (error) {
        return new Error(
          `Server error: unable to create folder for uploaded file`
        );
      }
    }
  },
  filename(req, file, callback) {
    callback(null, `${Date.now()}-${file.originalname}`);
  },
});

const checkFileType = (file, callback) => {
  const fileTypes = /jpeg|jpg|png/;

  const isExtensionCorrect = fileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  const isMimeCorrect = fileTypes.test(file.mimetype);

  if (isExtensionCorrect && isMimeCorrect) {
    return callback(null, true);
  } else {
    callback("Invalid type of file. Only jpg, jpeg and png files are allowed");
  }
};

const uploadProductImage = multer({
  storage,
  fileFilter: function (req, file, callback) {
    checkFileType(file, callback);
  },
}).single(FIELDNAME_PRODUCT_IMAGE);

const uploadAvatarImage = multer({
  storage,
  fileFilter: function (req, file, callback) {
    checkFileType(file, callback);
  },
}).single(FIELDNAME_AVATAR_IMAGE);

const router = express.Router();

router.post("/:fieldname", isAuth, (req, res) => {
  const multerErrors = multerErrorMessages;

  try {
    switch (req.params.fieldname) {
      case FIELDNAME_PRODUCT_IMAGE:
        uploadProductImage(req, res, (error) => {
          if (error) {
            return res.status(400).send(`${multerErrors[error.code]}`);
          } else {
            try {
              res.send(`/${req.file.path.replace(/\\/g, "/")}`);
            } catch (error) {
              return res
                .status(400)
                .json({ message: `Error while sending image path` });
            }
          }
        });
        break;
      case FIELDNAME_AVATAR_IMAGE:
        uploadAvatarImage(req, res, async (error) => {
          if (error) {
            return res
              .status(400)
              .json({
                message: multerErrors[error.code] || error.message || error,
              });
          } else {
            const outputPath = `${req.file.destination.replace(
              "/temp",
              "/resized"
            )}/${req.file.filename}`;
            try {
              await sharp(req.file.path)
                .resize(200, 200, {
                  fit: "cover",
                })
                .toFile(outputPath);

              fs.unlinkSync(req.file.path);
              res.send(`/${outputPath.replace(/\\/g, "/")}`);
            } catch (error) {
              return res
                .status(400)
                .json({ message: `Error while sending image path` });
            }
          }
        });
        break;
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error while uploading image. Try again." });
  }
});

export default router;
