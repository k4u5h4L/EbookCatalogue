import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import LogOutBtn from "../auth/LogOutBtn";

function Navbar() {
  const { loggedIn } = useContext(AuthContext);

  return (
    <nav class="navbar navbar-dark bg-dark">
      <div>
        <Link to="/" class="navbar-brand">
          Home
        </Link>
        {loggedIn === false && (
          <>
            <Link to="/register" class="navbar-brand">
              Register
            </Link>
            <Link to="/login" class="navbar-brand">
              Log in
            </Link>
          </>
        )}
        {loggedIn === true && (
          <>
            <Link to="/create-book" class="navbar-brand">
              Create
            </Link>
            <LogOutBtn />
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
