import React, { Component, useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import axios from "axios";
import CreateBook from "./components/CreateBook";
import ShowBookList from "./components/ShowBookList";
import ShowBookDetails from "./components/ShowBookDetails";
import UpdateBookInfo from "./components/UpdateBookInfo";
import ShowUserDetails from "./components/ShowUserDetails";
import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import SinglePagePDFViewer from "./components/pdf/single-page";
import AllPagesPDFViewer from "./components/pdf/all-pages";
import PDFReader from "./components/pdf/PDFReader";
import AuthContext, { AuthContextProvider } from "./context/AuthContext";

axios.defaults.withCredentials = true;
// const { loggedIn } = useContext(AuthContext);
class App extends Component {
  render() {
    return (
      <AuthContextProvider>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={ShowBookList} />
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>

            <Route path="/create-book" component={CreateBook} />
            <Route path="/edit-book/:id" component={UpdateBookInfo} />
            <Route path="/show-book/:id" component={ShowBookDetails} />
            <Route path="/show-user/" component={ShowUserDetails} />
            <Route path="/read-book/:id" component={PDFReader} />
          </Switch>
        </Router>
      </AuthContextProvider>
    );
  }
}

export default App;
