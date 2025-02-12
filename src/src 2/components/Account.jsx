/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetUserQuery, useDeleteSwagMutation } from "./app/userApi.js";
import Navigations from "./Navigations.jsx";
import { useDispatch } from "react-redux";

export default function Account() {
  const { token, user } = useSelector((state) => state.userSlice);
  const [deleteSwag] = useDeleteSwagMutation();
  const dispatch = useDispatch();

  const check = () => {
    useEffect(() => {
      navigate("/login");
    }, []);
  };
  if (!token) check();
  if (token) {
    useGetUserQuery(token, { refetchOnMountOrArgChange: true });
  }
  const handleReturnSwag = async (swagId) => {
    try {
      await deleteSwag({ token: token, id: swagId });
    } catch (error) {
      console.error("Error returning swag:", error);
    }
  };

  return (
    token &&
    user && (
      <div>
        <Navigations />
        <div>
          <blockquote className="blockquote text-center">
            <p className="mb-2">
              Hi {user.firstname} {user.lastname}!
              <br />
              {user.email}
            </p>
          </blockquote>
        </div>
        <div className="swagBody">
          {!user.swags.length && (
            <div style={{ display: "grid", justifyItems: "center" }}>
              <h1 className="display-3">No swags checkout</h1>
            </div>
          )}
          {user.swags.map((itm) => {
            return (
              <div key={itm.id} className="card">
                <img
                  src={itm.coverimage}
                  className="card-img-top"
                  alt={itm.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{itm.title}</h5>
                  <p className="card-text">{itm.author}</p>
                  <p className="card-text">ID: {itm.id}</p>
                </div>
                <button
                  id={itm.id}
                  className="btn btn-danger"
                  onClick={() => handleReturnSwag(itm.id)}
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      </div>
    )
  );
}
