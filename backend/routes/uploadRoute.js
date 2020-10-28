import express from 'express';
import multer from 'multer';

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, 'uploads/')
  },
  filename(req, file, callback) {
    callback(null, `${Date.now()}-${file.originalname}`);
  }
})

const upload = multer({ storage });

const router = express.Router();

router.post('/', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`);
})

export default router;