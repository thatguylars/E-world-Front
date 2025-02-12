/* TODO - add your code to create a functional React component that renders a login form */

import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useLoginUserMutation } from "./app/userApi";
import Navigations from "./Navigations";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const { token } = useSelector((state) => state.userSlice);
  const navigate = useNavigate();
  const [loginUser] = useLoginUserMutation();
  const formChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const login = async (e) => {
    e.preventDefault();
    const result = await loginUser(form);
    if (result.error) setMessage(result.error.data.message);
    else navigate("/account");
  };

  useEffect(() => {
    const goAccount = () => {
      navigate("/account");
    };
    if (token) goAccount();
  }, []);

  return (
    <div className="loginPage">
      <Navigations />
      {!token && (
        <form onSubmit={login} className="form">
          <h1 className="display-2">Login</h1>
          <div className="form-group mb-2">
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Email"
              name="email"
              onChange={formChange}
            />
          </div>
          <div className="form-group mb-2">
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              name="password"
              onChange={formChange}
            />
          </div>
          <button type="submit" className="btn btn-primary mb-2">
            Login
          </button>
          <p className="text-danger">{message}</p>
          <p>
            Don't have a library acount?
            <Link to={"/register"}> Register for a new account</Link>
          </p>
        </form>
      )}
    </div>
  );
}
