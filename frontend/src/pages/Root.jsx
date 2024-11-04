import React from "react";
import MainNavigation from "../components/MainNavigation";
import { Outlet } from "react-router-dom";
// import Footer from "../components/Footer"; 
import AdminNavigation from "../components/AdminNavigation";

const Root = () => {
  return (
    <>
        <MainNavigation />
        <AdminNavigation />
        <main>
          <Outlet />
        </main>
        <Footer />
    </>
  );
};

export default Root;
