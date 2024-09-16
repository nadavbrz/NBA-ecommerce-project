import React from 'react';
import classes from '../pagesStyles/Returns.module.css';
import { Helmet } from "react-helmet-async";

const Returns = () => {
  window.scrollTo(0, 0);
  return (
    <>
    <Helmet>
      <title>Returns Page</title>
    </Helmet>

    <div className={classes.returnsExchanges}>
      <h1>Returns & Exchanges</h1>

      <section className={classes.intro}>
        <p>
          At Baller Shop, we strive to ensure that every customer is completely satisfied with their purchase. If you're not 100% happy with your order, we're here to help with easy returns and exchanges.
        </p>
      </section>

      <section className={classes.returns}>
        <h2>Return Policy</h2>
        <ul>
          <li>Items can be returned within 30 days of the delivery date.</li>
          <li>Items must be in original condition, with tags attached and in the original packaging.</li>
          <li>Custom or personalized items are not eligible for return.</li>
          <li>Refunds will be processed within 7-10 business days of receiving the return.</li>
        </ul>
      </section>

      <section className={classes.exchanges}>
        <h2>Exchange Policy</h2>
        <ul>
          <li>Exchanges are accepted within 30 days of the delivery date.</li>
          <li>Items must be in original condition, with tags attached and in the original packaging.</li>
          <li>If the new item is of a higher price, the difference must be paid before the exchange is processed.</li>
          <li>We offer one free exchange per order; additional exchanges will incur a shipping fee.</li>
        </ul>
      </section>

      <section className={classes.process}>
        <h2>How to Process a Return or Exchange</h2>
        <p>Follow these simple steps to initiate a return or exchange:</p>
        <ol>
          <li>Contact our customer service team at <a href="mailto:support@ballershop.com">support@ballershop.com</a> with your order number and reason for return or exchange.</li>
          <li>Our team will provide you with a return shipping label and instructions.</li>
          <li>Pack the items securely and attach the shipping label to the package.</li>
          <li>Drop off the package at your nearest shipping facility.</li>
          <li>Once we receive your return, we'll process your refund or exchange as per your request.</li>
        </ol>
      </section>

      <section className={classes.contactUs}>
        <h2>Need Assistance?</h2>
        <p>If you have any questions or need further assistance, don't hesitate to reach out to our customer service team at <a href="mailto:support@ballershop.com">support@ballershop.com</a>.</p>
      </section>
    </div>
    </>
  );
};

export default Returns;
