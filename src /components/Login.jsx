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
 const [loginUser, { isLoading }] = useLoginUserMutation(); 

  useEffect(() => {
    if (token) {
      navigate("/account");
    }
  }, [token, navigate]);

  const formChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage("");
  };
  const login = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const result = await loginUser(form).unwrap();
      console.log("Login successful:", result);
      navigate("/account");
    } catch (error) {
      console.error("Login error:", error);
      setMessage(
        error?.data?.message || "Login failed. Please check your credentials.",
      ); // More specific error
    }
  };
 
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
              value={form.email}
              onChange={formChange}
              required
            />
          </div>
          <div className="form-group mb-2">
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              name="password"
              value={form.password}
              onChange={formChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary mb-2"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"} {/* Show loading state */}
          </button>
          <p className="text-danger">{message}</p>
          <p>
            No swag for you{" "}
            <Link to={"/register"}>Register for a new account</Link>
          </p>
        </form>
      )}
    </div>
  );
}
