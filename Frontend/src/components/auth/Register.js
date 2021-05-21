import Axios from "axios";
import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";

function Register() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [passwordVerify, setpasswordVerify] = useState("");

  const { getLoggedIn } = useContext(AuthContext);
  async function register(e) {
    e.preventDefault();

    try {
      const registerData = {
        email,
        password,
        passwordVerify,
      };

      await Axios.post("http://localhost:8082/auth/", registerData);
      getLoggedIn();
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      <h2>Register new account</h2>
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <form onSubmit={register}>
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
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="form-control"
                  onChange={(e) => setpasswordVerify(e.target.value)}
                  value={passwordVerify}
                />
              </div>
              <button
                type="submit"
                className="btn btn-outline-info btn-block mt-4"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
