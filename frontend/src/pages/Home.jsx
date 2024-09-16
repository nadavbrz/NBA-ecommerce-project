import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "../pages/pagesStyles/Home.module.css";
import { Helmet } from "react-helmet-async";
import { fetchUser } from "../utils/fetchUsers";
const Home = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      const userData = await fetchUser();
      setUser(userData);
    };
    getUser();
  }, [user]);
  const token = localStorage.getItem("token");
  return (
    <>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <div className={classes.homeContainer}>
        <header className={classes.header}>
          <h3>Hello, {user ? user.username : "Guest"}!</h3>
          <img className={classes.logo} src="/images/NBA.png" alt="NBA logo" />
          <h1 className={classes.ballerShop}>Baller Shop</h1>
        </header>
        {!token && (
          <div className={classes.saleDiv}>
            <Link to={"auth?mode=login"}>
              <h2 className={classes.sale}>
                Only this month! sign in and get 10% off your first order use
                the code: <span className={classes.code}>BALLER10</span>
              </h2>
            </Link>
          </div>
        )}

        <section className={classes.heroSection}>
          <div className={classes.heroContent}>
            <h2>Shop the Latest NBA Jerseys</h2>
            <p>Represent your favorite team with our exclusive collection.</p>
            <Link to="/products" className={classes.shopNowBtn}>
              Shop Now
            </Link>
          </div>
        </section>

        <section className={classes.featuredSection}>
          <div className={classes.featuredCategory}>
            <h2>Featured Current Jerseys</h2>
            <div className={classes.featuredItemContainer}>
              <div className={classes.featuredItem}>
                <Link to="/productsJerseys/66be46f7922dad457b3ba215">
                  <img
                    src="https://fanatics.frgimages.com/los-angeles-lakers/mens-fanatics-lebron-james-gold-los-angeles-lakers-fast-break-replica-player-jersey-icon-edition_pi3216000_altimages_ff_3216625alt1_full.jpg?_hv=2&w=900"
                    alt="LeBron James Jersey"
                  />
                </Link>
              </div>
              <div className={classes.featuredItem}>
                <Link to="/productsJerseys/66be49838443e0eb2f9eb029">
                  <img
                    src="https://fanatics.frgimages.com/golden-state-warriors/unisex-nike-stephen-curry-white-golden-state-warriors-swingman-jersey-association-edition_pi4650000_altimages_ff_4650305-5a3789c93b773e1b33efalt1_full.jpg?_hv=2&w=900"
                    alt="Stephen Curry Jersey"
                  />
                </Link>
              </div>
              <div className={classes.featuredItem}>
                <Link to="/productsJerseys/66be4a46283a888cd815fc5e">
                  <img
                    src="https://fanatics.frgimages.com/phoenix-suns/unisex-nike-kevin-durant-white-phoenix-suns-swingman-jersey-association-edition_ss5_p-200031322+pv-1+u-vk5x0cbwtrqtj8qpylyn+v-nqwy7w62alnlcc3bxa5v.jpg?_hv=2&w=900"
                    alt="Kevin Durant Jersey"
                  />
                </Link>
              </div>
            </div>
          </div>

          <div className={classes.featuredCategory}>
            <h2>Featured Classic Jerseys</h2>
            <div className={classes.featuredItemContainer}>
              <div className={classes.featuredItem}>
                <Link to="/productsClassicJerseys/66be52c5010ae4490b37dbf2">
                  <img
                    src="https://fanatics.frgimages.com/chicago-bulls/mens-mitchell-and-ness-michael-jordan-scarlet-chicago-bulls-1997/98-hardwood-classics-authentic-jersey_pi3902000_altimages_ff_3902287-1c1317b0ddf7fbe59314alt1_full.jpg?_hv=2&w=900"
                    alt="Michael Jordan Jersey"
                  />
                </Link>
              </div>
              <div className={classes.featuredItem}>
                <Link to="/productsClassicJerseys/66be52df9a7661614200e614">
                  <img
                    src="https://fanatics.frgimages.com/los-angeles-lakers/mens-mitchell-and-ness-kobe-bryant-gold-los-angeles-lakers-2008-09-hardwood-classics-authentic-player-jersey_pi3633000_altimages_ff_3633465-9080c9ba99c419ac1e50alt1_full.jpg?_hv=2&w=900"
                    alt="Kobe Bryant Jersey"
                  />
                </Link>
              </div>
              <div className={classes.featuredItem}>
                <Link to="/productsClassicJerseys/66be5313329f52eca0b26cc1">
                  <img
                    src="https://fanatics.frgimages.com/los-angeles-lakers/mens-mitchell-and-ness-shaquille-oneal-gold-los-angeles-lakers-1996/97-hardwood-classics-swingman-jersey_pi3641000_altimages_ff_3641667-0956a62024bd20d05c36alt1_full.jpg?_hv=2&w=900"
                    alt="Shaquille O'Neal Jersey"
                  />
                </Link>
              </div>
            </div>
          </div>

          <div className={classes.featuredCategory}>
            <h2>Featured Shorts</h2>
            <div className={classes.featuredItemContainer}>
              <div className={classes.featuredItem}>
                <Link to="/productsShorts/66be62896ec95a0afd6886ef">
                  <img
                    src="https://fanatics.frgimages.com/atlanta-hawks/mens-fanatics-red-atlanta-hawks-slice-shorts_ss5_p-5248751+pv-1+u-sihbscgfq6llvjnbwuyf+v-1kmbghyhkb3osr1bf0ir.jpg?_hv=2&w=900"
                    alt="Hawks Shorts"
                  />
                </Link>
              </div>
              <div className={classes.featuredItem}>
                <Link to="/productsShorts/66be62756ec95a0afd6886eb">
                  <img
                    src="https://fanatics.frgimages.com/chicago-bulls/mens-nike-white-chicago-bulls-2022/23-city-edition-swingman-shorts_pi4753000_altimages_ff_4753673-d9adbe470c03cbcd4fdfalt1_full.jpg?_hv=2&w=900"
                    alt="Bulls Shorts"
                  />
                </Link>
              </div>
              <div className={classes.featuredItem}>
                <Link to="/productsShorts/66be62926ec95a0afd6886f1">
                  <img
                    src="https://fanatics.frgimages.com/phoenix-suns/mens-jordan-brand-black-phoenix-suns-2022/2023-statement-edition-swingman-performance-shorts_pi4753000_altimages_ff_4753735-fb12f103bf67e310debaalt1_full.jpg?_hv=2&w=900"
                    alt="Suns Shorts"
                  />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className={classes.usersOpinionsSection}>
          <h2>What Our Customers Are Saying</h2>

          <div className={classes.usersOpinion}>
            <img src="images/man.png" alt="Mark D." />
            <div>
              <p>"My favorite place to buy jerseys. Never disappointed."</p>
              <h4>– John D.</h4>
            </div>
          </div>

          <div className={classes.usersOpinion}>
            <img src="images/woman2.png" alt="Sarah A." />
            <div>
              <p>
                "Best place to buy jerseys. Love the variety and authenticity."
              </p>
              <h4>– Sarah P.</h4>
            </div>
          </div>

          <div className={classes.usersOpinion}>
            <img src="images/woman2.png" alt="Emily R." />
            <div>
              <p>
                "Great selection and awesome prices. Will definitely recommend!"
              </p>
              <h4>– Emily R.</h4>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
