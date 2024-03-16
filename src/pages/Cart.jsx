import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import QuantityContext from "../context/QuantityContext";

const Cart = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [cart, setCart] = useState([]);
  const { setTotalQuantity } = useContext(QuantityContext);

  useEffect(() => {
    const controller = new AbortController();
    // ;(async () => {  here ; is effie
    (async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await axios.get("/api/v1/ecommerce/cart");
        // console.log("response", response.data.data.items);
        setCart(response.data.data.items);

        setLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
          return;
        }
        setError(true);
        setLoading(false);
      }
    })();
  }, []);

  if (cart.length) {
    let tq = 0;
    cart.filter((x) => (tq += x.quantity));
    setTotalQuantity(tq);
  }
  // let cartList = [...cart];
  // let tq = 0;
  // cartList.filter((x) => (tq += x.quantity));
  // console.log("tq", tq);
  // setTotalQuantity(tq);
  return (
    <>
      {loading && (
        <div className="my-5 text-center">
          <button
            type="button"
            className="bg-indigo-500 outline-none px-5 py-1 rounded text-white shadow-lg hover:bg-indigo-700 inline-flex"
            disabled
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="animate-spin direction-normal h-5 w-5 mr-3"
            >
              <path d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z" />
            </svg>
            Loading...
          </button>
        </div>
      )}
      {error && <h1 className="text-center mt-5">1Something went wrong</h1>}

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 px-5">
        {cart.map((item) => (
          <div className="" key={item.product._id}>
            {item.product.name}
          </div>
        ))}
      </div>
    </>
  );
};

export default Cart;
