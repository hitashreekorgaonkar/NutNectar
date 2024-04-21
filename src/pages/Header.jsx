import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import rucksack from "../assets/icons8-rucksack-60.png";
import img1 from "../assets/cart24.png";
import user from "../assets/user.png";
import QuantityContext from "../context/QuantityContext";
import LoggedInUserContext from "../context/loggedInUser/LoggedInUserContext";
import Login from "./Login";
import { useSelector } from "react-redux";
import axios from "axios";

const Header = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { totalQuantity } = useContext(QuantityContext);
  const { loggedUser } = useContext(LoggedInUserContext);
  const { setLoggedUser } = useContext(LoggedInUserContext);
  const { setTotalQuantity } = useContext(QuantityContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  useEffect(() => {
    var authValue = localStorage.getItem("auth");
    setLoggedUser(authValue);

    var totqnty = localStorage.getItem("tq");
    setTotalQuantity(totqnty);
  }, []);

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <header className="sticky z50 top-0">
        <nav className="w-full h-14 bgPeach flex justify-between items-center px-0 sm:px-4">
          <Link to="/">
            <img width="60" src={rucksack} alt="" />
          </Link>
          <ul className="flex font-semibold">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${
                    isActive ? "text-red-500" : "text-gray-700"
                  } mx-[10px] cursor-pointer`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/store"
                className={({ isActive }) =>
                  `${
                    isActive ? "text-red-500" : "text-gray-700"
                  } mx-[10px] cursor-pointer`
                }
              >
                Store
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `${
                    isActive ? "text-red-500" : "text-gray-700"
                  } mx-[10px] cursor-pointer`
                }
              >
                Contact Us
              </NavLink>
            </li>
          </ul>
          <div className="flex justify-between items-center">
            {" "}
            {!loggedUser && (
              <div
                onClick={handleOpenDialog}
                className="px-1 sm:px-2 py-2 bg-indigo-700 text-white rounded font-bold cursor-pointer"
              >
                Login/Signup
              </div>
            )}
            {loggedUser && (
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
