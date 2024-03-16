import React from "react";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import { Outlet } from "react-router-dom";
import "../src/App.css";
import QuantityContextProvider from "./context/QuantityContextProvider";
const Layout = () => {
  return (
    <>
      <QuantityContextProvider>
        <Header />
        <Outlet />
        <Footer />
      </QuantityContextProvider>
    </>
  );
};

export default Layout;
