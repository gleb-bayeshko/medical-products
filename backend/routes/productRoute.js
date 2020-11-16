import { Router } from "express";
import Product from "../models/productModel";
import ProductComment from "../models/productCommentModel";
import bcrypt from "bcrypt";
import { check, validationResult } from "express-validator";
import { getToken, isAdmin, isAuth } from "../util";

const router = Router();

router.post("/", async (req, res) => {
  console.log('STARTED API');
  const categoryReq = req.body.category;
  const sort = req.body.sort;
  const category = `${categoryReq[0].toUpperCase()}${categoryReq.slice(1)}`;
  try {
    let products = [];
    if (category === "All") {
      products = await Product.find({});
    } else {
      products = await Product.find({ category });
    }

    console.log('-----------------------------');
    console.log('PRODUCTS');
    console.log(products);
    console.log('-----------------------------');

    switch (sort) {
      case "PRODUCTS_SORT_DATE_DESC":
        products = products.sort((a, b) => b.date.getTime() - a.date.getTime());
        break;
      case "PRODUCTS_SORT_DATE_ASC":
        products = products.sort((a, b) => a.date.getTime() - b.date.getTime());
        break;
      case "PRODUCTS_SORT_RATING_ASC":
        products = products.sort((a, b) => a.rating - b.rating);
        break;
      case "PRODUCTS_SORT_RATING_DESC":
        products = products.sort((a, b) => b.rating - a.rating);
        break;
    }

    res.send(products);
  } catch (error) {
    console.log('ERROR');
    console.log(error);
    res
      .status(400)
      .json({ message: "Server error: unable to load product list" });
  }
});

router.post("/cart-products-list", async (req, res) => {
  try {
    const { productsToLoad } = req.body;
    const productsList = await Promise.all(
      productsToLoad.map(async (product) => {
        const foundProduct = await Product.findById(product._id);
        if (foundProduct) {
          foundProduct.qty = product.qty;
          return {
            foundProduct,
            qty: product.qty,
            colorActive: product.colorActive,
          };
        } else {
          return null;
        }
      })
    );
    res.send(productsList.filter((elem) => elem !== null));
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "Server error: unable to load cart product list" });
  }
});

router.post("/save-card", isAuth, isAdmin, async (req, res) => {
  try {
    const {
      name,
      category,
      image,
      color,
      price,
      brand,
      description,
    } = req.body;

    const product = new Product({
      name,
      category,
      image,
      color,
      price,
      brand,
      description,
      date: Date.now(),
    });

    const newProduct = await product.save();
    if (newProduct)
      return res.status(200).json({
        message: "Product card created successfully",
        data: newProduct,
      });
  } catch (error) {
    res.status(400).json({
      message:
        "An error occurred while creating a product card. Fill the fields correctly",
    });
  }
});

router.delete("/delete-card/:id", isAuth, isAdmin, async (req, res) => {
  try {
    const productId = req.params.id;

    const deletedProduct = await Product.findById(productId);

    if (deletedProduct) {
      await deletedProduct.remove();
      return res.status(200).json({
        message: "Product card deleted successfully",
        data: deletedProduct,
      });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "An error occurred while deleting a product card" });
  }
});

router.put("/save-card/:id", isAuth, isAdmin, async (req, res) => {
  try {
    const {
      name,
      category,
      image,
      color,
      price,
      brand,
      description,
    } = req.body;
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

    if (updatedProduct)
      return res.status(200).json({
        message: "Product card updated successfully",
        data: updatedProduct,
      });
  } catch (error) {
    res.status(400).json({
      message:
        "An error occurred while updating a product card. Fill the fields correctly",
    });
  }
});

router.get("/:category/:id", async (req, res) => {
  const id = req.params.id;
  const product = await Product.findOne({ _id: id });

  product
    ? res.send(product)
    : res.status(404).send({ errorMessage: "Product does not exist!" });
});

export default router;
