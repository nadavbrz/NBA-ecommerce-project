import React, { useEffect, useState } from "react";
import classes from "../pagesStyles/UpdateCurrentJerseys.module.css";
import { FaRegTrashAlt } from "react-icons/fa";

const EditShorts = () => {
  const token = localStorage.getItem("token");
  const [message, setMessage] = useState("");
  const [shorts, setShorts] = useState([]);
  const [formData, setFormData] = useState({
    productName: "",
    team: "",
    description: "",
    imgSrc: "",
    price: "",
  });

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

  const changeFormData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:5050/shorts/${formData.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      }
    );
    const responseData = await response.json();
    if (response.ok) {
      getShorts();
      setFormData({
        productName: "",
        team: "",
        description: "",
        imgSrc: "",
        price: "",
      });
      setMessage(responseData.message);
    }
    else{
      setMessage(responseData.message);
    }
  };
  const deleteUser = async (id) => {
    const response = await fetch(`http://localhost:5050/shorts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    const responseData = await response.json();
    if (response.ok) {
      getShorts();
      setMessage(responseData.message);
    }else{
      setMessage(responseData.message);
    }
  };
  const updateInput = (short) => {
    setFormData({
      id: short._id,
      productName: short.productName,
      team: short.team,
      description: short.description,
      imgSrc: short.imgSrc,
      price: short.price,
    });
  };

  return (
    <>
      <h1>Edit shorts</h1>
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
          <label htmlFor="description">description:</label>
          <input
            type="text"
            value={formData.description}
            id="description"
            name="description"
            onChange={changeFormData}
          />
          <label htmlFor="imgSrc">imgSrc:</label>
          <input
            type="imgSrc"
            value={formData.imgSrc}
            id="imgSrc"
            name="imgSrc"
            onChange={changeFormData}
          />
          <label htmlFor="price">price:</label>
          <input
            type="price"
            value={formData.price}
            id="price"
            name="price"
            onChange={changeFormData}
          />

          <button type="submit">Edit</button>
        </form>
        <ul className={classes.list}>
          {shorts &&
            shorts.map((short) => (
              <li
                className={classes.box}
                key={short._id}
                onClick={() => updateInput(short)}
              >
                <button onClick={() => deleteUser(short._id)}>
                  <FaRegTrashAlt />
                </button>
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

export default EditShorts;
