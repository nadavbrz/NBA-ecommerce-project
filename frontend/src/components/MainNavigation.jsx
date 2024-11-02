import React from 'react';
import { Form, NavLink, useRouteLoaderData } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { FaCartShopping } from "react-icons/fa6";
import { RiAccountCircleFill } from "react-icons/ri";
import { ImExit } from "react-icons/im";
import CartLogo from "./CartLogo";


const MainNavigation = () => {
  const token = useRouteLoaderData("root");
  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <ul className={classes.list}>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? classes.active : "")}
              to=""
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? classes.active : "")}
              to="about"
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? classes.active : "")}
              to="contact"
            >
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? classes.active : "")}
              to="products"
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? classes.active : "")}
              to="cart"
            >
              <CartLogo className={classes.icon} />
            </NavLink>
          </li>
          {!token && (
            <li>
              <NavLink
                to="auth?mode=login"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                <RiAccountCircleFill className={classes.icon} />
                <br />
                <span className={classes.login}>Login</span>
              </NavLink>
            </li>
          )}
          {token && (
            <li>
              <Form
                className={classes.formLogOut}
                action="/logout"
                method="post"
              >
                <button className={classes.logoutButton}>
                  <div className={classes.logOutBox}>
                    <ImExit className={classes.LogoutIcon} />
                    Logout
                  </div>
                </button>
              </Form>
            </li>
          )}
          {token && (
            <li>
              <NavLink
                to={"userDetails"}
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                My details
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
