const express = require(`express`);

const router = express.Router();

const Order = require(`../models/order.model`);

router.get(`/orders`, async (req, res) => {
  try {
    const result = await Order.find();
    // console.log(result);
    if (!result) res.status(404).json({ menu: `Not found` });
    else res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post(`/orders`, async (req, res) => {
  try {
    const newOrder = new Order({
      date: req.body.date,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      street: req.body.street,
      street2: req.body.street2,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      country: req.body.country,
      products: req.body.products,
    });
    await newOrder.save();
    res.json(newOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
