import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  var authValue = localStorage.getItem("authToken");

  useEffect(() => {
    if (!authValue) {
      navigate("/");
    }
    setLoader(false);
  }, [authValue, navigate, authentication]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
}
