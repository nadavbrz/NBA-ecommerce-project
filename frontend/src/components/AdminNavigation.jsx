import React from "react";
import { Link } from "react-router-dom";
import classes from "./AdminNavigation.module.css";

const AdminNavigation = () => {
  const role = localStorage.getItem("role");
  if (role !== "admin") {
    return null;
  } else {
    return (
      <>
        <nav className={classes.nav}>
          <ul className={classes.list}>
            <li>
              <Link to="/updateCurrentJerseys">Update Current Jerseys</Link>
            </li>
            <li>
              <Link to="/editCurrentJerseys">Edit Current Jerseys</Link>
            </li>
            <li>
              <Link to="/updateClassicJerseys">Update Classic Jerseys</Link>
            </li>
            <li>
              <Link to="/editClassicJerseys">Edit Classic Jerseys</Link>
            </li>
            <li>
              <Link to="/updateShorts">Update Shorts</Link>
            </li>
            <li>
              <Link to="/editShorts">Edit Shorts</Link>
            </li>
            <li>
              <Link to="/updateUsers">Update Users</Link>
            </li>
            <li>
              <Link to="/editUsers">Edit Users</Link>
            </li>
          </ul>
        </nav>
      </>
    );
  }
};

export default AdminNavigation;
