const express = require(`express`);

const router = express.Router();

const Page = require(`../models/page.model`);

router.get(`/pages`, async (req, res) => {
  try {
    const result = await Page.find();
    console.log(`pages`, result);

    if (!result) res.status(404).json({ page: `Not found` });
    else res.json(result[0]);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
