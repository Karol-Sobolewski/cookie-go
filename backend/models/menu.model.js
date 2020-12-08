const mongoose = require(`mongoose`);

const menuSchema = new mongoose.Schema({
  english: [{ title: String, src: String, component: String, lg: String }],
  polish: [{ title: String, src: String, component: String, lg: String }],
  activeLanguage: String,
});

module.exports = mongoose.model(`Menu`, menuSchema);
