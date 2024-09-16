import React, { useContext, useState } from "react";
import { CartContext } from "../utils/CartContext";
import { Link } from "react-router-dom";
import classes from "./pagesStyles/Cart.module.css";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
  const [discountCode, setDiscountCode] = useState(""); 
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountedTotal, setDiscountedTotal] = useState(0);

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleDiscountApply = () => {
    if (discountCode === "BALLER10") {
      setDiscountedTotal(totalAmount * 0.9);
      setDiscountApplied(true);
    }
  };

  return (
    <div className={classes.cartContainer}>
      <h2>Shopping Cart</h2>
      {cartItems.length < 1 ? (
        <div>
          <p className={classes.empty}>Your cart is empty</p>
          <button className={classes.btnProducts}>
            <Link to="/products">Continue shopping</Link>
          </button>
        </div>
      ) : (
        <ul className={classes.list}>
          {cartItems.map((item) => (
            <li key={item._id} className={classes.li}>
              <img
                src={item.imgSrc}
                alt={item.productName}
                className={classes.itemImg}
              />
              <div className={classes.itemDetails}>
                <p>
                  {item.productName} - {item.size}
                </p>
                <p>Price: {item.price}$</p>
                <p>Quantity: {item.quantity}</p>
                <button onClick={() => removeFromCart(item._id)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {cartItems.length > 0 && (
        <div>
        <input
          type="text"
          className={classes.discountInput}
          placeholder="Enter discount code"
          value={discountCode} 
          onChange={(e) => setDiscountCode(e.target.value)} 
        />
        <button className={classes.discountButton} onClick={handleDiscountApply}>
          Apply Discount
        </button>
        <button onClick={clearCart}>Clear Cart</button>
      
        {discountApplied ? (
          <p>
            <span className={classes.originalPrice}>
              Total amount: {totalAmount.toFixed(2)}$
            </span>
            <span className={classes.afterSale}>
              {discountedTotal.toFixed(2)}$
            </span>
          </p>
        ) : (
          <p className={classes.total}>
            Total amount: {totalAmount.toFixed(2)}$
          </p>
        )}
      </div>
      
      )}
    </div>
  );
};

export default Cart;
