import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store.js";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout.jsx";
import {
  ContactUs,
  Home,
  Store,
  Product,
  Cart,
  Checkout,
  OrderStatus,
  AuthLayout,
  Account,
} from "./components/index.js";

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
        element: (
          <AuthLayout>
            <Cart />{" "}
          </AuthLayout>
        ),
      },
      {
        path: "account",
        element: (
          <AuthLayout>
            <Account />{" "}
          </AuthLayout>
        ),
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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
