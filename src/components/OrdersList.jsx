import React from "react";

const OrdersList = (orders) => {
  return (
    <>
      <div className="grid">
        <div className="col-12">
          <p className="text-sm text-slate-500 hover:text-slate-600">
            {orders?.orderPrice}
          </p>
          <p className="text-sm text-slate-500 hover:text-slate-600">
            {/* {orders?.addressLine2} {orders?.city} {orders?.state} */}
          </p>
        </div>
      </div>
    </>
  );
};

export default OrdersList;
