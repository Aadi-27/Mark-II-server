const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookmarkSchema = new Schema({
  title: { type: String },
  link: { type: String },
  time: { type: String },
});

module.exports = mongoose.model("Bookmark", bookmarkSchema);
