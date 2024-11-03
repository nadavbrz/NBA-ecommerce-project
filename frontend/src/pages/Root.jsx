import React from "react";
import MainNavigation from "../components/MainNavigation";
import { Outlet } from "react-router-dom";
<<<<<<< HEAD
// import Footer from "../components/Footer"; 
=======
import Footer from "../components/Footer";
>>>>>>> 7cb3df84cf967e5f032ed89043610627afc4892b
import AdminNavigation from "../components/AdminNavigation";

const Root = () => {
  return (
    <>
        <MainNavigation />
        <AdminNavigation />
        <main>
          <Outlet />
        </main>
        {/* <Footer /> */}
    </>
  );
};

export default Root;
