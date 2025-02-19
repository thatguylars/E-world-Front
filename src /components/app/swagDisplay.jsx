import { useState } from "react"; 
import { useDispatch } from "react-redux";
import { addItem } from "../features/cart/cartSlice";
import PropTypes from "prop-types"; 

const SwagDisplay = ({ swag }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [setError] = useState(null); 

  const handleAddToCart = async () => {
    setIsLoading(true);
    dispatch(addItem(swag))
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
      setError(null);
      try {
      await dispatch(addItem(swag)).unwrap(); 
    } catch (err) {
      console.error("Error adding to cart:", err);
      setError(err?.data?.message || "Failed to add to cart."); 
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="swag-display">
      <h3>{swag.title}</h3>
      <p>Price: ${swag.price}</p>
      <button onClick={handleAddToCart} disabled={isLoading}>
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
  }).isRequired,
};

export default SwagDisplay;
