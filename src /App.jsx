// import React from "react";
import Cart from "./components/features/cart/cart";
import SwagDisplay from "./components/app/swagDisplay.jsx"; // Import the SwagDisplay component
import { useGetAllSwagsQuery } from "./components/app/swagApi.jsx"; // Import the hook
import { useGetUserQuery } from "./components/app/userApi.js";
import { useSelector } from "react-redux";

function App() {
  const { token } = useSelector((state) => state.userSlice);
  const { data: swagsData, isLoading: swagsLoading, isError: swagsError } = useGetAllSwagsQuery();
  const { data: user, isLoading: userLoading } = useGetUserQuery(token);

  const isLoading = swagsLoading || userLoading;

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (swagsError) {
    return <h1>Error loading swags.</h1>;
  }

  return (
    <div>
      {swagsData?.swags?.map((swag) => ( // Correct: .map() returns JSX
        <SwagDisplay key={swag.id} swag={swag} />
      ))}
      {user && ( // Correct: User info is rendered separately
        <div>
          <p>Welcome, {user.name}!</p>
          {/* ... other user information ... */}
        </div>
      )}
      <Cart />
    </div>
  );
}

export default App;