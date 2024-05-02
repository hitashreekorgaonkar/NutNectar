import Input from "./Input";
import Input2 from "./Input2";
import Button from "./Button";
import Select from "./Select";
import OrdersList from "./OrdersList";
import AddressList from "./AddressList";
import AddressForm from "./AddressForm";
import AddressCard from "./AddressCard";
import SelectAddress from "../pages/SelectAddress";
import Profile from "./Profile";
import Account from "../pages/Account";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ContactUs from "../pages/ContactUs";
import Header from "../pages/Header";
import Footer from "../pages/Footer";
import AuthLayout from "./AuthLayout";
import QuantityContextProvider from "../context/QuantityContextProvider";
import QuantityContext from "../context/QuantityContext";
import LoggedInUserContextProvider from "../context/loggedInUser/LoggedInUserContextProvider";
import LoggedInUserContext from "../context/loggedInUser/LoggedInUserContext";
import authService from "../appwrite/auth";
import appwriteService from "../appwrite/config";
import Home from "../pages/Home.jsx";
import Store from "../pages/Store/Store.jsx";
import Product from "../pages/Product.jsx";
import Cart from "../pages/Cart.jsx";
import Checkout from "../pages/Checkout.jsx";
import OrderStatus from "../pages/OrderStatus.jsx";
import { login } from "../store/authSlice";
import { logout } from "../store/authSlice";

export {
  Header,
  Footer,
  //   Logo,
  AuthLayout,
  Login,
  Signup,
  ContactUs,
  Account,
  Home,
  Store,
  Product,
  Cart,
  Checkout,
  OrderStatus,
  Button,
  OrdersList,
  AddressList,
  AddressForm,
  SelectAddress,
  AddressCard,
  Profile,
  Input,
  Input2,
  Select,
  QuantityContextProvider,
  LoggedInUserContextProvider,
  QuantityContext,
  LoggedInUserContext,
  authService,
  appwriteService,
  login,
  logout,
};
