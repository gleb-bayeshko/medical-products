import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true },
  secondName: { type: String },
  country: { type: String },
  city: { type: String },
  sex: { type: String },
  avatar: { type: String },
  email: { type: String, required: true, unique: true, dropDups: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false},
  cart: { type: Array, required: true, default: []}
})

const userModel = model('User', userSchema);

export default userModel;