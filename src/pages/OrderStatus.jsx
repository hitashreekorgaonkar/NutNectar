import React from "react";
import checked from "../assets/checked.png";
import { Link } from "react-router-dom";

const OrderStatus = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card text-center p-4 w-96 shadow justify-center items-center">
        <img
          src={checked}
          width="80"
          className="pt-4 pb-5 mx-auto"
          alt=""
          srcset=""
        />
        <h4 className="">Payment Success!</h4>
        <p className="text-secondary">
          It is our pleasure to offer you our products.
        </p>

        <Link to="/">
          <button
            type="submit"
            className="rounded-full h-12 w-36 bg-white hover:bg-slate-50 mt-4 px-3 py-2 text-md font-semibold text-emerald-600 shadow-sm border-emerald-600 hover:border-emerald-700 hover:text-emerald-700 border-2"
          >
            Done
          </button>
        </Link>
      </div>
    </div>
  );
};

export default OrderStatus;
