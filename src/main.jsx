import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "./pages/Home.jsx";
import Store from "./pages/Store/Store.jsx";
import Product from "./pages/Product.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import OrderStatus from "./pages/OrderStatus.jsx";
import Login from "./pages/Login.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/store",
        element: <Store />,
      },
      {
        path: "contact",
        element: <ContactUs />,
      },
      {
        path: "/product/:productid",
        element: <Product />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/order-status",
    element: <OrderStatus />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
