const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  year: {
    type: Number,
    required: true,
  },
});

const BookModel = mongoose.model("Book", bookSchema);
module.exports = BookModel;
