/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */
import {  useEffect } from "react";
import { useSelector} from "react-redux";
import { useGetUserQuery, useDeleteSwagMutation } from "./app/userApi.js";
import Navigations from "./Navigations.jsx";
import { useNavigate } from "react-router-dom";


export default function Account() {
  const { token, user } = useSelector((state) => state.userSlice);
  const {
    data: userData,
    isLoading,
    isError,
    refetch,
  } = useGetUserQuery(token, { refetchOnMountOrArgChange: true });
  const [deleteSwag] = useDeleteSwagMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]); // Add navigate to dependency array

  const handleReturnSwag = async (swagId) => {
    try {
      await deleteSwag({ token: token, id: swagId });
      await refetch(); 
    } catch (error) {
      console.error("Error returning swag:", error);
    }
  };

  if (isLoading) {
    return <p>Loading account details...</p>;
  }

  if (isError) {
    return <p>Error loading account details.</p>;
  }

  if (!token || !userData) {
    // Combined condition
    return <p>Please log in to view your account.</p>;
  }

  return (
    token &&
    user && (
      <div>
        <Navigations />
        <div>
          <blockquote className="blockquote text-center">
            <p className="mb-2">
              Hi {user.firstName} {user.lastName}!
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
