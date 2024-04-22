import React from "react";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import { Outlet } from "react-router-dom";
import "../src/App.css";
import QuantityContextProvider from "./context/QuantityContextProvider";
import LoggedInUserContextProvider from "./context/loggedInUser/LoggedInUserContextProvider";

const Layout = () => {
  return (
    <>
      <LoggedInUserContextProvider>
        <QuantityContextProvider>
          <Header />
          <Outlet />
          <Footer />
        </QuantityContextProvider>
      </LoggedInUserContextProvider>
    </>
  );
};

export default Layout;
