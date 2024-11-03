import React, { useEffect, useState } from "react";
import classes from "../pagesStyles/UpdateCurrentJerseys.module.css";

const UpdateShorts = () => {
  const token = localStorage.getItem("token");
  const [shorts, setShorts] = useState([]);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    team: "",
    description: "",
    imgSrc: "",
    price: "",
  });
  const getShorts = async () => {
    const response = await fetch("https://server.brzcode.site/shorts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      return;
    }
    const responseData = await response.json();
    setShorts(responseData.data);
  };
  useEffect(() => {
    getShorts();
  }, []);

  const changeFormData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://server.brzcode.site/shorts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();

      if (response.ok) {
        getShorts();
        setFormData({
          productName:"",
          team: "",
          year: "",
          description: "",
          imgSrc: "",
          price: "",
        });

        setMessage(responseData.message);
      } else {
        setMessage(responseData.message);
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <>
      <h1>Update shorts </h1>
      <h3>{message}</h3>
      <h3>number of shorts : {shorts.length}</h3>
      <div className={classes.container}>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            value={formData.productName}
            id="productName"
            name="productName"
            onChange={changeFormData}
          />
          <label htmlFor="team">team:</label>
          <input
            type="text"
            value={formData.team}
            id="team"
            name="team"
            onChange={changeFormData}
          />

          <label htmlFor="description">description</label>
          <input
            type="text"
            value={formData.description}
            id="description"
            name="description"
            onChange={changeFormData}
          />

          <label htmlFor="imgSrc">imgSrc:</label>
          <input
            type="text"
            value={formData.imgSrc}
            id="imgSrc"
            name="imgSrc"
            onChange={changeFormData}
          />

          <label htmlFor="price">price</label>
          <input
            type="text"
            value={formData.price}
            id="price"
            name="price"
            onChange={changeFormData}
          />
          <button type="submit">create</button>
        </form>
        <ul className={classes.list}>
          {shorts &&
            shorts.map((short) => (
              <li className={classes.box} key={short._id}>
                <p>id: {short._id}</p>
                <p>Product Name: {short.productName}</p>
                <p>team: {short.team}</p>
                <p>description: {short.description}</p>
                <p>imgSrc: {short.imgSrc}</p>
                <p>price: {short.price}</p>
                <img className={classes.smallImg} src={short.imgSrc} alt={short.player}  />
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default UpdateShorts;
