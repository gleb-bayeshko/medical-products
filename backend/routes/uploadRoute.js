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
const s3 = new aws.S3();

const storageS3 = multer.diskStorage({
  destination(req, file, callback) {
    if (!fs.existsSync(`uploads`)) {
      fs.mkdirSync(`uploads`);
    }

    callback(null, `uploads`);
  },
  filename(req, file, callback) {
    callback(null, `${Date.now()}-${file.originalname}`);
  }
})

const uploadImageS3 = multer({
  storage: storageS3,
  fileFilter: function (req, file, callback) {
    checkFileType(file, callback);
  },
});

const router = express.Router();

router.post(
  `/s3/${FIELDNAME_AVATAR_IMAGE}`,
  isAuth,
  uploadImageS3.single(FIELDNAME_AVATAR_IMAGE),
  async (req, res) => {
    try {
      if (!req.file) {
        throw new Error("File not found");
      }

      const location = await sharp(req.file.path)
        .resize(200, 200, {
          fit: "cover",
        })
        .toBuffer()
        .then(async buffer => {
          const result = await s3.upload({
            Bucket: "medical-products-bayeshko",
            ACL: "public-read",
            Key: `${Date.now()}-avatar-${req.file.filename}`,
            Body: buffer
          }, (error, data) => {
            if (error) {
              console.log(error);
              throw new Error(error);
            }
            return data.Location;
          }).promise();
          return result;
        })
        .then((result) => {
          fs.unlinkSync(req.file.path);
          return res.send(result.Location);
        })
    } catch (error) {
      return res.status(500).json({ message: `${error.message}` });
    }
  }
);

router.post(
  `/s3/${FIELDNAME_PRODUCT_IMAGE}`,
  isAuth,
  uploadImageS3.single(FIELDNAME_PRODUCT_IMAGE),
  async (req, res) => {
    try {
      if (!req.file) {
        throw new Error("File not found");
      }

      const location = await sharp(req.file.path)
        .resize({
          height: 280,
          fit: "cover",
        })
        .toBuffer()
        .then(async buffer => {
          const result = await s3.upload({
            Bucket: "medical-products-bayeshko",
            ACL: "public-read",
            Key: `${Date.now()}-avatar-${req.file.filename}`,
            Body: buffer
          }, (error, data) => {
            if (error) {
              console.log(error);
              throw new Error(error);
            }
            return data.Location;
          }).promise();
          return result;
        })
        .then((result) => {
          fs.unlinkSync(req.file.path);
          return res.send(result.Location);
        })
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
