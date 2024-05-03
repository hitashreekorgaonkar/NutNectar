import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import rucksack from "../assets/icons8-rucksack-60.png";
import img1 from "../assets/cart24.png";
import { useNavigate } from "react-router-dom";
import { AddressList } from "../components";
import SelectAddress from "./SelectAddress";
import appwriteService from "../appwrite/config";

const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [address, setAddress] = useState(null);
  const [addressid, setAddressID] = useState(null);
  const [cartID, setCartID] = useState([]);
  const [changeAddrDialog, setChangeAddrDialog] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [cart, cartList] = useState(state.cart);
  const [userId, setUserID] = useState(
    JSON.parse(localStorage.getItem("userID"))
  );

  useEffect(() => {
    // console.log("cart", cart);
    setAddressMenu();
    // const ids = cart.map((item) => item.$id);
    // console.log("ids", ids);
  }, []);

  const getAddress = (selAddr) => {
    (async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await appwriteService.getAddress(selAddr);
        if (response) {
          setAddress(response);
          setAddressID(response.$id);
          setLoading(false);
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
          return;
        }
        setError(true);
        setLoading(true);
      }
    })();
  };

  const setAddressMenu = () => {
    (async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await appwriteService.getAddresses(userId);
        if (response) {
          setAddress(response.documents[0]);
          setAddressID(response.documents[0].$id);
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

  const changeAdd = () => {
    setChangeAddrDialog(true);
  };

  const handleCloseDialog = (selectedAddress) => {
    getAddress(selectedAddress);
    setChangeAddrDialog(false);
  };

  const addOrder = () => {
    (async () => {
      try {
        setLoading(true);
        setError(false);
        const productInfo = cart.map((order) => {
          return {
            productId: order.productid,
            quantity: String(order.quantity),
          };
        });

        const cartsID = cart.map((item) => item?.$id);

        const response = await appwriteService.addOrder({
          userId: userId,
          cartTotal: state.cartTotal,
          addressId: addressid,
          cartsId: cartsID,
        });
        // console.log("response orders", response);
        updateCartStatus(cartsID);
        navigate("/order-status");
        // localStorage.setItem("tq", 0);
        setTotalQuantity(0);

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

  const updateCartStatus = (cartsID) => {
    (async () => {
      try {
        setLoading(true);
        setError(false);
        for (const id of cartsID) {
          const res = await appwriteService.updateCartOrderStatus(id);
          // if (response.message == "") {
          // setCart([]);
          // localStorage.setItem("tq", 0);
          setTotalQuantity(0);
          setLoading(false);
          // }
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

  return (
    <>
      <header className="sticky z-50 top-0">
        <nav className="w-full h-14 bgPeach flex justify-between sm:px-4 md:px-40 lg:px-56">
          <Link to="/cart">
            <div className="cursor-pointer mx-2 py-4">
              <img className="relative" width={24} src={img1} alt="" />
            </div>{" "}
          </Link>{" "}
          <Link to="/">
            <img width="60" className="mx-auto" src={rucksack} alt="" />
          </Link>{" "}
          <div></div>
        </nav>
      </header>
      <div className="px-4 lg:px-2 xl:px-11 2xl:px-48">
        <div className="grid grid-cols-11 my-8 border-gray-200">
          <div className="col-span-11 lg:col-span-7 xl:col-span-6 lg:border-r-2 md:px-40 lg:px-8">
            <p className="text-xl font-semibold pb-2">Delivery</p>
            {address ? (
              <div
                className="grid grid-cols-12 justify-between px-9 py-4"
                key={address?.$id}
              >
                <AddressList address={address} />
                <div className="col-1">
                  <div className="flex">
                    <div
                      onClick={changeAdd}
                      className="px-1 sm:px-2 py-2 bg-indigo-700 text-white rounded font-bold cursor-pointer"
                    >
                      Change
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            <div
              className="hidden lg:grid px-20 sm:px-48 py-4 shadow bg-indigo-600 text-white hover:bg-indigo-700 hover:text-white
               rounded-full cursor-pointer text-center text-xl lg:px-8 mt-5"
              onClick={() => addOrder()}
            >
              Cash On Delivery
            </div>
          </div>
          <div className="col-span-11 lg:col-span-4 xl:col-span-5 md:px-40 lg:px-8 md:mt-8">
            {state.cart.map((item) => (
              <div className="grid grid-cols-12" key={item?.product.$id}>
                <div className="col-span-2 relative ">
                  <img
                    className="my-2 border rounded-lg px-1.5"
                    // src={item.product.mainImage.url}
                    src={appwriteService.getFilePreview(
                      item?.product?.mainImage
                    )}
                    alt={item?.product?.name}
                    srcSet=""
                  />
                  <div className="absolute h-5 w-5 -right-2 -top-1 bg-gray-500 rounded-full text-center text-white text-sm">
                    {item?.quantity}
                  </div>
                </div>
                <div className="col-span-8 content-center ps-4">
                  {" "}
                  {item?.product.name}
                </div>
                <div className="col-span-2 content-center">
                  <p className="text-right">
                    {" "}
                    ₹{item?.quantity * item?.product?.price}
                  </p>
                </div>{" "}
              </div>
            ))}
            <div className="flex justify-between mt-3">
              <div>
                {" "}
                <p className="text-left">Sub Total</p>
              </div>
              <div>
                {" "}
                <p className="font-semibold text-right">₹{state?.cartTotal}</p>
              </div>
            </div>
            <div className="flex justify-between my-3">
              <div>
                {" "}
                <p className="text-left">Shipping</p>
              </div>
              <div>
                {" "}
                <p className="font-semibold text-right">₹200</p>
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                {" "}
                <p className="text-xl font-semibold text-left">Total</p>
                <p className="text-gray-400 text-right my-3  focus-visible:border-none">
                  including GST
                </p>
              </div>
              <div>
                {" "}
                <p className="text-2xl font-semibold text-right">
                  ₹{state?.cartTotal + 200}
                </p>
              </div>
            </div>
            <div
              className="lg:hidden  py-4 shadow bg-indigo-600 text-white hover:bg-indigo-700 hover:text-white
               rounded-full cursor-pointer text-center text-xl lg:px-8 mt-5"
              onClick={() => addOrder()}
            >
              Cash On Delivery
            </div>
          </div>
        </div>
      </div>
      {addressid ? (
        <SelectAddress
          userId={userId}
          addressId={addressid}
          onClose={handleCloseDialog}
          changeAddrDialog={changeAddrDialog}
        />
      ) : null}
    </>
  );
};

export default Checkout;
