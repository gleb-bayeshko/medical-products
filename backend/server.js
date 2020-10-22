import express from 'express';
import data from './data';
import dotenv from 'dotenv';
import config from './config';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoute from './routes/userRoute';

dotenv.config();

const mongodbURL = config.MONGODB_URL;
mongoose.connect(mongodbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).catch(error => console.log(error.reason));

const app = express();

app.use(bodyParser.json());

app.use('/api/users', userRoute);

app.get('/api/products/:category/:id', (req, res) => {
  const productId = req.params.id;
  const productCategory = req.params.category;
  const product = data.products.find(
    currentProduct => currentProduct.category === productCategory &&
    currentProduct._id === productId
  )

  product ? res.send(product)
  : res.status(404).send({ errorMessage: "Product does not exist!" })
});

app.get('/api/products', (req, res) => {
  res.send(data.products);
});

app.listen(5000)