import React, { useState, useEffect } from "react";
import classes from "../pagesStyles/UpdateCurrentJerseys.module.css";

const UpdateUsers = () => {
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    age: "",
    email: "",
    password: "",
  });

  const getUsers = async () => {
    try {
      const response = await fetch("http://localhost:5050/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const responseData = await response.json();
      setUsers(responseData.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5050/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
          password: "",
        });
        setMessage(responseData.message);
      } else {
        console.error("Failed to create user:", responseData.message);
        setMessage(responseData.message);
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const updateInput = (user) => {
    setFormData({
      username: user.username || "",
      age: user.age || "",
      email: user.email || "",
      password: user.password || "",
    });
  };

  return (
    <>
      <h1>Create an Account</h1>
      <h3>{message}</h3>
      <h3>Number of users: {users.length}</h3>
      <div className={classes.container}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <br />
          <button type="submit">Create Account</button>
        </form>
        <ul className={classes.list}>
          {users &&
            users.map((user) => (
              <li
                className={classes.box}
                key={user._id}
                onClick={() => updateInput(user)}
              >
                <p>Username: {user.username}</p>
                <p>Age: {user.age}</p>
                <p>Email: {user.email}</p>
                <p>Password: {user.password}</p>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default UpdateUsers;
