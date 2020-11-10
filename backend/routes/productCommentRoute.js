import { Router } from "express";
import Product from "../models/productModel";
import ProductComment from "../models/productCommentModel";
import User from "../models/userModel";

import { isAuth } from "../util";

const router = Router();

router.post("/create-review", isAuth, async (req, res) => {
  try {
    const {
      productId,
      userId,
      userRating,
      userComment,
      userReviewDate,
    } = req.body;

    let productComment = await ProductComment.findOne({ productId });

    if (!productComment) {
      productComment = new ProductComment({
        productId,
        comments: [],
      });
    }

    if (productComment.comments.some((comment) => comment.userId === userId)) {
      return res
        .status(403)
        .send("You can leave only one review for each product");
    }

    const comments = productComment.comments.slice(0);
    comments.push({
      userId,
      userRating,
      userComment,
      userReviewDate,
    });
    productComment.comments = comments;
    const updatedProductComment = await productComment.save();

    const product = await Product.findById(productId);
    product.rating = (
      updatedProductComment.comments.reduce(
        (acc, review) => (acc += review.userRating),
        0
      ) / updatedProductComment.comments.length
    ).toFixed(1);
    product.reviewsNumber = updatedProductComment.comments.length;

    const updatedProduct = await product.save();

    res.status(200).send(updatedProductComment.comments);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error while adding review");
  }
});

router.post("/reviews", async (req, res) => {
  try {
    const { productId } = req.body;
    let productComment = await ProductComment.findOne({ productId });

    if (!productComment) {
      productComment = new ProductComment({
        productId,
        comments: [],
      });
    }

    const reviews = await Promise.all(
      productComment.comments.map(async (comment) => {
        const user = await User.findById(comment.userId);

        return {
          userRating: comment.userRating,
          userComment: comment.userComment,
          userReviewDate: comment.userReviewDate.getTime(),
          userAvatar: user.avatar,
          userName: user.name,
          userSecondName: user.secondName || "",
          userId: user._id,
        };
      })
    );

    res.status(200).send(reviews);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error while loading comments");
  }
});

router.post("/product-rating", async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await Product.findById(productId);
    res.status(200).send({
      rating: product.rating,
      reviewsNumber: product.reviewsNumber,
    });
  } catch (error) {
    res.status(404).send("Product not found");
  }
});

export default router;
