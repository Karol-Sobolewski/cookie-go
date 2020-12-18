const mongoose = require(`mongoose`);

const utilsSchema = new mongoose.Schema({
  language: { type: String },
  rate: { type: String },
});

module.exports = mongoose.model(`Utils`, utilsSchema);
