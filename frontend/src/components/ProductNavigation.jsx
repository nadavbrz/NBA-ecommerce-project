import React from "react";
import classes from "./ProductNavigation.module.css"
import { NavLink, Outlet } from "react-router-dom";


const ProductNavigation = () => {
  return (
    <>
      <div className={classes.navContainer}>
        <NavLink className={({ isActive }) => (isActive ? classes.active : "")} to="." end>Current jerseys</NavLink >
        <NavLink className={({ isActive }) => (isActive ? classes.active : "")} to="productsClassicJerseys">Classic jerseys</NavLink >
        <NavLink className={({ isActive }) => (isActive ? classes.active : "")} to="productsShorts">Shorts</NavLink >
      </div>
      {/* <Outlet /> */}
    </>
  );
};

export default ProductNavigation;
