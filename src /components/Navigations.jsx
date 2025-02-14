/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. 
You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken } from "./app/userSlice";
// import bookLogo from "../assets/books.png";

export default function Navigations() {
  const { token } = useSelector((state) => state.userSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="navPage">
      <div className="container">
        <header className="d-flex justify-content-center py-3">
          <img id="image" src={""} />
          <nav className="nav nav-pills nav-fill">
            <a className="nav-item nav-link">
              <button className="nav-link" onClick={() => navigate("/")}>
                Home
              </button>
            </a>
            {!token && (
              <a className="nav-item nav-link">
                <button className="nav-link" onClick={() => navigate("/login")}>
                  Login
                </button>
              </a>
            )}
            {/* Account and Logout button needs to take in Token in order to display */}
            {token && (
              <a className="nav-item nav-link">
                <button className="nav-link" onClick={() => navigate("/login")}>
                  Account
                </button>
              </a>
            )}
            {token && (
              <a className="nav-item nav-link">
                <button
                  className="nav-link"
                  onClick={() => {
                    dispatch(setToken(null));
                  }}
                >
                  Logout
                </button>
              </a>
            )}
          </nav>
        </header>
      </div>
     </div>
  );
}
