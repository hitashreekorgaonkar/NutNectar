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
          {address?.addressLine1}
        </p>
        <p className="text-sm text-slate-500 hover:text-slate-600">
          {address?.addressLine2} {address?.city} {address?.state}
        </p>
      </div>
      {/* </div> */}
    </>
  );
};

export default AddressList;
