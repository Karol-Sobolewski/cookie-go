const express = require(`express`);

const router = express.Router();

const Product = require(`../models/product.model`);

router.get(`/products`, async (req, res) => {
  try {
    const result = await Product.find();
    console.log(result);
    if (!result) res.status(404).json({ product: `Not found` });
    else res.json(result[0]);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
