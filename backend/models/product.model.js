const mongoose = require(`mongoose`);

const productSchema = new mongoose.Schema({
  english: { title: String, description: String, price: Number },
  polish: { title: String, description: String, price: Number },
  images: [{ src: String, title: String }],
  price: Number,
  added: Date,
  category: String,
});

module.exports = mongoose.model(`Product`, productSchema);
