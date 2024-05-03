import React from "react";

const OrdersList = ({ order }) => {
  const getStatusBgColor = (status) => {
    switch (status) {
      case "Shipped":
        return "bg-blue-500";
      case "Processing":
        return "bg-gray-500";
      case "Delivered":
        return "bg-green-500";
      default:
        return "bg-orange-500";
    }
  };
  return (
    <>
      <div className="grid">
        <div className="px-5 shadow-md m-2 my-2">
          <div className="flex justify-between">
            <p className="text-lg text-slate-900 ">
              {order?.productsName.join(", ")}
            </p>
            <p className="text-lg text-slate-800 ">₹{order?.cartTotal}</p>
          </div>
          <div className="flex justify-between py-2">
            <p className="text-sm text-slate-600 pt-2">Order #{order?.$id}</p>
            <p
              className={`text-sm rounded-md p-1 my-2 text-white ${getStatusBgColor(
                order.orderStatus
              )}`}
            >
              {order?.orderStatus}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrdersList;
