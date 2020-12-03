const express = require(`express`);

const router = express.Router();

const Menu = require(`../models/menu.model`);

router.get(`/menus`, async (req, res) => {
  try {
    const result = await Menu.find();
    console.log(result);
    if (!result) res.status(404).json({ menu: `Not found` });
    else res.json(result[0]);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
