const mongoose = require(`mongoose`);

const orderSchema = new mongoose.Schema({
  english: { title: String, description: String, price: Number },
  polish: { title: String, description: String, price: Number },
  images: [{ src: String, title: String }],
  price: Number,
  added: Date,
  category: String,
  date: Date,
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String },
  email: { type: String, required: true },
  street: { type: String, required: true },
  street2: { type: String },
  city: { type: String, required: true },
  state: { type: String },
  zip: { type: String, required: true },
  country: { type: String, required: true },
  products: { type: Array, required: true },
});

module.exports = mongoose.model(`Order`, orderSchema);
