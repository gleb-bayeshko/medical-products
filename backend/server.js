import express from 'express';
import data from './data';

const app = express();

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