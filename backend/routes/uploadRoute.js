import express from 'express';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, 'uploads/')
  },
  filename(req, file, callback) {
    callback(null, `${Date.now()}-${file.originalname}`);
  }
})

const checkFileType = (file, callback) => {
  // Allowed extension
  const fileTypes = /jpeg|jpg|png/;

  // Check extension
  const isExtensionCorrect = fileTypes.test(path.extname(file.originalname).toLowerCase());

  // Check mime
  const isMimeCorrect = fileTypes.test(file.mimetype);

  if (isExtensionCorrect && isMimeCorrect) {
    return callback(null, true);
  } else {
    callback('Invalid type of file. Only jpg, jpeg and png files are allowed');
  }
}

const upload = multer({
  storage,
  fileFilter: function(req, file, callback) {
    checkFileType(file, callback);
  }
 }).single('image');

const router = express.Router();

router.post('/', (req, res) => {
  upload(req, res, (error) => {
    if (error) {
      res.status(400).json({message: error})
    } else {
      try {
        res.send(`/${req.file.path}`);
      } catch (error) {
        res.status(400).json({message: error});
      }
    }
  })
})

export default router;