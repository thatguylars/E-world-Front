import React from "react";
import ReactDOM from "react-dom/client";
import App from "../src /App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../src /components/app/store.js";
import SingleSwag from "../src /components/app/SingleSwag.jsx";
import Login from "../src /components/Login.jsx";
import Register from "../src /components/Register.jsx";
import Account from "../src /components/Account.jsx";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Cart from "../src /components/features/cart/cart.jsx";

const root = ReactDOM.createRoot(document.getElementById("root")); // Get the root element

root.render(
  // Now render the App component!
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />{" "}
          {/* Use the App component here */}
          <Route path="*" element={<App />} />
          <Route path="/swag/:id" element={<SingleSwag />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<div>404: Page Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
