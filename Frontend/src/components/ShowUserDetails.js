import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import axios from "axios";

class showUserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      uid: {},
    };
  }

  componentDidMount() {
    // console.log("Print id: " + this.props.match.params.id);
    // console.log(this.props.match.params.id);
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
  }

  render() {
    // const id = this.state.uid;
    // console.log(this.state.uid);

    const tier = this.state.user.tier;
    console.log(tier);
    return <div></div>;
  }
}

export default showUserDetails;
