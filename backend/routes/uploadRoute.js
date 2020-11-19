import express from "express";
import multer from "multer";
import multerS3 from "multer-s3-transform";
import aws from "aws-sdk";
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

// S3 UPLOAD
aws.config.update({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
});

const s3 = new aws.S3();

const uploadAvatarImageS3 = multer({
  storageS3: multerS3({
    s3,
    bucket: "medical-products-bayeshko",
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    shouldTransform: function (req, file, callback) {
      callback(null, true);
    },
    transforms: [
      {
        id: "avatar",
        key: function (req, file, callback) {
          callback(null, `${Date.now()}-${file.originalname}`);
        },
        transform: function (req, file, callback) {
          callback(
            null,
            sharp().resize(200, 200, {
              fit: "cover",
            })
          );
        },
      },
    ],
  }),
  fileFilter: function (req, file, callback) {
    checkFileType(file, callback);
  },
})

const uploadProductImageS3 = multer({
  storageS3: multerS3({
    s3,
    bucket: "medical-products-bayeshko",
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    shouldTransform: function (req, file, callback) {
      callback(null, true);
    },
    key: function (req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  }),
  fileFilter: function (req, file, callback) {
    checkFileType(file, callback);
  },
}).single(FIELDNAME_PRODUCT_IMAGE);

// TEST
// const multerMemoryStorage = multer.memoryStorage();

// const uploadAvatarImageS3TEST = multer({
//   storage: multerMemoryStorage,
//   fileFilter: function (req, file, callback) {
//     checkFileType(file, callback);
//   },
// });

const router = express.Router();

router.post(
  `/s3/${FIELDNAME_AVATAR_IMAGE}`,
  isAuth,
  uploadAvatarImageS3.single(FIELDNAME_AVATAR_IMAGE),
  (req, res) => {
    console.log("-------------------------------------------");
    console.log("HERE!");
    console.log("HERE!");
    console.log("-------------------------------------------");
    try {
      if (!req.file || !req.file.buffer) {
        throw new Error("File or file buffer not found");
      }
      console.log('HERE LOGS---------------------------------------');
      console.log(req.file.location);
      console.log(req.file.transforms);
      console.log(req.file.transforms[0]);
      console.log(req.file.transforms & req.file.transforms[0] && req.file.transforms[0].location);
      console.log('HERE LOGS---------------------------------------');
      // uploadAvatarImageS3TEST(req, res, async (error) => {
      //   if (error) {
      //     return res.status(400).json({
      //       message: multerErrors[error.code] || error.message || error,
      //     });
      //   } else {
      //     const outputPath = `${req.file.destination.replace(
      //       "/temp",
      //       "/resized"
      //     )}/${req.file.filename}`;
      //     try {
      //       await sharp(req.file.path)
      //         .resize(200, 200, {
      //           fit: "cover",
      //         })
      //         .toFile(outputPath);

      //       fs.unlinkSync(req.file.path);
      //       res.send(`/${outputPath.replace(/\\/g, "/")}`);
      //     } catch (error) {
      //       return res
      //         .status(400)
      //         .json({ message: `Error while sending image path` });
      //     }
      //   }
      // });
    } catch (error) {
      return res.status(500).json({ message: `${error.message}` });
    }
  }
);

// router.post("/:fieldname", isAuth, (req, res) => {
//   console.log("-------------------------------------------");
//   console.log("OH NO!");
//   console.log("OH NO!");
//   console.log("-------------------------------------------");
//   const multerErrors = multerErrorMessages;

//   try {
//     switch (req.params.fieldname) {
//       case FIELDNAME_PRODUCT_IMAGE:
//         uploadProductImage(req, res, (error) => {
//           if (error) {
//             return res.status(400).send(`${multerErrors[error.code]}`);
//           } else {
//             try {
//               return res.send(`/${req.file.path.replace(/\\/g, "/")}`);
//             } catch (error) {
//               return res
//                 .status(400)
//                 .json({ message: `Error while sending image path` });
//             }
//           }
//         });
//         break;
//       case FIELDNAME_AVATAR_IMAGE:
//         uploadAvatarImage(req, res, async (error) => {
//           if (error) {
//             return res.status(400).json({
//               message: multerErrors[error.code] || error.message || error,
//             });
//           } else {
//             const outputPath = `${req.file.destination.replace(
//               "/temp",
//               "/resized"
//             )}/${req.file.filename}`;
//             try {
//               await sharp(req.file.path)
//                 .resize(200, 200, {
//                   fit: "cover",
//                 })
//                 .toFile(outputPath);

//               fs.unlinkSync(req.file.path);
//               res.send(`/${outputPath.replace(/\\/g, "/")}`);
//             } catch (error) {
//               return res
//                 .status(400)
//                 .json({ message: `Error while sending image path` });
//             }
//           }
//         });
//         break;
//     }
//   } catch (error) {
//     return res
//       .status(400)
//       .json({ message: "Error while uploading image. Try again." });
//   }
// });

export default router;
