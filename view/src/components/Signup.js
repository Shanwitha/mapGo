import React, { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const Signup = () => {
  //user instance for schema
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  //function handleInput: sets each value to a user key
  let key, value;
  const handleInputs = (event) => {
    // console.log(event.target.name);
    // console.log(event.target.value);
    key = event.target.name;
    value = event.target.value;

    setUser({ ...user, [key]: value }); //react hook
    // console.log(user);
  };

  const checkEmail = function () {
    let email = user.email;
    let text = email.slice(email.length - 11, email.length);
    if (text === "@iitk.ac.in") {
      return true;
    }
    window.alert("Invalid EmailId");
    return false;
  };

  const checkPassword = function () {
    if (user.password === user.confirmpassword) {
      return true;
    }
    window.alert("password and confirm password must be same");
    return false;
  };

  // const str=JSON.stringify(user);
  // console.log(str);

  //function called after submit button

  const navigate = useNavigate();

  const submitForm = async (event) => {
    try {
      event.preventDefault();

      const { username, email, password, confirmpassword } = user;

      if (checkEmail() && checkPassword()) {
        const res = await fetch("http://localhost:5000/api/user/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            iitkemail: email,
            password: password,
          }),
        });

        // console.log("this is response");
        // console.log(res);
        // console.log("that was res")

        if (res.status === 400) {
          window.alert("username taken, try another one");
          console.log("username taken");
        } else if (res.status === 200) {
          window.alert("successful registration");
          navigate("/signin");
        } else if (res.status === 500) {
          console.log("error in searching db");
        } else {
          console.log("unknown err");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <body className="loginbody">
        <div className="container loginbox">
          <div className="row1">
            <div className="mx-auto">
              <div className="card border-0 shadow rounded-3 my-5 con2">
                <p className="signin">Sign Up</p>
                <div className="card-body">
                  <br />
                  <br />
                  <form>
                    <div className="form-floating mb-3">
                      <input
                        type="username"
                        className="form-control"
                        id="floatingUsername"
                        name="username"
                        placeholder="username"
                        value={user.username}
                        onChange={handleInputs}
                        autoComplete="off"
                      />
                      <label className="input" htmlFor="floatingInput">
                        Username
                      </label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        id="floatingEmail"
                        placeholder="email"
                        value={user.email}
                        onChange={handleInputs}
                        autoComplete="off"
                      />
                      <label className="input" htmlFor="floatingInput">
                        Email
                      </label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        id="floatingPassword"
                        placeholder="password"
                        value={user.password}
                        onChange={handleInputs}
                        autoComplete="off"
                      />
                      <label className="input" htmlFor="floatingPassword">
                        Password
                      </label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="password"
                        name="confirmpassword"
                        className="form-control"
                        id="floatingInput"
                        placeholder="confirmpassword"
                        value={user.confirmpassword}
                        onChange={handleInputs}
                        autoComplete="off"
                      />
                      <label className="input" htmlFor="floatingInput">
                        Confirm Password
                      </label>
                    </div>
                  </form>
                  <button
                    className="text-uppercase button"
                    onClick={submitForm}
                    type="submit"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </>
  );
};

export default Signup;
