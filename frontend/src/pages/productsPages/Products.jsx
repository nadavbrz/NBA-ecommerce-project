import React, { useEffect, useState } from "react";
import classes from "../pagesStyles/Products.module.css";
import { Link } from "react-router-dom";
import DropDown from "../../components/DropDown";
import { Helmet } from "react-helmet-async";
import { sortByPrice } from "../../utils/sortByPrice "

const Products = () => {
  const [jerseys, setJerseys] = useState([]);
  const [sortOrder, setSortOrder] = useState("default");
  const getJerseys = async () => {
    const response = await fetch("http://localhost:5050/jerseys");
    if (!response.ok) {
      return;
    }
    const responseData = await response.json();
    setJerseys(responseData.data);
  };
  useEffect(() => {
    getJerseys();
  }, []);
  const handleSort = (order) => {
    setSortOrder(order);
  };
  const sortedJerseys = sortByPrice(jerseys, sortOrder);
  return (
    <>
    <Helmet>
        <title>Products Page</title>
      </Helmet>
      <DropDown onSort={handleSort}/>
      <div className={classes.galleryContainer}>
        {sortedJerseys &&
          sortedJerseys.map((jersey) => (
            <div key={jersey._id} className={classes.playerBox}>
              <Link to={`/productsJerseys/${jersey._id}`}>
                <h4>{jersey.player}</h4>
                <div className="imgBox">
                  <img
                    src={jersey.imgSrc}
                    alt={jersey.player}
                  />
                </div>
                <h3>{jersey.price}$</h3>
                <h5>
                  {jersey.player} ,{jersey.team}
                </h5>
              </Link>
            </div>
          ))}
      </div>
    </>
  );
};

export default Products;
