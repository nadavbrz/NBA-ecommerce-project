import React from "react";
import classes from "../pagesStyles/PrivacyPolicy.module.css";
import { Helmet } from "react-helmet-async";

const PrivacyPolicy = () => {
  window.scrollTo(0, 0);
  return (
    <>
      <Helmet>
        <title>Privacy Policy Page</title>
      </Helmet>

      <div className={classes.privacyPolicy}>
        <h1>Privacy Policy</h1>

        <section className={classes.intro}>
          <p>
            At Baller Shop, we are committed to protecting your privacy and
            ensuring the security of your personal information. This Privacy
            Policy outlines how we collect, use, and safeguard your data when
            you visit our website or make a purchase from our store.
          </p>
        </section>

        <section className={classes.dataCollection}>
          <h2>Information We Collect</h2>
          <ul>
            <li>
              <strong>Personal Information</strong>: When you make a purchase,
              create an account, or subscribe to our newsletter, we collect
              personal details such as your name, email address, shipping
              address, and payment information.
            </li>
            <li>
              <strong>Browsing Data</strong>: We collect information about your
              interactions with our website, including your IP address, browser
              type, and the pages you visit.
            </li>
            <li>
              <strong>Cookies</strong>: Our website uses cookies to enhance your
              browsing experience, analyze site traffic, and personalize
              content. You can manage your cookie preferences through your
              browser settings.
            </li>
          </ul>
        </section>

        <section className={classes.dataUse}>
          <h2>How We Use Your Information</h2>
          <ul>
            <li>
              <strong>Order Processing</strong>: We use your personal
              information to process your orders, manage payments, and provide
              customer support.
            </li>
            <li>
              <strong>Communication</strong>: We may use your contact details to
              send you order confirmations, shipping updates, and promotional
              offers if you have opted in to receive them.
            </li>
            <li>
              <strong>Site Improvement</strong>: We analyze browsing data to
              improve our website's functionality, design, and user experience.
            </li>
          </ul>
        </section>

        <section className={classes.dataProtection}>
          <h2>How We Protect Your Information</h2>
          <p>
            We implement a variety of security measures to maintain the safety
            of your personal information. This includes using SSL encryption for
            data transmission, restricting access to your data, and regularly
            updating our security practices.
          </p>
        </section>

        <section className={classes.thirdParties}>
          <h2>Sharing Your Information with Third Parties</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personal
            information to outside parties, except for trusted third-party
            service providers who assist us in operating our website, conducting
            our business, or servicing you. These parties are obligated to keep
            your information confidential.
          </p>
        </section>

        <section className={classes.yourChoices}>
          <h2>Your Choices and Rights</h2>
          <ul>
            <li>
              <strong>Access and Correction</strong>: You have the right to
              access and correct your personal information at any time by
              logging into your account or contacting us directly.
            </li>
            <li>
              <strong>Opting Out</strong>: You can opt out of receiving
              promotional emails from us by following the unsubscribe link in
              our communications.
            </li>
            <li>
              <strong>Data Deletion</strong>: You may request the deletion of
              your personal information from our systems, subject to certain
              legal obligations.
            </li>
          </ul>
        </section>

        <section className={classes.policyChanges}>
          <h2>Changes to Our Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect
            changes in our practices or legal requirements. We will notify you
            of any significant changes by posting the updated policy on our
            website.
          </p>
        </section>

        <section className={classes.contactUs}>
          <h2>Contact Us</h2>
          <p>
            If you have any questions or concerns about our Privacy Policy or
            the handling of your personal information, please contact us at:{" "}
            <a href="mailto:support@ballershop.com">support@ballershop.com</a>.
          </p>
        </section>
      </div>
    </>
  );
};

export default PrivacyPolicy;
