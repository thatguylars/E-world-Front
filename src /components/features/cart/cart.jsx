import { useSelector, useDispatch } from "react-redux";
import { removeItem, clearCart } from "./cartSlice"; // Import Redux actions
import SwagDisplay from "../../app/swagDisplay"; // Import SwagDisplay

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

 return (
   <div className="cart-container">
     <div className="swag-list">
       <h2>Swag in Cart</h2> {/* Clearer heading */}
       {cartItems.map(
         (
           item, // Map over cartItems
         ) => (
           <SwagDisplay key={item.id} swag={item} />
         ),
       )}
     </div>
     <div className="cart">
       <h2>Cart Summary</h2>
       {cartItems.length === 0 ? (
         <p>Your cart is empty.</p>
       ) : (
         <>
           {cartItems.map((item) => (
             <div key={item.id} className="cart-item">
               <h4>{item.title}</h4>
               <p>Price: ${item.price}</p>
               <p>Quantity: {item.quantity}</p>
               <button onClick={() => dispatch(removeItem(item.id))}>
                 Remove
               </button>
             </div>
           ))}
           <p>Total: ${totalPrice.toFixed(2)}</p>
           <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
         </>
       )}
     </div>
   </div>
 );
};

export default Cart;
