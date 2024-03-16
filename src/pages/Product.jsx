import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import parse from "html-react-parser";

const Product = () => {
  const navigate = useNavigate();
  const { productid } = useParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [product, setProduct] = useState({});
  const [totalItems, setTotalItems] = useState(1);

  useEffect(() => {
    const controller = new AbortController();
    // ;(async () => {  here ; is effie
    (async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await axios.get(
          "/api/v1/ecommerce/products/" + productid
        );
        // console.log("response", response.data.data);
        // console.log("description", response.data.data.description);
        setProduct(response.data.data);
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
  }, []);

  const addItem = () => {
    // totalItems = totalItems + 1;
    // setTotalItems(totalItems);   // this is also fine
    if (totalItems < product.stock) setTotalItems(totalItems + 1);
  };
  const removeItem = () => {
    // totalItems = totalItems + 1;
    // setTotalItems(totalItems);   // this is also fine
    if (totalItems > 1) setTotalItems(totalItems - 1);
  };
  const addToCart = () => {
    (async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await axios.post(
          "/api/v1/ecommerce/cart/item/" + productid,
          {
            quantity: totalItems,
          }
        );
        // console.log("response", response.data.data);
        navigate("/cart");
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

  return (
    <>
      {loading && (
        <div className="my-5 text-center">
          <button
            type="button"
            className="bg-indigo-500 outline-none px-5 py-1 rounded text-white shadow-lg hover:bg-indigo-700 inline-flex"
            disabled
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="animate-spin direction-normal h-5 w-5 mr-3"
            >
              <path d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z" />
            </svg>
            Loading...
          </button>
        </div>
      )}
      {error && <h1 className="text-center mt-5">Something went wrong</h1>}

      <div className="container mx-auto grid grid-cols-6 p-4">
        {/* {loading && <h1>Loading ...</h1>} */}

        <div className="col-span-6 md:col-span-3 flex justify-center">
          <img
            className="w-9/12 h-min"
            src={product.mainImage?.url}
            alt=""
            srcSet=""
          />
        </div>
        <div className="col-span-6 md:col-span-3">
          <div className="">
            <h1 className="text-3xl">{product.name}</h1>
            <h1 className="text-2xl py-4">
              {product.price && <span>₹</span>} {product.price}
            </h1>
            {/* <div className="">{product.description}</div> */}
            {product.price && (
              <div className="">{parse(product.description)}</div>
            )}
          </div>
          <div className="col-span-6 md:col-span-3 my-3">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                type="button"
                onClick={removeItem}
                className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 "
              >
                -
              </button>
              <div className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200">
                {totalItems}
              </div>
              <button
                type="button"
                onClick={addItem}
                className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 "
              >
                +
              </button>
            </div>
          </div>
          <div className="col-span-6 md:col-span-3">
            <button
              type="submit"
              onClick={addToCart}
              className="rounded-0 h-12 w-40 mr-3 bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white hover:text-black border-2 border-black"
            >
              ADD TO CART
            </button>
            <button
              type="submit"
              className="rounded-0 h-12 w-40 bg-white px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-black hover:text-white border-2 border-black"
            >
              BUY NOW
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
