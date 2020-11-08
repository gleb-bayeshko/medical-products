import express from 'express';
import dotenv from 'dotenv';
import config from './config';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';
import uploadRoute from './routes/uploadRoute';
import productCommentRoute from './routes/productCommentRoute';
import path from 'path';

dotenv.config();

const mongodbURL = config.MONGODB_URL;
mongoose.connect(mongodbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).catch(error => console.log(error.reason));

const app = express();

app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));

app.use(bodyParser.json());

app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/product-comments', productCommentRoute);
app.use('/api/uploads', uploadRoute)

app.listen(5000)