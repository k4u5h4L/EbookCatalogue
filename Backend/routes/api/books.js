// routes/api/books.js

const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
// Load Book model
const Book = require("../../models/Book");
const path = require("path");
const multer = require("multer");

const upload = multer({
  storage: multer.diskStorage({
    destination(req, books, cb) {
      cb(null, "../Frontend/src/components/pdf");
    },
    filename(req, books, cb) {
      cb(null, `${new Date().getTime()}_${books.originalname}`);
      console.log("in upload");
    },
  }),
  limits: {
    fileSize: 10000000, // max file size 1MB = 1000000 bytes
  },
  // fileFilter(req, books, cb) {
  //   if (!books.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
  //     return cb(
  //       new Error(
  //         "only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format."
  //       )
  //     );
  //   }
  //   cb(undefined, true); // continue with upload
  // },
});

router.post(
  "/",
  upload.single("file"),
  async (req, res) => {
    console.log(req.body);
    // console.log(req.files.file);
    console.log(req.file);

    try {
      console.log("a");
      const { title, isbn, author, description, genre, publisher } = req.body;
      const { path, mimetype } = req.file;
      console.log(title);
      // var pdf = req.files.file;
      // pdf.mv("files/" + pdf.name, function (err) {
      //   if (err) {
      //     res.json({ status: "upload fail" });
      //   } else {
      //     res.json({ status: "upload success" });
      //   }
      // });
      const books = new Book({
        title,
        isbn,
        author,
        description,
        genre,
        publisher,
        file_path: path,
        file_mimetype: mimetype,
      });
      console.log("a");
      await books.save();
      res.send("file uploaded successfully.");
    } catch (error) {
      res.status(400).send("Error while uploading file. Try again later.");
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
);
// @route GET api/books/test
// @description tests books route
// @access Public
router.get("/test", auth, (req, res) => {
  res.send("book route testing!");
  // console.log(req.body);
});

// @route GET api/books
// @description Get all books
// @access Public
router.get("/", (req, res) => {
  Book.find()
    .then((books) => res.json(books))
    .catch((err) => res.status(404).json({ nobooksfound: "No Books found" }));
});

// @route GET api/books/:id
// @description Get single book by id
// @access Public
router.get("/:id", (req, res) => {
  console.log(req.params.id);
  Book.findById(req.params.id)
    .then((book) => res.json(book))
    .catch((err) => res.status(404).json({ nobookfound: "No Book found" }));
});

// @route GET api/books
// @description add/save book
// @access Public

// router.post("/", obj);

// router.post("/", (req, res) => {
//   // res.send(req.body);
//   // console.log(req.files.file);
//   console.log(req.files);
//   Book.create(req.body)
//     .then((book) => res.json({ msg: "Book added successfully" }))
//     .catch((err) => res.status(400).json({ error: "Unable to add this book" }));
// });

// @route GET api/books/:id
// @description Update book
// @access Public
router.put("/:id", (req, res) => {
  Book.findByIdAndUpdate(req.params.id, req.body)
    .then((book) => res.json({ msg: "Updated successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

// @route GET api/books/:id
// @description Delete book by id
// @access Public
router.delete("/:id", (req, res) => {
  Book.findByIdAndRemove(req.params.id, req.body)
    .then((book) => res.json({ mgs: "Book entry deleted successfully" }))
    .catch((err) => res.status(404).json({ error: "No such a book" }));
});

module.exports = router;
