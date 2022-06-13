const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const Book = require("./Models/bookSchema");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// database connection
const url = `mongodb+srv://Abu-Bakarr:5C25Rpho61aq4ZvQ@cluster0.0foji.mongodb.net/BookStore?retryWrites=true&w=majority`;
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err.message);
  });
//Home
app.get("/", async (req, res) => {
  res.send("Welcome to Book Store");
});
//Fetch all data from Db
app.get("/api/books", async (req, res) => {
  const data = await Book.find();
  res.send(data);
});
//Fetch only one record
app.get("/api/books/:id", async (req, res) => {
  try {
    let data = await Book.findById(req.params.id);
    res.send(data);
  } catch {
    return res.status(404).send("Book data was not found");
  }
});
//Post new-user-data route
app.post("/api/books/post", async (req, res) => {
  const book = new Book({
    BookName: req.body.BookName,
    Price: req.body.Price,
    Publisher: req.body.Publisher,
    PublicationDate: req.body.PublicationDate,
  });
  try {
    const data = await book.save();
    res.json(data);
  } catch (err) {
    res.send(err);
  }
});
//Modify one record
app.put("/api/books/update/:id", (req, res) => {
  const id = req.params.id;
  const update = {
    BookName: req.body.BookName,
    Price: req.body.Price,
    Publisher: req.body.Publisher,
    PublicationDate: req.body.PublicationDate,
  };

  Book.findByIdAndUpdate(id, update, (err, Models) => {
    if (!Book) {
      return res.status(404).send("Book data was not found");
    }
    res.send(Book);
  });
});
//delete record route
app.delete("/api/books/delete/:id", (req, res) => {
  const id = req.params.id;
  Book.findByIdAndRemove(id, (err, Models) => {
    if (!Book) {
      return res.status(404).send("Book data was not found");
    }
    res.send(Book);
  });
});
app.listen(3000);
