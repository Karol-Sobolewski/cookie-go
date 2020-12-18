const express = require(`express`);

const router = express.Router();

const Utils = require(`../models/utils.model`);

router.get(`/utils`, async (req, res) => {
  try {
    const result = await Utils.find();
    // console.log(res);
    if (!result) res.status(404).json({ utils: `Not found` });
    else res.json(result[0]);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
