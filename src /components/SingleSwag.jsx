/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */
import { useParams, useNavigate, Link } from "react-router-dom";
import { useGetSingleSwagQuery } from "./app/swagApi";
import Navigations from "./Navigations";
import { useSelector } from "react-redux"; // Import useSelector
import { useState } from "react"; // Import useState


export default function SingleSwag() {
  const params = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetSingleSwagQuery(params.id); // Handle isError
  const { token } = useSelector((state) => state.userSlice); // Get token from Redux
  const [isCheckingOut, setIsCheckingOut] = useState(false); // State for checkout button

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>Error loading swag.</h1>; // Display error message
  }

  if (!data || !data.swag) {
    // Check if data and data.swag exist
    return <h1>Swag not found.</h1>; // Handle the case where the swag doesn't exist
  }

  const handleCheckout = () => {
    if (token) {
      setIsCheckingOut(true); // Disable the button while checking out
      // Implement your checkout logic here (e.g., API call)
      setTimeout(() => {
        // Simulate checkout process
        setIsCheckingOut(false); // Re-enable the button after checkout
        alert("Checkout successful (simulated)!"); // Replace with actual logic
      }, 2000);
    } else {
      navigate("/login"); // Redirect to login if not logged in
    }
  };

  return (
    <div>
      <Navigations />
      <div className="singleSwag">
        <div className="singleSwagContents">
          <div>
            <img
              className="singleImg"
              src={data.swag.coverimage}
              alt={data.swag.title}
            />
            <br />
            <h1 className="display-2 mb-3">{data.swag.title}</h1>
            <h1 className="display-4 mb-1">{data.swag.author}</h1>
            <h1 className="display-6 mb-2">ID: {data.swag.id}</h1>
            <p className="lead">{data.swag.description}</p>
            <button className="btn btn-primary" onClick={() => navigate("/")}>
              Return to shop
            </button>
            {token ? ( // Conditionally render Checkout button
              <button
                className="btn btn-success ms-2"
                onClick={handleCheckout}
                disabled={isCheckingOut} // Disable during checkout
              >
                {isCheckingOut ? "Checking Out..." : "Checkout"}
              </button>
            ) : (
              <p className="mt-2">
                <Link to="/login">Log in to checkout.</Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}