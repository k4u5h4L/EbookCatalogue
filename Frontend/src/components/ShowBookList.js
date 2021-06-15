import React, { Component } from "react";
import "../App.css";
import axios from "axios";
import { Link } from "react-router-dom";
import BookCard from "./BookCard";

class ShowBookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      user: {},
      uid: {},
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8082/api/books")
      .then((res) => {
        this.setState({
          books: res.data,
        });
      })
      .catch((err) => {
        console.log("Error from ShowBookList");
      });
    axios
      .get("http://localhost:8082/auth/user")
      .then((res) => {
        this.setState({
          uid: res.data,
        });
        axios
          .get("http://localhost:8082/auth/" + this.state.uid)
          .then((res) => {
            this.setState({
              user: res.data,
            });
            // console.log(this.state.username);
            console.log(this.state.user.tier);
          })
          .catch((err) => {
            console.log("User tier error");
          });
      })
      .catch((err) => {
        console.log("ID error");
      });
    // console.log(this.state.books);
    // axios
    //   .get("http://localhost:8082/auth/" + this.props.match.params.id)
    //   .then((res) => {
    //     this.setState({
    //       username: res.data,
    //     });
    //     console.log(this.state.username);
    //   })
    //   .catch((err) => {
    //     console.log("Username error");
    //   });
  }

  render() {
    // axios
    //   .get("http://localhost:8082/auth/" + this.state.uid)
    //   .then((res) => {
    //     this.setState({
    //       user: res.data,
    //     });
    //     // console.log(this.state.username);
    //     // console.log(this.state.user.tier);
    //   })
    //   .catch((err) => {
    //     console.log("User tier error");
    //   });

    const tier = this.state.user.tier;
    // console.log(tier);
    const books = this.state.books;
    const books1 = [];
    const books2 = [];
    const books3 = [];
    let bookList;
    let bookList1, bookList2, bookList3;
    let i1 = 0;
    let i2 = 0;
    let i3 = 0;

    if (this.state.books[0]) {
      console.log(books.length);
      for (let i = 0; i < books.length; i++) {
        if (books[i].genre == "Thriller") {
          books1[i1++] = books[i];
        } else if (books[i].genre == "Mystery") {
          books2[i2++] = books[i];
        } else if (books[i].genre == "Romance") {
          books3[i3++] = books[i];
        }
      }
    }
    // const username = this.state.username;
    // console.log(this.props.match.params.id);
    // console.log("PrintBook: " + books);
    // console.log(this.state.username);

    if (!books) {
      bookList = "there is no book recored!";
    } else {
      bookList = books.map((book, k) => <BookCard book={book} key={k} />);
      bookList1 = books1.map((book, k) => <BookCard book={book} key={k} />);
      bookList2 = books2.map((book, k) => <BookCard book={book} key={k} />);
      bookList3 = books3.map((book, k) => <BookCard book={book} key={k} />);
    }
    const linkstyle = {
      color: "white",
      backgroundcolor: "mediumpurple",
      boxshadow: "0px 0px 0px 0px rgba(0, 0, 0, 0.05)",
      textdecoration: "none",
    };
    return (
      <div className="ShowBookList">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <br />
              <h2 className="display-4 text-center">Books List</h2>
            </div>

            <div className="col-md-11">
              <Link
                to="/create-book"
                className="btn btn-outline-info float-right"
              >
                + Add New Book
              </Link>
              <br />
              <br />
              <hr />
            </div>
          </div>
          {tier == "tier1" && (
            <>
              <div className="list">{bookList1}</div>
            </>
          )}
          {tier == "tier2" && (
            <>
              <div className="list">{bookList2}</div>
            </>
          )}
          {tier == "tier3" && (
            <>
              <div className="list">{bookList3}</div>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default ShowBookList;
