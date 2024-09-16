import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import classes from "../pagesStyles/ProductDetail.module.css";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CartContext } from "../../utils/CartContext";

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
      const response = await fetch(
        `http://localhost:5050/classicJerseys/${id}`
      );
      if (!response.ok) {
        console.error("Failed to fetch");
      }
      const responseData = await response.json();
      setJersey(responseData.data);
    };

    const getAllJerseys = async () => {
      const response = await fetch("http://localhost:5050/classicJerseys");
      if (!response.ok) {
        console.error("Failed to fetch other jerseys");
      }
      const responseData = await response.json();
      setAllJerseys(responseData.data);
    };

    getJersey();
    getAllJerseys();
    window.scrollTo(0, 0);
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
        <title>Classic jerseys details Page</title>
      </Helmet>
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
                <li>year: {jersey.year}</li>
                <li>Number: {jersey.number}</li>
                <li>Price: {jersey.price}$</li>
              </ul>
            )}
            <button className={classes.openBtn} onClick={handleDescription}>
              Description
            </button>
            {description && (
              <p>
                Step back into the golden era of basketball with this throwback
                jersey, Crafted with premium materials, this jersey replicates
                the iconic design he wore during his prime.this jersey is a
                must-have for any true basketball fan. Whether you're hitting
                the court or just paying homage to one of the greatest players
                of all time
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
                <Link to={`/productsClassicJerseys/${jer._id}`}>
                  <img src={jer.imgSrc} alt={jer.player} />
                  <h4>{jer.player}</h4>
                  <p>{jer.price}$</p>
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
