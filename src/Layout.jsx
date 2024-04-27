import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import "../src/App.css";
import {
  authService,
  Header,
  Footer,
  QuantityContextProvider,
  LoggedInUserContextProvider,
} from "./components/index";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";

const Layout = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <>
      <LoggedInUserContextProvider>
        <QuantityContextProvider>
          <Header />
          <main>
            <Outlet />
          </main>{" "}
          <Footer />
        </QuantityContextProvider>
      </LoggedInUserContextProvider>
    </>
  ) : null;
};

export default Layout;
