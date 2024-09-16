import React from "react";
import classes from "./DropDown.module.css";

const DropDown = ({ onSort }) => {
  const handleSortChange = (event) => {
    const value = event.target.value;
    onSort(value);
  };

  return (
    <div className={classes.dropDown}>
      <select onChange={handleSortChange} className={classes.select}>
        <option value="default">Sort by Price</option>
        <option value="lowToHigh">Low to High</option>
        <option value="highToLow">High to Low</option>
      </select>
    </div>
  );
};

export default DropDown;
