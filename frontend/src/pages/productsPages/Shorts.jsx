import React, { useEffect, useState } from "react";
import classes from "../pagesStyles/Products.module.css";
import { Link } from "react-router-dom";
import DropDown from "../../components/DropDown";
import { Helmet } from "react-helmet-async";
import { sortByPrice } from "../../utils/sortByPrice "

const Shorts = () => {
  const [shorts, setShorts] = useState([]);
  const [sortOrder, setSortOrder] = useState("default");
  const getShorts = async () => {
    const response = await fetch("http://localhost:5050/shorts");
    if (!response.ok) {
      return;
    }
    const responseData = await response.json();
    setShorts(responseData.data);
  };

  useEffect(() => {
    getShorts();
  }, []);
  const handleSort = (order) => {
    setSortOrder(order);
  };
  const sortedShorts = sortByPrice(shorts, sortOrder);

  return (
    <>
     
     <Helmet>
      <title>Shorts Page</title>
    </Helmet>
      <DropDown onSort={handleSort}/>

      <div className={classes.galleryContainer}>
        {sortedShorts &&
          sortedShorts.map((short) => (
            <div key={short._id} className={classes.playerBox}>
              <Link to={`/productsShorts/${short._id}`}>
                <h4>{short.team}</h4>
                <div className="imgBox">
                  <img src={short.imgSrc} alt={short.team} />
                </div>
                <h3>{short.price}$</h3>
                <h5>{short.team}</h5>
              </Link>
            </div>
          ))}
      </div>
    </>
  );
};

export default Shorts;
