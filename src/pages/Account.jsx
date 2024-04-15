import React, { useContext, useState, useEffect } from "react";
import LoggedInUserContext from "../context/loggedInUser/LoggedInUserContext";
import axios from "axios";
import shoppingbag from "../assets/bag.png";
import Ashoppingbag from "../assets/bagA.png";
import user from "../assets/user.png";
import Auser from "../assets/userA.png";
import location from "../assets/location.png";
import Alocation from "../assets/locationA.png";
import { useNavigate } from "react-router-dom";
import { Address } from "../components";

const Account = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [orderActive, setOrderActive] = useState(true);
  const [addrActive, setAddrActive] = useState(false);
  const [profileActive, setProfileActive] = useState(false);
  const [addressList, setAddressList] = useState([]);
  const { setLoggedUser } = useContext(LoggedInUserContext);
  const navigate = useNavigate();

  const setAddrTab = () => {
    setOrderActive(false);
    setAddrActive(true);
    setProfileActive(false);

    (async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await axios.get(
          "/api/v1/ecommerce/addresses?page=1&limit=10"
        );
        console.log("response.data.data", response.data.data.addresses);
        setAddressList(response.data.data.addresses);
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

  const setOrderTab = () => {
    setOrderActive(true);
    setAddrActive(false);
    setProfileActive(false);
  };

  const setProfileTab = () => {
    setOrderActive(false);
    setAddrActive(false);
    setProfileActive(true);
  };

  const deleteItem = () => {};

  const addrDialog = () => {};
  const logout = () => {
    (async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await axios.post("/api/v1/users/logout");
        if (response.data.statusCode === 200) {
          localStorage.removeItem("auth");
          setLoggedUser(false);
          navigate("/");
        }

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

  return (
    <div>
      <div className="lg:mx-52 border rounded-lg my-4">
        <div className="grid grid-rows-3 grid-cols-3">
          <div className="row-span-3 px-5 py-1 bg-blue-200 rounded-l-lg">
            <p className="text-xl font-semibold border-b py-2 border-gray-500">
              My Account
            </p>
            <p
              onClick={() => setOrderTab()}
              className={`${
                orderActive ? "bg-white text-blue-800" : ""
              } flex p-3 my-2 rounded-lg font-semibold cursor-pointer`}
            >
              {" "}
              <img
                className="relative mx-2"
                width={24}
                src={shoppingbag}
                alt=""
              />
              Orders
            </p>
            <p
              onClick={() => setAddrTab()}
              className={`${
                addrActive ? "bg-white text-blue-800" : ""
              } flex p-3 my-2 rounded-lg font-semibold cursor-pointer`}
            >
              {" "}
              <img className="relative mx-2" width={24} src={location} alt="" />
              Addresses
            </p>
            <p
              onClick={() => setProfileTab()}
              className={`${
                profileActive ? "bg-white text-blue-800" : ""
              } flex p-3 my-2 rounded-lg font-semibold cursor-pointer`}
            >
              {" "}
              <img className="relative mx-2" width={23} src={user} alt="" />
              Profile
            </p>
            <p
              onClick={() => logout()}
              className="text-lg text-center font-semibold border-t py-2 border-gray-500 cursor-pointer"
            >
              Log Out
            </p>
          </div>
          <div className="col-span-2 py-5">
            {addrActive && (
              <>
                <div className="flex justify-between pb-3 px-20">
                  <p className="text-lg font-semibold">All Saved Addresses</p>
                  <div
                    onClick={addrDialog}
                    className="px-1 sm:px-2 py-2 bg-red-500 text-white rounded font-bold cursor-pointer"
                  >
                    Add New Address
                  </div>
                </div>
                <p className="border-b mx-5"></p>
                {addressList.map((address) => (
                  <div className="flex justify-between px-9 py-4">
                    <div className="flex">
                      <div>
                        <img
                          className="pt-1"
                          width={32}
                          src={Alocation}
                          alt=""
                        />
                      </div>
                      <div className="px-3">
                        <p className="text-sm text-slate-500 hover:text-slate-600">
                          {address.addressLine1} {address.addressLine2} <br />{" "}
                          {address.city} {address.state}
                        </p>
                      </div>
                    </div>
                    <div className="flex">
                      <svg
                        className="w-6 h-6 text-slate-500 hover:text-slate-700 cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                        />
                      </svg>

                      <svg
                        onClick={() => deleteItem()}
                        className="w-6 h-6 text-slate-500 hover:text-slate-700 cursor-pointer ms-5"
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
                    </div>
                  </div>
                ))}
                <p className="border-b mx-10"></p>
              </>
            )}
          </div>
          {/* <div className="row-span-2 col-span-2">03</div> */}
        </div>
      </div>
    </div>
  );
};

export default Account;
