import React from "react";
import Alocation from "../assets/locationA.png";

const AddressList = ({ address }) => {
  return (
    <>
      {/* <div key={address?._id}> */}
      <div className="col-1">
        <img className="pt-1" width={32} src={Alocation} alt="" />
      </div>
      <div className="px-3 col-span-9">
        <p className="text-sm text-slate-500 hover:text-slate-600">
          {address?.houseFloor} {address?.building} {address?.landmark}
        </p>
        <p className="text-sm text-slate-500 hover:text-slate-600">
          {address?.city} {address?.pincode} {address?.state}
        </p>
      </div>
      {/* </div> */}
    </>
  );
};

export default AddressList;
