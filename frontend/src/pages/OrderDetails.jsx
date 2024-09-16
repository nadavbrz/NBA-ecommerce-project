import React, { useEffect, useState } from "react";
import { fetchOrders } from "../utils/fetchOrders";
import classes from "../pages/pagesStyles/UserDetails.module.css";
import { Link } from "react-router-dom";

function OrderDetails() {
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const getOrderDetails = async () => {
      const orders = await fetchOrders();
      setOrderDetails(orders);
    };

    getOrderDetails();
  }, []);

  if (!orderDetails) {
    return <p>Could not find orders</p>;
  }

  return (
    <div className={classes.orderDetailsContainer}>
      <h2>Your Order Details</h2>
      {orderDetails.map((order) => (
        <div key={order._id} className={classes.orderCard}>
          <p>
            <b>Order ID:</b> {order._id}
          </p>
          <p>
            <b>Order Date:</b> {new Date(order.orderDate).toLocaleString()}
          </p>
          <p>
            <b>Status:</b> {order.status}
          </p>
          <div>
            <h3>Products:</h3>
            <ul>
              {order.products.map((product) => (
                <li key={product.product?._id}>
                 
                  <div>
                    <p>
                      <b>Product Name:</b> {product.productName}
                    </p>
                    <p>
                      <b>Model:</b> {product.model}
                    </p>
                    <p>
                      <b>Quantity:</b> {product.quantity}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <h3 className={classes.totalAmount}>
            Total Amount: ${order.totalAmount.toFixed(2)}
          </h3>
        </div>
      ))}
    </div>
  );
}

export default OrderDetails;
