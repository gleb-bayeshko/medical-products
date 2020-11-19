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
})

const s3 = new aws.S3();

const storageS3test = multer.diskStorage({
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

const uploadAvatarImageS3TEST = multer({
  storage: storageS3test,
  fileFilter: function (req, file, callback) {
    checkFileType(file, callback);
  },
});

const router = express.Router();

router.post(
  `/s3/${FIELDNAME_AVATAR_IMAGE}`,
  isAuth,
  uploadAvatarImageS3TEST.single(FIELDNAME_AVATAR_IMAGE),
  async (req, res) => {
    console.log("-------------------------------------------");
    console.log("HERE!");
    console.log("HERE!");
    console.log("-------------------------------------------");
    try {
      if (!req.file) {
        throw new Error("File not found");
      }
      console.log('LOCATION---------------------------------------');
      console.log(req.file.location);
      console.log('LOCATION---------------------------------------');
      console.log('PATH---------------------------------------');
      console.log(req.file.path);
      console.log('PATH---------------------------------------');

      let uploadResult;

      await sharp(req.file.path)
        .resize(200, 200, {
          fit: "cover",
        })
        .toBuffer()
        .then(buffer => {
          uploadResult = s3.upload({
            Bucket: "medical-products-bayeshko",
            ACL: "public-read",
            Key: `${Date.now()}-avatar-${req.file.filename}`,
            Body: buffer
          }, (error, data) => {
            if (error) {
              console.log('ERROR UPLOAD----------------------------------');
              console.log(error);
              console.log('ERROR UPLOAD----------------------------------');
            }
            console.log('DATA LOCATION----------------------------------');
            console.log(data.location);
            console.log('DATA LOCATION----------------------------------');
          })

          return uploadResult;
        })
        .then((uploadResult) => {
          fs.unlinkSync(req.file.path);
          return uploadResult;
        })
        .then((uploadResult) => {
          console.log('RESULT_--------------------------');
          console.log(uploadResult);
          console.log('RESULT_--------------------------');
          res.send(``);
        })
        .catch(error => res.send(error))

      // res.send(`/${req.file.path.replace(/\\/g, "/")}`);
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
