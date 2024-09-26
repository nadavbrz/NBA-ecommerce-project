import React from "react";
import classes from "./Footer.module.css";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";

const Footer = () => {
  return (
    <div className={classes.Footer}>
      <div className={classes.FirstCol}>
        <p>
          <FaMapMarkerAlt /> Address:{" "}
          <a
            href="https://www.google.com/maps/place/Even+Gvirol+Street,+Tel+Aviv,+Israel"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.MapLink}
          >
            Even Gvirol Street, Suite 555, Israel, TLV
          </a>
        </p>
        <p>
          <FaEnvelope /> Email:{" "}
          <a href="mailto:ballershop10@gmail.com" className={classes.EmailLink}>
            ballershop10@gmail.com
          </a>
        </p>
        <p>
          <FaPhone /> Phone:{" "}
          <a href="tel:+972123456789" className={classes.PhoneLink}>
            (+972) 12-3456-789
          </a>
        </p>
      </div>
      <div className={classes.SecondCol}>
        <Link to="contact">Help</Link> <br />
        <Link to="privacyPolicy">Privacy Policy</Link> <br />
        <Link to="returns">Returns + Exchanges</Link> <br />
        <Link to="terms">Shipping Terms & Conditions</Link> <br />
        <Link to="faqs">FAQ’s</Link>
      </div>
      <div className={classes.ThirdCol}>
        <Link to="about">About Us</Link> <br />
        <Link to="about">Our Story</Link> <br />
        <Link to="products">Visit Our Store</Link> <br />
        <Link to="contact">Contact Us</Link> <br />
        <Link to="auth?mode=login">Account</Link>
      </div>
      <div className={classes.FourthCol}>
        <Link to="auth?mode=signup">
          Sign Up for Email: Get first dibs on new arrivals, sales, exclusive
          content, and more!
        </Link>
        <div className={classes.SocialIcons}>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className={classes.SocialLink}
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className={classes.SocialLink}
          >
            <FaFacebookF />
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className={classes.SocialLink}
          >
            <FaLinkedinIn />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
