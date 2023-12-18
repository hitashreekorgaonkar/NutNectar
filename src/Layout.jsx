import React from "react";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import { Outlet } from "react-router-dom";
import "../src/App.css";
const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
