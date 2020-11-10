import { Schema, model } from "mongoose";

const productCommentSchema = new Schema({
  productId: { type: String, required: true },
  comments: [
    {
      userId: { type: String, required: true },
      userRating: { type: Number, required: true },
      userComment: { type: String, required: true },
      userReviewDate: { type: Date, default: 0, required: true },
    },
  ],
});

const productCommentModel = model("ProductComment", productCommentSchema);

export default productCommentModel;
