import { Router } from "express";
import Product from "../models/productModel";
import bcrypt from "bcrypt";
import { check, validationResult } from "express-validator";
import { getToken, isAdmin, isAuth } from "../util";

const router = Router();

router.post('/', async (req, res) => {
  const categoryReq = req.body.category;
  const category = `${categoryReq[0].toUpperCase()}${categoryReq.slice(1)}`;
  try {
    if (category === 'All') {
      const products = await Product.find({});
      res.send(products);
    } else {
      const products = await Product.find({ category });
      res.send(products);
    }
  } catch (error) {
    res.status(400).json({message: 'Server error'})
  }
});

router.post('/save-card', isAuth, isAdmin, async (req, res) => {
  try {
    const { name, category, image, color, price, brand, description } = req.body;

    const product = new Product({
      name,
      category,
      image,
      color,
      price,
      brand,
      description
    })

    const newProduct = await product.save();
    if (newProduct) return res.status(200).json({message: 'Product card created successfully', data: newProduct})
  } catch (error) {
    res.status(400).json({message: 'An error occurred while creating a product card. Fill the fields correctly'})
  }
});

router.delete('/delete-card/:id', isAuth, isAdmin, async (req, res) => {
  try {
    const productId  = req.params.id;

    const deletedProduct = await Product.findById(productId);

    if (deletedProduct) {
      await deletedProduct.remove();
      return res.status(200).json({message: 'Product card deleted successfully', data: deletedProduct})
    }
  } catch (error) {
    res.status(400).json({message: 'An error occurred while deleting a product card'})
  }
});

router.put('/save-card/:id', isAuth, isAdmin, async (req, res) => {
  try {
    const { name, category, image, color, price, brand, description } = req.body;
    const productId = req.params.id;

    const productExisting = await Product.findById(productId);

    if (productExisting) {
      productExisting.name = name;
      productExisting.category = category;
      productExisting.image = image;
      productExisting.color = color;
      productExisting.price = price;
      productExisting.brand = brand;
      productExisting.description = description;
    }

    const updatedProduct = await productExisting.save();

    if (updatedProduct) return res.status(200).json({message: 'Product card updated successfully', data: updatedProduct})
  } catch (error) {
    res.status(400).json({message: 'An error occurred while updating a product card. Fill the fields correctly'})
  }
});

router.get('/:category/:id', async (req, res) => {
  const id = req.params.id;
  const product = await Product.findOne({_id: id});

  product ? res.send(product)
  : res.status(404).send({ errorMessage: "Product does not exist!" })
});


export default router;
