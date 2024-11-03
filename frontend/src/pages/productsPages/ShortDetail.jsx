import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import classes from "../pagesStyles/ProductDetail.module.css";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CartContext } from "../../utils/CartContext";

const ProductDetail = () => {
  const [short, setShorts] = useState({});
  const [allShorts, setAllShorts] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [alert, setAlert] = useState("");
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const getShort = async () => {
      const response = await fetch(`https://server.brzcode.site/shorts/${id}`);
      if (!response.ok) {
        console.error("Failed to fetch");
      }
      const responseData = await response.json();
      setShorts(responseData.data);
    };

    const getAllShorts = async () => {
      const response = await fetch("https://server.brzcode.site/shorts");
      if (!response.ok) {
        console.error("Failed to fetch other shorts");
      }
      const responseData = await response.json();
      setAllShorts(responseData.data);
    };

    getShort();
    getAllShorts();
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
      addToCart({ ...short, size: selectedSize, quantity });
    } else {
      setAlert("Please select a size before adding to cart.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Shorts details Page</title>
      </Helmet>
	<button className={classes.backBtn}>
        <Link to={"/products/productsShorts"}>Back to shorts</Link>
      </button>

      <div className={classes.ProductDetailContainer}>
        <div className={classes.ProductDetailSection}>
          <div className={classes.ProductBox}>
            <img
              className={classes.ProductImg}
              src={short.imgSrc}
              alt={short.team}
            />
          </div>
          <div className={classes.productDetails}>
            {short && short.description && <h2>{short.description}</h2>}
            {short && short.price && <h2>{short.price}$</h2>}
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
                <li>Teams: {short.team}</li>
                <li>description: {short.description}</li>
                <li>Price: {short.price}$</li>
              </ul>
            )}
            <button className={classes.openBtn} onClick={handleDescription}>
              Description
            </button>
            {description && <p>{short.description}</p>}
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
          <h3>All shorts:</h3>
          <div className={classes.otherProductGrid}>
            {allShorts.map((shor) => (
              <div key={shor._id} className={classes.product}>
                <Link to={`/productsShorts/${shor._id}`}>
                  <img src={shor.imgSrc} alt={shor.team} />
                  <h4>{shor.team}</h4>
                  <p>{shor.price}$</p>
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
