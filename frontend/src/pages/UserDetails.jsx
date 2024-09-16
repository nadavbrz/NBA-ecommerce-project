import React, { useEffect, useState } from "react";
import { fetchUser } from "../utils/fetchUsers";
import classes from "../pages/pagesStyles/UserDetails.module.css";
import OrderDetails from "./OrderDetails";

function UserDetails() {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const getUserDetails = async () => {
      const user = await fetchUser();
      setUserDetails(user);
    };

    getUserDetails();
  }, []);

  if (!userDetails) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className={classes.userDetailsContainer}>
        <h2>{userDetails.username}'s Details</h2>
        <p><b>Username:</b> {userDetails.username}</p>
        <p><b>Email:</b> {userDetails.email}</p>
        <p><b>Age:</b> {userDetails.age}</p>
        <p><b>Account Created At: </b>
           {new Date(userDetails.createdAt).toLocaleString()}
        </p>
      </div>
      <OrderDetails />
    </>
  );
}

export default UserDetails;
