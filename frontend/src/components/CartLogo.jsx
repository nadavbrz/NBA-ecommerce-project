import React ,{useContext} from "react";
import { FaCartShopping } from "react-icons/fa6";
import classes from "./cartLogo.module.css";
import { CartContext } from "../utils/CartContext";

const CartLogo = () => {
    const { cartItems } = useContext(CartContext);

  return (
    <div className={classes.logo}>
      <FaCartShopping />
      <span className={classes.quantity}>{cartItems.length}</span>
    </div>
  );
};

export default CartLogo;
