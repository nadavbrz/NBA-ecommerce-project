import React, { useEffect, useState } from "react";
import classes from "../pagesStyles/UpdateCurrentJerseys.module.css";

const UpdateCurrentJerseys = () => {
  const token = localStorage.getItem("token");
  const [message, setMessage] = useState("");
  const [jerseys, setJerseys] = useState([]);
  const [formData, setFormData] = useState({
    productName : "",
    player: "",
    number: "",
    team: "",
    description: "",
    imgSrc: "",
    price: "",
  });
  const getJerseys = async () => {
    const response = await fetch("https://server.brzcode.site/jerseys");
    if (!response.ok) {
      return;
    }
    const responseData = await response.json();
    setJerseys(responseData.data);
  };
  useEffect(() => {
    getJerseys();
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
    const response = await fetch("https://server.brzcode.site/jerseys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });
    const responseData = await response.json();
    if (response.ok) {
      getJerseys();
      setFormData({
        productName : "",
        player: "",
        number: "",
        team: "",
        description: "",
        imgSrc: "",
        price: "",
      });
      setMessage(responseData.message);
    }else{
      setMessage(responseData.message);
    }
  };


  return (
    <>
      <h1>Update Current Jerseys</h1>
      <h3>{message}</h3>
      <h3>number of jerseys : {jerseys.length}</h3>
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
          <label htmlFor="player">player:</label>
          <input
            type="text"
            value={formData.player}
            id="player"
            name="player"
            onChange={changeFormData}
          />

          <label htmlFor="number">number:</label>
          <input
            type="number"
            value={formData.number}
            id="number"
            name="number"
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
            type="number"
            value={formData.price}
            id="price"
            name="price"
            onChange={changeFormData}
          />
          <button type="submit">create</button>
        </form>
        <ul className={classes.list}>
          {jerseys &&
            jerseys.map((jersey) => (
              <li className={classes.box} key={jersey._id}>
                <p>id: {jersey._id}</p>
                <p>Product Name: {jersey.productName}</p>
                <p>player: {jersey.player}</p>
                <p>number: {jersey.number}</p>
                <p>team: {jersey.team}</p>
                <p>description: {jersey.description}</p>
                <p>imgSrc: {jersey.imgSrc}</p>
                <p>price: {jersey.price}</p>
                <img className={classes.smallImg} src={jersey.imgSrc} alt={jersey.player}  />
              </li>
              
            ))}
        </ul>
      </div>
    </>
  );
};

export default UpdateCurrentJerseys;
