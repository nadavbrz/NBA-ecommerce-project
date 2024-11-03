import React, { useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import classes from "../pages/pagesStyles/Contact.module.css";
import { Helmet } from "react-helmet-async";

const Contact = () => {
  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://server.brzcode.site/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipient: formData.email, // Use email as the recipient
          name: formData.name,
          subject: "New Contact Us Message",
          text: formData.message,
        }),
      });
      const result = await response.json();
      setStatus(
        "thank you for contact us we will get back to you as soon as possible!"
      ); // Set response status
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending email:", error);
      setStatus("Failed to send email.");
    }
  };

  return (
    <>
     <Helmet>
      <title>contact Page</title>
    </Helmet>
    <div className={classes.Contact}>
      <h1>Contact Us</h1>
      <h3>
        Please fill out the contact form with any questions you have. We will
        get back to you.
      </h3>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.formRow}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Your name:"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Your Email:"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          required
          placeholder="Your message:"
          value={formData.message}
          onChange={handleChange}
        ></textarea>
        <button type="submit">
          Send
          <MdOutlineMail />
        </button>
      </form>
      {status && <p className={classes.status}>{status}</p>}
    </div>
    </>
  );
};

export default Contact;
