import React, { useState } from "react";
import Alocation from "../assets/locationA.png";
import axios from "axios";
import { AddressList } from "../components/index";
import { appwriteService } from "./index";

const AddressCard = ({ address, handleEdit, setAddrTab }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const deleteAddress = (addressid) => {
    (async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await appwriteService.deleteAddress(addressid);
        if (response) {
          setAddrTab();
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

  return (
    <>
      <div
        className="grid grid-cols-12 justify-between px-9 py-4"
        key={address?.$id}
      >
        <AddressList address={address} />
        <div className="col-1">
          <div className="flex">
            <svg
              onClick={() => handleEdit(address)}
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
              onClick={() => deleteAddress(address?.$id)}
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
      </div>
    </>
  );
};

export default AddressCard;
