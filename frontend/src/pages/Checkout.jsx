import React from "react";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { postOrder } from "../utils/postOrder"; // Ensure this function exists

const stripePromise = loadStripe("pk_test_51QDj6pEH32I6fwFycHRdE4GiKAdv6uDcNlOjHfIBXlVStfBZVtwByEPJSnoTiMiWGYoNmGygF6K2vQkuV3UT8Rkq00Ae3CpoS3"); 

const CheckoutPage = () => {
    const location = useLocation();
    const clientSecret = location.state?.clientSecret;
    const cartItems = location.state?.cartItems;

    return (
        <div>
            <h2>Complete Your Payment</h2>
            {clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <PaymentForm cartItems={cartItems}/>
                </Elements>
            )}
        </div>
    );
};

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!stripe || !elements) return;
    
        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "https://nba-e-commerce-project.brzcode.site/userDetails", 
            },
        });
    
        if (error) {
            console.log(error.message);
        } else if (paymentIntent.status === 'succeeded') {
    
            const orderDetails = {
                products: cartItems.map(item => ({
                    product: item._id,
                    quantity: item.quantity,
                })),
                total: paymentIntent.amount / 100, 
            };
    
            try {
                const response = await postOrder(orderDetails); 
                console.log("Order created successfully:", response);
            } catch (error) {
                console.error("Error creating order:", error);
            }
        }
    };
    
    

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <button type="submit" disabled={!stripe}>Pay Now</button>
        </form>
    );
};

export default CheckoutPage;
