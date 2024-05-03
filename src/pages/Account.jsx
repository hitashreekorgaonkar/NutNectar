import React, { useContext, useState, useEffect } from "react";
import LoggedInUserContext from "../context/loggedInUser/LoggedInUserContext";
import axios from "axios";
import user from "../assets/user.png";
import location from "../assets/location.png";
import { useNavigate } from "react-router-dom";
import {
  AddressCard,
  AddressForm,
  Profile,
  authService,
  logout as authLogout,
  QuantityContext,
  appwriteService,
  OrdersList,
} from "../components/index";
import { useDispatch } from "react-redux";

const Account = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [addrDialogOpen, setAddrDialogOpen] = useState(false);
  const [addrActive, setAddrActive] = useState(true);
  const [profileActive, setProfileActive] = useState(false);
  const [ordersActive, setOrdersActive] = useState(false);
  const [addressList, setAddressList] = useState([]);
  const [profile, setProfile] = useState({});
  const [orderList, setOrderList] = useState([]);
  const [address, setAddress] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const { setTotalQuantity } = useContext(QuantityContext);
  const [userId, setUserID] = useState(
    JSON.parse(localStorage.getItem("userID"))
  );
  const { setLoggedUser } = useContext(LoggedInUserContext);
  const navigate = useNavigate();

  const setAddrTab = () => {
    setAddrActive(true);
    setProfileActive(false);
    setOrdersActive(false);
    setProfileUser();
    setAddressMenu();
  };

  useEffect(() => {
    setProfileUser();
    setAddressMenu();
    setUserOrders();
  }, []);

  const setAddressMenu = () => {
    (async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await appwriteService.getAddresses(userId);
        setAddressList(response.documents);
        // console.log("address list", addressList);
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

  const setProfileUser = () => {
    (async () => {
      try {
        setLoading(true);
        setError(false);
        const userData = await authService.getCurrentUser();
        // console.log("1 userData", userData);
        setProfile(userData);
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

  const setUserOrders = () => {
    (async () => {
      try {
        setLoading(true);
        setError(false);
        // console.log("1 userId", userId);
        const response = await appwriteService.getOrders(userId);
        setOrderList(response.documents.reverse());
        // console.log("Orders loaded", response.documents);
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

  const setOrdersTab = () => {
    setAddrActive(false);
    setProfileActive(false);
    setOrdersActive(true);
    setUserOrders();
  };

  const setProfileTab = () => {
    setAddrActive(false);
    setOrdersActive(false);
    setProfileActive(true);

    (async () => {
      try {
        setLoading(true);
        setError(false);
        // const response = await axios.get("/api/v1/ecommerce/profile");
        const userData = await authService.getCurrentUser();
        // console.log("2 userData", userData);
        setProfile(userData);
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

  const handleAdd = () => {
    setIsEdit(false);
    setAddress(null);
    setAddrDialogOpen(true);
  };
  const handleEdit = (address) => {
    setIsEdit(true);
    setAddress(address);
    setAddrDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setAddrDialogOpen(false);
    setAddrTab();
  };

  const dispatch = useDispatch();
  const logout = () => {
    authService.logout().then(() => {
      dispatch(authLogout());
      setTotalQuantity(0);
      localStorage.removeItem("userID");
    });
    // (async () => {
    //   try {
    //     setLoading(true);
    //     setError(false);
    //     const response = await axios.post("/api/v1/users/logout");
    //     if (response.data.statusCode === 200) {
    //       localStorage.removeItem("authToken");
    //       var authValue = localStorage.getItem("authToken");
    //       setLoggedUser(authValue);
    //       navigate("/");
    //     }
    //     setLoading(false);
    //   } catch (error) {
    //     if (axios.isCancel(error)) {
    //       console.log("Request canceled", error.message);
    //       return;
    //     }
    //     setError(true);
    //     setLoading(false);
    //   }
    // })();
  };

  return (
    <div>
      <div className="lg:mx-52 border rounded-lg my-4">
        <div className="grid grid-rows-3 grid-cols-3">
          <div className="row-span-3 px-5 py-1 bg-blue-200 rounded-l-lg">
            <p className="text-xl font-semibold border-b py-2 border-gray-500">
              My Account
            </p>
            {/* <p
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
            </p> */}
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
              onClick={() => setOrdersTab()}
              className={`${
                ordersActive ? "bg-white text-blue-800" : ""
              } flex p-3 my-2 rounded-lg font-semibold cursor-pointer`}
            >
              {" "}
              <img className="relative mx-2" width={23} src={user} alt="" />
              Orders
            </p>
            <p
              onClick={logout}
              className="text-lg text-center font-semibold border-t py-2 border-gray-500 cursor-pointer"
            >
              Log Out
            </p>
          </div>
          <div className="col-span-2 py-5">
            {addrActive && (
              <>
                <div className="flex justify-between pb-3 px-5 xl:px-20 lg:px-12">
                  <p className="text-lg font-semibold">All Saved Addresses</p>
                  <div
                    onClick={handleAdd}
                    className="px-1 sm:px-2 py-2 bg-red-500 text-white rounded font-bold cursor-pointer"
                  >
                    Add New Address
                  </div>
                </div>
                <p className="border-b mx-5"></p>
                {addressList?.map((address) => (
                  <div key={address?.$id}>
                    <AddressCard
                      address={address}
                      handleEdit={handleEdit}
                      setAddrTab={setAddrTab}
                    />
                  </div>
                ))}
                <p className="border-b mx-10"></p>
              </>
            )}

            {profileActive && <Profile loading={loading} profile={profile} />}
            {orderList?.map((order) => (
              <div key={order?.$id}>
                {ordersActive && <OrdersList order={order} />}
              </div>
            ))}
          </div>
          {/* <div className="row-span-2 col-span-2">03</div> */}
        </div>
      </div>
      <AddressForm
        profileID={profile.$id}
        address={address}
        isEdit={isEdit}
        onClose={handleCloseDialog}
        addrDialogOpen={addrDialogOpen}
      />
    </div>
  );
};

export default Account;
