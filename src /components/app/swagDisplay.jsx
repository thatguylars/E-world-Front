import { useState } from "react"; // Import useState
import { useDispatch } from "react-redux";
import { addItem } from "../features/cart/cartSlice";
import PropTypes from "prop-types"; // Import PropTypes

const SwagDisplay = ({ swag }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = () => {
    setIsLoading(true);
    dispatch(addItem(swag))
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  };

  return (
    <div className="swag-display">
      <h3>{swag.title}</h3>
      <p>Price: ${swag.price}</p>
      <button onClick={handleAddToCart} disabled={isLoading}>
        {" "}
        {/* Use handleAddToCart and disable */}
        {isLoading ? "Adding..." : "Add to Cart"}
      </button>
    </div>
  );
};

SwagDisplay.propTypes = {
  swag: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    // ... other properties
  }).isRequired,
};

export default SwagDisplay;
