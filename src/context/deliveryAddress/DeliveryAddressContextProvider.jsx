import React from "react";
import DeliveryAddressContext from "./DeliveryAddressContext";

const DeliveryAddressContextProvider = ({ children }) => {
  const [deliveryAddr, setDeliveryAddr] = React.useState();
  return (
    <DeliveryAddressContext.Provider value={{ deliveryAddr, setDeliveryAddr }}>
      {children}
    </DeliveryAddressContext.Provider>
  );
};

export default DeliveryAddressContextProvider;
