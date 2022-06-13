const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
  BookName: {
    type: String,
  },
  Price: {
    type: Number,
  },
  Publisher: {
    type: String,
  },
  PublicationDate: {
    type: String,
  },
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
