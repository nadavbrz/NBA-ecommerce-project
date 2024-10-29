import React, { useEffect, useState } from "react";
import { fetchOrders } from "../utils/fetchOrders";
import classes from "../pages/pagesStyles/UserDetails.module.css";

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
            <b>Status:</b> 
            <span
              className={`${classes.statusTag} ${
                order.status === "completed"
                  ? classes.statusCompleted
                  : order.status === "pending"
                  ? classes.statusPending
                  : classes.statusCanceled
              }`}
            >
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
          </p>
          <div>
            <h3>Products:</h3>
            <ul>
              {order.products.map((product) => (
                <li key={product._id}>
                  <img src={product.imgSrc} alt={product.productName} />
                  <div>
                    <p>
                      <b>Product Name:</b> {product.productName}
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
