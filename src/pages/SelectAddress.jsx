import React, { useState, useContext, useEffect } from "react";
import { AddressList } from "../components/index";
import axios from "axios";

const SelectAddress = ({ addressId, changeAddrDialog, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [addressList, setAddressList] = useState([]);

  useEffect(() => {
    setAddressMenu();
    setSelectedAddress(addressId);
  }, []);

  const setAddressMenu = () => {
    (async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await axios.get(
          "/api/v1/ecommerce/addresses?page=1&limit=10"
        );
        setAddressList(response.data.data.addresses);
        // console.log("addressList", addressList);
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

  const handleRadioChange = (id) => {
    setSelectedAddress(id);
    onClose(id);
  };

  return (
    <>
      {changeAddrDialog && (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
              <div className="relative transform rounded-lg backdrop-opacity-10 backdrop-invert bg-white/30 p-5 text-left shadow-xl transition-all sm:w-full sm:max-w-2xl ">
                <div className="bg-white rounded-lg">
                  <div className="absolute -right-3 -top-3">
                    <button
                      onClick={() => {
                        onClose();
                      }}
                      type="button"
                      className="rounded-full bg-white px-1 py-1 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>{" "}
                  <div
                    className={`mx-auto w-full max-w-2xl bg-gy-100 rounded-xl px-10 py-5 border border-black/10`}
                  >
                    <div className="flex justify-center">
                      <span className="inline-block w-full max-w-[100px]">
                        {/* <Logo width="100%" /> */}
                      </span>
                    </div>
                    <h2 className="font-sans text-blue-500 text-lg font-bold leading-tight mb-8">
                      Select Delivery Address
                    </h2>
                    {error && (
                      <p className="text-red-600 mt-8 text-center">
                        {/* {loginError} */}
                      </p>
                    )}
                    {addressList.map((address) => (
                      <div
                        className="grid grid-cols-12 justify-between px-9 py-4"
                        key={address?._id}
                      >
                        <div className="col-2">
                          {" "}
                          <input
                            type="radio"
                            id={address._id}
                            value={address._id}
                            checked={selectedAddress === address._id}
                            onChange={() => handleRadioChange(address._id)}
                          />
                        </div>
                        <AddressList address={address} />
                      </div>
                    ))}
                    {/* <div
                      className="grid grid-cols-12 justify-between px-9 py-4"
                      key={address?._id}
                    >
                      <AddressList address={address} />
                    </div>{" "} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SelectAddress;
