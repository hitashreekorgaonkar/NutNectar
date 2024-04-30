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
} from "../components/index";
import { useDispatch } from "react-redux";

const Account = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [addrDialogOpen, setAddrDialogOpen] = useState(false);
  const [addrActive, setAddrActive] = useState(true);
  const [profileActive, setProfileActive] = useState(false);
  const [addressList, setAddressList] = useState([]);
  const [profile, setProfile] = useState({});
  const [address, setAddress] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const { setTotalQuantity } = useContext(QuantityContext);

  const { setLoggedUser } = useContext(LoggedInUserContext);
  const navigate = useNavigate();

  const setAddrTab = () => {
    setAddrActive(true);
    setProfileActive(false);
    setProfileUser();
    setAddressMenu();
  };

  useEffect(() => {
    setAddressMenu();
    setProfileUser();
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
        const response = await axios.get("/api/v1/ecommerce/profile");
        setProfile(response.data.data);
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

  const setProfileTab = () => {
    setAddrActive(false);
    setProfileActive(true);

    (async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await axios.get("/api/v1/ecommerce/profile");
        setProfile(response.data.data);
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
                {addressList.map((address) => (
                  <div key={address._id}>
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
          </div>
          {/* <div className="row-span-2 col-span-2">03</div> */}
        </div>
      </div>
      <AddressForm
        address={address}
        isEdit={isEdit}
        onClose={handleCloseDialog}
        addrDialogOpen={addrDialogOpen}
      />
    </div>
  );
};

export default Account;
