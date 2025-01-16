import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
import Navbar from "../Pages/Shared/Navbar/Navbar";

const MainLayout = () => {
  const location = useLocation();
  const headerFooterRemove =
    location.pathname.includes("login") ||
    location.pathname.includes("register");
  return (
    <div className="container mx-auto">
      {headerFooterRemove || <Navbar></Navbar>}
      <Outlet></Outlet>
      {headerFooterRemove || <Footer></Footer>}
    </div>
  );
};

export default MainLayout;
