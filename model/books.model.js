const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishedYear: {
      type: Number,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      default: "English",
    },
    country: {
      type: String,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    summary: {
      type: String,
    },
    coverImageUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const BookModel = mongoose.model("Book", bookSchema);

module.exports = BookModel;
