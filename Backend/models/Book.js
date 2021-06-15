// models/Book.js

const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  // published_date: {
  //   type: Date,
  // },
  genre: {
    type: String,
  },
  publisher: {
    type: String,
  },
  file_path: {
    type: String,
    required: true,
  },
  file_mimetype: {
    type: String,
    required: true,
  },
  // updated_date: {
  //   type: Date,
  //   default: Date.now,
  // },
});

module.exports = Book = mongoose.model("book", BookSchema);
