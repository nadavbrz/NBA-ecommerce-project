import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import classes from "../pagesStyles/ProductDetail.module.css";
import { Link } from "react-router-dom";
import { CartContext } from "../../utils/CartContext";
import { Helmet } from "react-helmet-async";

const ProductDetail = () => {
  const [jersey, setJersey] = useState({});
  const [allJerseys, setAllJerseys] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [alert, setAlert] = useState("");
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const getJersey = async () => {
      const response = await fetch(`https://server.brzcode.site/jerseys/${id}`);
      if (!response.ok) {
        console.error("Failed to fetch");
      }
      const responseData = await response.json();
      setJersey(responseData.data);
    };

    const getAllJerseys = async () => {
      const response = await fetch("https://server.brzcode.site/jerseys");
      if (!response.ok) {
        console.error("Failed to fetch other jerseys");
      }
      const responseData = await response.json();
      setAllJerseys(responseData.data);
    };

    getJersey();
    getAllJerseys();
  }, [id]);

  const [description, setDescription] = useState(false);
  const [terms, setTerms] = useState(false);
  const [details, setDetails] = useState(false);

  const handleDescription = () => {
    setDescription(!description);
  };
  const handleTerms = () => {
    setTerms(!terms);
  };
  const handleDetails = () => {
    setDetails(!details);
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };
  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };
  const handleAddToCart = () => {
    if (selectedSize) {
      addToCart({ ...jersey, size: selectedSize, quantity });
    } else {
      setAlert("Please select a size before adding to cart.");
    }
  };

  return (
    <>
     <Helmet>
        <title>Current jerseys details Page</title>
      </Helmet>
        <button className={classes.backBtn}>
        <Link to={"/products"}>Back to current jerseys</Link>
      </button>
      <div className={classes.ProductDetailContainer}>
        <div className={classes.ProductDetailSection}>
          <div className={classes.ProductBox}>
            <img
              className={classes.ProductImg}
              src={jersey.imgSrc}
              alt={jersey.player}
            />
          </div>
          <div className={classes.productDetails}>
            {jersey && jersey.description && (
              <h2>
                {jersey.description} jersey #{jersey.number}
              </h2>
            )}
            {jersey && jersey.price && <h2>{jersey.price}$</h2>}
            <div className={classes.quantity}>
              <label htmlFor="quantity">Quantity:</label>
              <input
                className={classes.quantity}
                id="quantity"
                type="number"
                value={quantity}
                min={1}
                max={10}
                onChange={handleQuantityChange}
              />
            </div>
            <button className={classes.cartBtn} onClick={handleAddToCart}>
              Add to cart
            </button>
            {alert.length > 0}
            <p className={classes.alert}>{alert}</p>

            <div className={classes.sizeBox}>
              <h3>Size: {selectedSize}</h3>
              <div className={classes.sizes}>
                <button
                  className={`${classes.size} ${
                    selectedSize === "XS" ? classes.active : ""
                  }`}
                  onClick={() => handleSizeClick("XS")}
                >
                  XS
                </button>
                <button
                  className={`${classes.size} ${
                    selectedSize === "S" ? classes.active : ""
                  }`}
                  onClick={() => handleSizeClick("S")}
                >
                  S
                </button>
                <button
                  className={`${classes.size} ${
                    selectedSize === "M" ? classes.active : ""
                  }`}
                  onClick={() => handleSizeClick("M")}
                >
                  M
                </button>
                <button
                  className={`${classes.size} ${
                    selectedSize === "L" ? classes.active : ""
                  }`}
                  onClick={() => handleSizeClick("L")}
                >
                  L
                </button>
                <button
                  className={`${classes.size} ${
                    selectedSize === "XL" ? classes.active : ""
                  }`}
                  onClick={() => handleSizeClick("XL")}
                >
                  XL
                </button>
                <button
                  className={`${classes.size} ${
                    selectedSize === "XXL" ? classes.active : ""
                  }`}
                  onClick={() => handleSizeClick("XXL")}
                >
                  XXL
                </button>
              </div>
            </div>
            <button className={classes.openBtn} onClick={handleDetails}>
              Details:
            </button>
            {details && (
              <ul>
                <li>Brand: Nike</li>
                <li>Material: Cotton</li>
                <li>Team: {jersey.team}</li>
                <li>Player: {jersey.player}</li>
                <li>Number: {jersey.number}</li>
                <li>Price: {jersey.price}$</li>
              </ul>
            )}
            <button className={classes.openBtn} onClick={handleDescription}>
              Description
            </button>
            {description && (
              <p>
                Capture your team's distinct identity in a new and innovative
                design when you grab this Nike Icon Edition Swingman Jersey from
                Nike. Directly inspired by Nike's Authentic jersey, it features
                classic trim and team graphics along with Nike's Dri-FIT
                technology for added comfort. Before you head to the next game,
                grab this incredible jersey so everyone knows your fandom is on
                the cutting edge.
              </p>
            )}
            <button className={classes.openBtn} onClick={handleTerms}>
              Shipping Terms & Conditions
            </button>
            {terms && (
              <p>
                We offer worldwide shipping for all our sports clothing
                products. Orders are processed within 5-10 business days,
                excluding weekends and holidays. Please note that processing
                times may be extended during peak shopping periods. for more
                click here: <br />{" "}
                <Link to={"/terms"}>Shipping Terms & Conditions</Link>
              </p>
            )}
          </div>
        </div>
        <div className={classes.otherProductSection}>
          <h3>All Jerseys:</h3>
          <div className={classes.otherProductGrid}>
            {allJerseys.map((jer) => (
              <div key={jer._id} className={classes.product}>
                <Link to={`/productsJerseys/${jer._id}`}>
                  <img src={jer.imgSrc} alt={jer.player} />
                  <h4 className={classes.otherPlayer}>{jer.player}</h4>
                  <p className={classes.otherPlayerPrice}>{jer.price}$</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
