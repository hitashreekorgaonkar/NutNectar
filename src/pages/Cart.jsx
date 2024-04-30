import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import QuantityContext from "../context/QuantityContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import appwriteService from "../appwrite/config";

const Cart = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [cart, setCart] = useState([]);
  const { setTotalQuantity } = useContext(QuantityContext);
  const [cartTotal, setCartTotal] = useState();
  const navigate = useNavigate();
  const [userId, setUserId] = useState("662ca90c0031f644baa3");

  useEffect(() => {
    getCart();
  }, []);

  const getCart = () => {
    try {
      setLoading(true);
      setError(false);
      appwriteService.getCart(userId).then((items) => {
        // console.log("items", items.documents);
        setCart(items.documents);
        let totalPrice = items.documents.reduce((total, item) => {
          return total + item.quantity * item.product.price;
        }, 0);
        setCartTotal(totalPrice);
        // console.log(totalPrice);
        setLoading(false);
      });
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
        return;
      }
      setError(true);
      setLoading(false);
    }
  };

  const checkOut = (cart, cartTotal) => {
    navigate(`/checkout`, { state: { cart, cartTotal } });
  };

  const addToCart = (totalItems, documentId) => {
    (async () => {
      try {
        setLoading(true);
        setError(false);
        await appwriteService.updateToCart(documentId, {
          quantity: totalItems,
        });
        getCart();
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
  };

  const deleteItem = (documentId) => {
    (async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await appwriteService.delete(documentId);
        if (response.message == "") getCart();
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
  };

  const clearCart = () => {
    (async () => {
      try {
        setLoading(true);
        setError(false);
        for (const document of cart) {
          const response = await appwriteService.deleteAll(document.$id);
          if (response.message == "") {
            getCart();
            localStorage.setItem("tq", 0);
            setTotalQuantity(0);
          }
          setLoading(false);
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
          return;
        }
        setError(true);
        setLoading(false);
      }
    })();
  };

  if (cart.length) {
    let tq = 0;
    cart.filter((x) => (tq += x.quantity));
    localStorage.setItem("tq", tq);
    var totqnty = localStorage.getItem("tq");
    setTotalQuantity(totqnty);
  }

  return (
    <>
      {error && <h1 className="text-center mt-5">1Something went wrong</h1>}

      <div className="md:container md:mx-auto md:px-16 lg:px-36">
        <p className="text-center text-4xl text-red-500 py-2">Your Cart</p>
        <div className="grid grid-cols-9 border-t-2 py-2 px-5">
          <div className="col-span-6 text-center">Product</div>
          <div className="text-center">Quantity</div>
          <div className="col-span-2 text-center">Total</div>
        </div>
        {cart.map((item) => (
          // <Link to={`/product/${item.product.$id}`}>
          <div className="grid grid-cols-9 border-t-2" key={item.product.$id}>
            <div className="col-span-1">
              <img
                className=" my-2 border"
                src={item.product.mainImage.url}
                alt=""
                srcSet=""
              />
            </div>
            <div className="col-span-5 content-center ps-4">
              {" "}
              {item.product.name}
            </div>
            <div className="justify-self-center content-center">
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <button
                  type="button"
                  onClick={() => addToCart(item.quantity - 1, item.$id)}
                  disabled={item.quantity == 1}
                  className="px-1 lg:px-2 xl:px-4 md:py-2 text-sm md:font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 disabled:bg-gray-100"
                >
                  -
                </button>
                <div className="px-1 lg:px-2 xl:px-4 md:py-2 text-sm md:font-medium text-gray-900 bg-white border-t border-b border-gray-200">
                  {item.quantity}
                </div>
                <button
                  type="button"
                  onClick={() => addToCart(item.quantity + 1, item.$id)}
                  className="px-1 lg:px-2 xl:px-4 md:py-2 text-sm md:font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 disabled:bg-gray-100"
                  disabled={item.quantity >= item.product.stock}
                >
                  {/* item.product.stock, */}+
                </button>
              </div>
            </div>
            <div className="col-span-2 content-center">
              <svg
                onClick={() => deleteItem(item.$id)}
                className="w-6 h-6 text-red-500 hover:text-black float-right"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
              <p className="text-center">
                {" "}
                Rs. {item.quantity * item.product.price}
              </p>
            </div>
          </div>
          // </Link>
        ))}
        {cart.length != 0 && (
          <div className="flex justify-center items-center">
            <div
              onClick={() => clearCart()}
              className="px-4 sm:px-6 py-2 shadow bg-gray-200 text-black hover:bg-black hover:text-gray-200 rounded-full cursor-pointer"
            >
              CLEAR All
            </div>
          </div>
        )}

        {cart.length != 0 && (
          <div className="grid grid-cols-3 my-8 ">
            <div className="col-span-2">
              {/* <p className="text-xl">Additional Comments</p>
            <textarea
              placeholder="Add a note to your order"
              className="resize border border-gray-200 rounded-md w-full px-3 py-2 mt-3  focus:border-gray-400 focus:outline-0
              placeholder:text-sm"
            ></textarea> */}
            </div>
            <div className="col-span-1 md:col-span-1 px-2">
              <div className="flex justify-between">
                <p className="text-xl font-semibold text-left">Total</p>
                <p className="text-xl font-semibold text-right">
                  ₹ {cartTotal}
                </p>
              </div>{" "}
              <p className="text-sm text-gray-400 text-right my-3  focus-visible:border-none">
                Tax included and shipping calculated at checkout
              </p>
              <div className="flex justify-center items-center">
                {/* <Link to={`/checkout`}> */}
                <div
                  onClick={() => checkOut(cart, cartTotal)}
                  className="px-20 sm:px-48 py-4 shadow bg-indigo-600 text-white hover:bg-indigo-700 hover:text-white rounded-full cursor-pointer text-xl"
                >
                  CHECKOUT
                </div>
                {/* </Link> */}
              </div>
            </div>
          </div>
        )}
      </div>

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
    </>
  );
};

export default Cart;
