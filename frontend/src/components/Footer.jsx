import React from "react";
import classes from "./Footer.module.css";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <div className={classes.Footer}>
        <p className={classes.FirstCol}>
          Address: Even Gvirol Street, Suite 555, Israel, TLV <br /> Email:
          ballershop10@gmail.com <br /> Phone:(+972) 12-3456-789
        </p>
        <p className={classes.SecondCol}>
          <Link to={"contact"} >Help</Link> <br /><Link to={"privacyPolicy"}>Privacy Policy</Link> <br /> <Link to={"returns"}>Returns + Exchanges</Link> <br /><Link to={"terms"}> Shipping Terms & Conditions</Link> <br />
          <Link to={"faqs"}>FAQ’s</Link>
          
        </p>
        <p className={classes.ThirdCol}>
        <Link to={"about"}>about us</Link> <br /><Link to={"about"}>Our Story</Link> <br /> <Link to={"products"}>Visit Our Store </Link> <br /><Link to={"contact"}> Contact Us </Link><br /><Link to={"auth?mode=login"}> Account</Link>
        </p>
        <p className={classes.FourthCol}>
         <Link to={"auth?mode=login"}> Sign Up for Email Sign up to get first dibs on new arrivals, sales,
         exclusive content, events and more!</Link>
        </p>
      </div>
    </>
  );
};

export default Footer;
