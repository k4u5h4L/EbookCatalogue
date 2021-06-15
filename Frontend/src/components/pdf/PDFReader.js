import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import axios from "axios";
import AllPagesPDFViewer from "./all-pages";
import { Document, Page } from "react-pdf";
// import sPDF from "../../files/1623744177643_VMwarePlayerManual10.pdf";
import sPDF from "./sample.pdf";
var module = 1;
var mod;
var path;
var path_name;
var url;
class PDFReader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: {},
    };
  }

  componentDidMount() {
    console.log("Print id: " + this.props.match.params.id);
    axios
      .get("http://localhost:8082/api/books/" + this.props.match.params.id)

      .then((res) => {
        console.log("Print-showBookDetails-API-response: " + res.data);
        this.setState({
          book: res.data,
        });
        path_name = this.state.book.file_path.split("pdf");
        console.log(path_name);
        console.log(path_name[1]);
        path_name = path_name[1];
        path_name = path_name.slice(1);
        path = "./" + path_name + "pdf";
        console.log(path);
        // console.log(this.state.book);
      })
      .catch((err) => {
        console.log("Error from ShowBookDetails");
      });
  }

  render() {
    function sleep(ms) {
      console.log("go to sleep");
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    // importModule();
    const book = this.state.book;
    // console.log(book.file_path);
    // console.log(book._id);
    // console.log(sPDF);

    if (book.file_path) {
      path_name = book.file_path.split("pdf");
      console.log(path_name);
      console.log(path_name[1]);
    }
    // if (path_name) {
    //   path_name = path_name[1];
    //   path_name = path_name.slice(1);
    // }
    // var ur = "./" + path_name + "pdf";
    // console.log(ur);
    // path_name = book.file_path.split("pdf");
    async function pathName() {
      try {
        path_name = path_name[1];
        path_name = path_name.slice(1);
        path = "./" + path_name + "pdf";
      } catch (error) {
        console.log("path failed");
      }
    }
    async function importModule() {
      try {
        console.log(path);
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAA");
        // path_name = path_name[1];
        // path_name = path_name.slice(1);
        // path = "./" + path_name + "pdf";
        // await sleep(1000);
        // console.log("finsih sleep");
        const url = "./1623744177643_VMwarePlayerManual10.pdf";
        console.log(`${path}`);
        console.log(`${url}`);
        const res = await axios.get(
          "http://localhost:8082/api/books/" + this.props.match.params.id
        );
        console.log(res);
        const { default: module } = await import(`${url}`);
        console.log(module);
        return module;
      } catch (error) {
        console.error("import failed");
      }
    }
    console.log(url);

    (async () => {
      // path_name = path_name[1];
      // path_name = path_name.slice(1);
      // ur = "./" + path_name + "pdf";
      // await sleep(1000);
      // if (await pathName()) {
      //   console.log(path);
      // }

      mod = await importModule();

      setTimeout(() => console.log(mod), 1000);
      console.log(mod);
    })();

    console.log(mod);
    setTimeout(() => console.log(mod), 1000);

    let BookItem = (
      <div>
        <table className="table table-hover table-dark">
          {/* <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead> */}
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Title</td>
              <td>{book.title}</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Author</td>
              <td>{book.author}</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>ISBN</td>
              <td>{book.isbn}</td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>Publisher</td>
              <td>{book.publisher}</td>
            </tr>
            {/* <tr>
              <th scope="row">5</th>
              <td>Published Date</td>
              <td>{book.published_date}</td>
            </tr> */}
            <tr>
              <th scope="row">5</th>
              <td>Genre</td>
              <td>{book.genre}</td>
            </tr>
            <tr>
              <th scope="row">6</th>
              <td>Description</td>
              <td>{book.description}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );

    return (
      //   <div className="ShowBookDetails">
      //     <div className="container">
      //       <div className="row">
      //         <div className="col-md-10 m-auto">
      //           <br />
      //           <br />
      //           <h1 className="display-4 text-center">Book Details</h1>
      //         </div>
      //         <div className="col-md-8 m-auto">
      //           <br />
      //           <Link to="/" className="btn btn-outline-info float-right">
      //             Show Book List
      //           </Link>
      //         </div>
      //         <br />
      //       </div>
      //       <br />
      //       <br />
      //       <div>{BookItem}</div>
      //       <br />

      //       {/* <br />
      //         <button type="button" class="btn btn-outline-info btn-lg btn-block">Edit Book</button>
      //         <button type="button" class="btn btn-outline-danger btn-lg btn-block">Delete Book</button> */}
      //     </div>
      //   </div>

      //   <embed src="./sample.pdf" width="800px" height="2100px" />

      <div className="all-page-container">
        <AllPagesPDFViewer pd={mod} />
        {setTimeout(() => console.log(mod), 1000)}
      </div>
    );
  }
}

export default PDFReader;
