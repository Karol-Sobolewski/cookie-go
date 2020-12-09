const mongoose = require(`mongoose`);

const productSchema = new mongoose.Schema({
  cookies: [
    {
      _id: { type: String, required: true },
      english: { title: String, description: String, price: Number },
      polish: { title: String, description: String, price: Number },
      images: [{ src: String, title: String }],
    },
  ],
  cakes: [
    {
      _id: { type: String, required: true },
      english: { title: String, description: String, price: Number },
      polish: { title: String, description: String, price: Number },
      images: [{ src: String, title: String }],
    },
  ],
  pastries: [
    {
      _id: { type: String, required: true },
      english: { title: String, description: String, price: Number },
      polish: { title: String, description: String, price: Number },
      images: [{ src: String, title: String }],
    },
  ],
  sweets: [
    {
      _id: { type: String, required: true },
      english: { title: String, description: String, price: Number },
      polish: { title: String, description: String, price: Number },
      images: [{ src: String, title: String }],
    },
  ],
});

module.exports = mongoose.model(`Product`, productSchema);
