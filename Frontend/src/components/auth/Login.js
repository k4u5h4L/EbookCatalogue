import Axios from "axios";
import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";

function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const { getLoggedIn } = useContext(AuthContext);
  async function login(e) {
    e.preventDefault();

    try {
      const loginData = {
        email,
        password,
        password,
      };

      await Axios.post("http://localhost:8082/auth/login", loginData);
      getLoggedIn();
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      <h2>Log into your account</h2>
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <form onSubmit={login}>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email"
                  className="form-control"
                  onChange={(e) => setemail(e.target.value)}
                  value={email}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Password"
                  className="form-control"
                  onChange={(e) => setpassword(e.target.value)}
                  value={password}
                />
              </div>

              <button
                type="submit"
                className="btn btn-outline-info btn-block mt-4"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
