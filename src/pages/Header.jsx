import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import rucksack from "../assets/icons8-rucksack-60.png";
import img1 from "../assets/cart24.png";
import user from "../assets/user.png";
import {
  Login,
  authService,
  LoggedInUserContext,
  QuantityContext,
} from "../components/index";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

const Header = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { totalQuantity } = useContext(QuantityContext);
  const { loggedUser } = useContext(LoggedInUserContext);
  const { setLoggedUser } = useContext(LoggedInUserContext);
  const { setTotalQuantity } = useContext(QuantityContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    var authValue = localStorage.getItem("authToken");
    setLoggedUser(authValue);

    var totqnty = localStorage.getItem("tq");
    setTotalQuantity(totqnty);
  }, []);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const removeAuthTokenAfterTime = (timeInSeconds) => {
    setTimeout(() => {
      localStorage.removeItem("authToken");
      // You can also perform additional actions like redirecting the user or updating the state after removing the authToken
    }, timeInSeconds * 1000); // Convert seconds to milliseconds
  };

  removeAuthTokenAfterTime(10 * 60);

  const navItems = [
    { name: "Home", slug: "/" },
    { name: "Store", slug: "/store" },
    { name: "Contact Us", slug: "/contact" },
  ];

  return (
    <>
      <header className="sticky z50 top-0">
        <nav className="w-full h-14 bgPeach flex justify-between items-center px-0 sm:px-4">
          <Link to="/">
            <img width="60" src={rucksack} alt="" />
          </Link>
          <ul className="flex font-semibold">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.slug}
                  className={({ isActive }) =>
                    `${
                      isActive ? "text-red-500" : "text-gray-700"
                    } mx-[10px] cursor-pointer`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center">
            {" "}
            {!authStatus && (
              <div
                onClick={handleOpenDialog}
                className="px-1 sm:px-2 py-2 bg-indigo-700 text-white rounded font-bold cursor-pointer"
              >
                Login/Signup
              </div>
            )}
            {authStatus && (
              <Link to="/account">
                <div className="cursor-pointer mr-4">
                  <img
                    className="relative mx-auto"
                    width={24}
                    src={user}
                    alt=""
                  />
                  <p>Profile</p>
                </div>
              </Link>
            )}
            <Link to="/cart">
              <div className="cursor-pointer mx-7">
                <img className="relative" width={24} src={img1} alt="" />
                <div className="absolute top-2 right-0 bg-red-700 text-white w-5 h-5 rounded-full mx-8 text-center text-xs pt-0.5">
                  {totalQuantity ? totalQuantity : 0}
                </div>
              </div>{" "}
            </Link>
          </div>
        </nav>
      </header>

      <Login isDialogOpen={isDialogOpen} onClose={handleCloseDialog} />
    </>
  );
};

export default Header;
