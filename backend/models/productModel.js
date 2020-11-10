import { Schema, model } from "mongoose";

const productSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  color: { type: Array, required: true },
  price: { type: Number, required: true },
  brand: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, default: 0, required: true },
  reviewsNumber: { type: Number, default: 0, required: true },
  date: { type: Date, default: 0, required: true },
});

const productModel = model("Product", productSchema);

export default productModel;
