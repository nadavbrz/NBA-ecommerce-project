import React from 'react';
import {
  Form,
  Link,
  useActionData,
  useSearchParams,
  useNavigation,
} from "react-router-dom";
import classes from "./AuthForm.module.css";
import { useEffect } from "react";

function AuthForm() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const data = useActionData();
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const isSubmitting = useNavigation().state === "submitting";

  return (
    <Form method="POST" className={classes.form}>
      <h1>{isLogin ? "Log In" : "Sign Up"}</h1>
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      {data && data.message && <p>{data.message}</p>}
      <p>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required placeholder="your@email.com"/>
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required placeholder="your password"/>
      </p>
      {!isLogin && (
        <>
          <p>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" required placeholder="your username..." />
          </p>
          <p>
            <label htmlFor="age">Age</label>
            <input type="number" id="age" name="age" min="0" required placeholder="your age"/>
          </p>
        </>
      )}
      <div className={classes.actions}>
        <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
          {isLogin ? "Sign Up" : "Login"}
        </Link>
        <button className={classes.statusBtn} type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : isLogin ? "Log In" : "Sign Up"}
        </button>
      </div>
    </Form>
  );
}

export default AuthForm;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";
  if (mode !== "login" && mode !== "signup") {
    return { isError: true, message: "Could not determine mode" };
  }

  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
    ...(mode === "signup" && {
      username: data.get("username"),
      age: parseInt(data.get("age"), 10),
    }),
  };

  const response = await fetch(`http://localhost:5050/users/${mode}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    return { isError: true, message: "Could not create user" };
  }

  const resData = await response.json();
  const token = resData.token;
  const role = resData.role;

  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem("expiration", expiration.toISOString());
  window.location.href = "/";
  return null;
}
