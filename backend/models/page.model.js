const mongoose = require(`mongoose`);

const pageSchema = new mongoose.Schema({
  page: String,
  english: {
    header: String,
    descriptions: [{ text: String }],
  },
  polish: {
    header: String,
    descriptions: [{ text: String }],
  },
  images: [
    {
      src: String,
      title: String,
    },
  ],
});

module.exports = mongoose.model(`Page`, pageSchema);
