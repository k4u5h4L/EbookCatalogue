// app.js

const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
var cors = require("cors");
// const fileUpload = require("express-fileupload");
const path = require("path");

dotenv.config();
// routes
const books = require("./routes/api/books");

const app = express();

// Connect Database
connectDB();
app.use(express.json());
app.use(cookieParser());
// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));
// app.use(fileUpload());
app.use(express.static(path.join(__dirname, "..", "build")));
// use Routes

app.use("/api/books", books);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));

app.get("/", (req, res) => res.send("BTS Paved the way!"));
app.use("/auth", require("./routes/userRouter"));

// app.listen(3000, () => {
//   console.log("server started on port 3000");
// });
