import React, { useEffect, useState } from "react";
import classes from "../pagesStyles/UpdateCurrentJerseys.module.css";
import { FaRegTrashAlt } from "react-icons/fa";

const EditUsers = () => {
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    age: "",
    email: "",
    // password: ""
  });

  const getUsers = async () => {
    const response = await fetch("http://localhost:5050/users",{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    if (!response.ok) {
      return;
    }
    const responseData = await response.json();
    setUsers(responseData.data);
  };
  useEffect(() => {
    getUsers();
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
    const response = await fetch(`http://localhost:5050/users/${formData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(formData),
    });
    const responseData = await response.json();
    if (response.ok) {
      getUsers();
      setFormData({
        username: "",
        age: "",
        email: "",
        // password: ""
      });
      setMessage(responseData.message);
    }
    else{
      setMessage(responseData.message);
    }
  };
  const deleteUser = async (id) => {
    const response = await fetch(`http://localhost:5050/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    const responseData = await response.json();
    if (response.ok) {
      getUsers();
      setMessage(responseData.message);
    }else{
      setMessage(responseData.message);
    }
  };
  const updateInput = (user) => {
    setFormData({
      id: user._id,
      username: user.username,
      age: user.age,
      email: user.email,
      // password: user.password
    });
  };

  return (
    <>
      <h1>Edit users</h1>
      <h3>{message}</h3>
      <h3>number of users : {users.length}</h3>
      <div className={classes.container}>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="username">username:</label>
          <input
            type="text"
            value={formData.username}
            id="username"
            name="username"
            onChange={changeFormData}
          />
          <label htmlFor="age">age:</label>
          <input
            type="text"
            value={formData.age}
            id="age"
            name="age"
            onChange={changeFormData}
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            value={formData.email}
            id="email"
            name="email"
            onChange={changeFormData}
          />
          {/* <label htmlFor="password">Password:</label>
          <input
            type="password"
            value={formData.password}
            id="password"
            name="password"
            onChange={changeFormData}
          /> */}

          <button type="submit">Edit</button>
        </form>
        <ul className={classes.list}>
          {users &&
            users.map((user) => (
              <li
                className={classes.box}
                key={user._id}
                onClick={() => updateInput(user)}
              >
                <button onClick={() => deleteUser(user._id)}>
                  <FaRegTrashAlt />
                </button>
                <p>id:{user._id}</p>
                <p>username: {user.username}</p>
                <p>age: {user.age}</p>
                <p>email: {user.email}</p>
                {/* <p>password: {user.password}</p> */}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default EditUsers;
