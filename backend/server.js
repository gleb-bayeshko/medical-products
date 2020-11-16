import express from "express";
import dotenv from "dotenv";
import config from "./config";
import regeneratorRuntime from "regenerator-runtime";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import uploadRoute from "./routes/uploadRoute";
import productCommentRoute from "./routes/productCommentRoute";
import path from "path";
const app = express();

dotenv.config();

const mongodbURI = process.env.MONGODB_URI;
console.log('CONFIG:');
console.log(config.MONGODB_URI);
mongoose
  .connect(mongodbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((error) => console.log(error));


app.use("/uploads", express.static(path.join(__dirname, "/../uploads")));

app.use(bodyParser.json());

app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/product-comments", productCommentRoute);
app.use("/api/uploads", uploadRoute);

app.use(express.static(path.join(__dirname, '/../app/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../app/build/index.html`));
});

app.listen(config.PORT, () => {
  console.log(`Server is up on ${config.PORT} port` );
});
