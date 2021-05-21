import axios from "axios";
import React, { useContext } from "react";
// import { useHistory } from "react-router";

import AuthContext from "../../context/AuthContext";

function LogOutBtn() {
  const { getLoggedIn } = useContext(AuthContext);
  //   const history = useHistory();
  async function logOut() {
    await axios.get("http://localhost:8082/auth/logout");
    // await axios.get(
    //   "https://mern-auth-template-tutorial.herokuapp.com/auth/logout"
    // );
    await getLoggedIn();
    // this.props.history.push("/");
  }

  return <button onClick={logOut}>Log out</button>;
}

export default LogOutBtn;
