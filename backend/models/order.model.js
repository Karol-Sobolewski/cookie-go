const mongoose = require(`mongoose`);

const orderSchema = new mongoose.Schema({
  added: Date,
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String },
  email: { type: String, required: true },
  street: { type: String, required: true },
  house: { type: String, required: true },
  appartment: { type: String },
  city: { type: String, required: true },
  state: { type: String },
  zip: { type: String, required: true },
  country: { type: String, required: true },
  products: { type: Array, required: true },
  price: Number,
});

module.exports = mongoose.model(`Order`, orderSchema);
