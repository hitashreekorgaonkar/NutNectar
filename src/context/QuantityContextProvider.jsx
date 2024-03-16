import React from "react";
import QuantityContext from "./QuantityContext";

const QuantityContextProvider = ({ children }) => {
  const [totalQuantity, setTotalQuantity] = React.useState(null);
  return (
    <QuantityContext.Provider value={{ totalQuantity, setTotalQuantity }}>
      {children}
    </QuantityContext.Provider>
  );
};

export default QuantityContextProvider;
