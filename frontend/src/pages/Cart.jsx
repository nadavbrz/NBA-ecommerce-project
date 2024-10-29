import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CartContext } from "../utils/CartContext";
import classes from "./pagesStyles/Cart.module.css";
import { postOrder } from "../utils/postOrder";
import { fetchOrders } from "../utils/fetchOrders"; 

const Cart = () => {
    const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
    const [discountCode, setDiscountCode] = useState("");
    const [discountApplied, setDiscountApplied] = useState(false);
    const [discountedTotal, setDiscountedTotal] = useState(0);
    const [orderSuccess, setOrderSuccess] = useState(null);
    const [orderCount, setOrderCount] = useState(0); 
    const [discountMessage, setDiscountMessage] = useState(""); 
    const [clientSecret, setClientSecret] = useState(""); 
    const navigate = useNavigate();

    const totalAmount = cartItems?.reduce((total, item) => total + item.price, 0) || 0;


    useEffect(() => {
        const getOrderCount = async () => {
            const orders = await fetchOrders();
            setOrderCount(orders.length);
        };
        getOrderCount();
    }, []);
    
    const handleDiscountApply = () => {
        if (orderCount > 0) { 
            setDiscountMessage("Could not apply discount");
            return;
        }

        if (discountCode === "BALLER10" && !discountApplied) {
            const discountedAmount = totalAmount * 0.9;
            setDiscountedTotal(discountedAmount.toFixed(2));
            setDiscountApplied(true);
            setDiscountMessage(""); 
        }
    };

    const handleOrderSubmit = async () => {
        const productsToOrder = cartItems.map((item) => ({
            product: item._id,
            quantity: item.quantity,
        }));

        const orderTotal = discountApplied ? discountedTotal : totalAmount.toFixed(2);

        try {
            // Create payment intent
            const paymentResponse = await fetch("http://localhost:5050/api/create-payment-intent", { // Directly using the backend URL
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: orderTotal * 100 }), // amount in cents
            });
            const paymentData = await paymentResponse.json();
            setClientSecret(paymentData.clientSecret);
            
            // Here you can navigate to the checkout page to handle the payment
            navigate("/checkout", { state: { clientSecret: paymentData.clientSecret } });
        } catch (error) {
            console.error("Error creating payment intent:", error);
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
                        disabled={discountApplied}
                    />
                    <button
                        className={classes.discountButton}
                        onClick={handleDiscountApply}
                        disabled={discountApplied}
                    >
                        {discountApplied ? "Discount Applied" : "Apply Discount"}
                    </button>
                    <button onClick={clearCart}>Clear Cart</button>
                    {discountApplied ? (
                        <p>
                            <span className={classes.originalPrice}>
                                Original Total: {totalAmount.toFixed(2)}$
                            </span>
                            <span className={classes.afterSale}>
                                Discounted Total: {discountedTotal}$
                            </span>
                        </p>
                    ) : (
                        <p className={classes.total}>
                            Total Amount: {totalAmount.toFixed(2)}$
                        </p>
                    )}
                    {discountMessage && <p className={classes.discountError}>{discountMessage}</p>}
                    <button onClick={handleOrderSubmit} className={classes.orderButton}>
                        Submit Order
                    </button>
                </div>
            )}
            {orderSuccess && <p className={classes.orderMessage}>{orderSuccess}</p>}
        </div>
    );
};

export default Cart;
