import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    // [true && false !== true]  => [true && true] => true
    if (authentication && authStatus !== authentication) {
      navigate("/");
    }
    // [false && true !== true] => [false && false] => true
    else if (!authentication && authStatus !== authentication) {
      navigate("/store");
    }
    setLoader(false);
  }, [authStatus, navigate, authentication]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
}
