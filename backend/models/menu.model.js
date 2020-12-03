const mongoose = require(`mongoose`);

const menuSchema = new mongoose.Schema({
  English: [{ title: String, src: String, component: String, lg: String }],
  Polish: [{ title: String, src: String, component: String, lg: String }],
  activeLanguage: String,
});

module.exports = mongoose.model(`Menu`, menuSchema);
