import React from 'react'
import classes from "./pagesStyles/About.module.css"
import { Helmet } from "react-helmet-async";

const About = () => {
  return (
    <>
    <Helmet>
      <title>About Page</title>
    </Helmet>
    <div className={classes.aboutUs}>
  <h1>About Us</h1>

  <section className={classes.welcome}>
    <h2>Welcome to Baller Shop</h2>
    <p>
      At Baller Shop, we're more than just a store—we're a community of
      passionate NBA fans who live and breathe basketball. Our journey started
      with a simple idea: to bring the best and most iconic NBA jerseys to fans
      around the world. We understand that every jersey tells a story, whether
      it's the legendary Michael Jordan's #23 or the up-and-coming stars making
      their mark on the court today.
    </p>
  </section>

  <section className={classes.mission}>
    <h2>Our Mission</h2>
    <p>
      Our mission is to provide every basketball fan with high-quality,
      authentic NBA jerseys that they can wear with pride. We believe that a
      jersey is more than just apparel—it's a symbol of your love for the game,
      your favorite team, and your heroes on the court. Whether you're cheering
      from the stands, watching from home, or playing a pick-up game with
      friends, we want you to feel connected to the sport you love.
    </p>
  </section>

  <section className={classes.offerings}>
    <h2>What We Offer</h2>
    <ul>
      <li>
        <strong>Authentic NBA Jerseys</strong>: We offer a wide range of
        jerseys, from classic throwbacks to the latest designs. Every jersey is
        crafted with attention to detail, ensuring you get the best quality.
      </li>
      <li>
        <strong>Exclusive Collections</strong>: Explore our exclusive
        collections featuring limited edition jerseys, special collaborations,
        and unique designs you won't find anywhere else.
      </li>

    </ul>
  </section>

  <section className={classes.whyChooseUs}>
    <h2>Why Choose Us?</h2>
    <ul>
      <li>
        <strong>Quality You Can Trust</strong>: We source our jerseys from
        trusted manufacturers to ensure you receive only the best.
      </li>
      <li>
        <strong>Fast and Reliable Shipping</strong>: We understand that waiting
        for your jersey is the hardest part. That's why we offer fast, reliable
        shipping to get your gear to you as quickly as possible.
      </li>
      <li>
        <strong>Exceptional Customer Service</strong>: Our team is here to help
        with any questions or concerns. From finding the perfect jersey to
        tracking your order, we're committed to providing a seamless shopping
        experience.
      </li>
    </ul>
  </section>

  <section className={classes.commitment}>
    <h2>Our Commitment to Fans</h2>
    <p>
      We're committed to being more than just a store. We strive to create a
      community where NBA fans can come together to celebrate their love for the
      game. Through our blog, social media channels, and customer stories, we
      aim to connect with fans and share our passion for basketball.
    </p>
  </section>

  <section className={classes.JoinTheTeam}>
    <h2>Join the Team</h2>
    <p>
      we believe that every fan is part of the team. We
      invite you to explore our collections, share your stories, and connect
      with us on social media. Whether you're a lifelong fan or new to the game,
      we’re here to help you represent your favorite players and teams with
      pride.
    </p>
    <p>
      Thank you for choosing Baller Shop. Together, let's celebrate the
      game we love, one jersey at a time.
    </p>
  </section>
</div>
    </>
  )
}

export default About