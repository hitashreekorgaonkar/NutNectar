import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import parse from "html-react-parser";
import { QuantityContext } from "../components/index";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";

const Product = () => {
  // const userId = useSelector((state) => state.auth.userData.$id);
  const navigate = useNavigate();
  const { productid } = useParams();
  const { setTotalQuantity } = useContext(QuantityContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [product, setProduct] = useState(null);
  const [userId, setUserID] = useState("");
  const [productQuantity, setProductQuantity] = useState(1);
  // console.log("userId product", userId);

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("userID"));
    setUserID(userId);
    try {
      if (productid) {
        setLoading(true);
        setError(false);
        appwriteService.getProduct(productid).then((product) => {
          // console.log("product", product);
          if (product) {
            setProduct(product);
            setLoading(false);
          }
        });
      } else {
        navigate("/");
      }
    } catch (error) {
      setError(true);
      setLoading(false);
    }
    getProdQty(userId);
  }, [productid, navigate]);

  const addItem = () => {
    setProductQuantity(productQuantity + 1);
  };
  const removeItem = () => {
    setProductQuantity(productQuantity - 1);
  };

  const getProdQty = (userId) => {
    try {
      setLoading(true);
      setError(false);

      appwriteService.findMany(userId, productid).then((productCardDet) => {
        if (productCardDet?.total != 0) {
          setProductQuantity(productCardDet.documents[0].quantity);
          getCart(userId);
        }
      });
      setLoading(false);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
        return;
      }
      // setError(true);
      // setLoading(false);
    }
  };

  const getCart = (userId) => {
    try {
      setLoading(true);
      setError(false);
      appwriteService.getCart(userId).then((items) => {
        // console.log("items", items.documents);
        let tq = 0;
        items.documents.filter((x) => {
          tq += x.quantity;
          // console.log("documents x", tq);
        });
        localStorage.setItem("tq", tq);
        var totqnty = localStorage.getItem("tq");
        setTotalQuantity(totqnty);
        setLoading(false);
      });
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
        return;
      }
      setError(true);
      setLoading(false);
    }
  };

  const addToCart = (buyNow) => {
    (async () => {
      try {
        setLoading(true);
        setError(false);
        const checkDocumentId = await appwriteService.findMany(
          userId,
          productid
        );
        // console.log("checkDocumentId", checkDocumentId);
        // console.log(".total == 0", checkDocumentId.total == 0);

        if (checkDocumentId.total == 0) {
          const response = await appwriteService.addToCart({
            userId,
            productid,
            quantity: productQuantity,
          });
          // console.log("addToCart response", response);
          if (response) getProdQty(userId);
        } else {
          const response = await appwriteService.updateToCart(
            checkDocumentId.documents[0].$id,
            {
              quantity: productQuantity,
            }
          );
          if (response) getProdQty(userId);
          // console.log("updateToCart response", response);
        }

        // getProdQty();
        buyNow ? navigate("/cart") : "";
        setLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
          return;
        }
        // setError(true);
        setLoading(false);
      }
    })();

    // (async () => {
    //   try {
    //     setLoading(true);
    //     setError(false);
    //     const response = await axios.post(
    //       "/api/v1/ecommerce/cart/item/" + productid,
    //       {
    //         quantity: productQuantity,
    //       }
    //     );
    //     getProdQty();
    //     buyNow ? navigate("/cart") : "";
    //     setLoading(false);
    //   } catch (error) {
    //     if (axios.isCancel(error)) {
    //       console.log("Request canceled", error.message);
    //       return;
    //     }
    //     // setError(true);
    //     // setLoading(false);
    //   }
    // })();
  };

  return (
    <>
      {error && <h1 className="text-center mt-5">Something went wrong</h1>}

      {!product ? (
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
      ) : (
        <div className="container mx-auto grid grid-cols-6 p-4">
          {/* {loading && <h1>Loading ...</h1>} */}

          <div className="col-span-6 md:col-span-3 flex justify-center">
            <img
              className="w-9/12 h-min"
              src={appwriteService.getFilePreview(product?.mainImage)}
              alt={product?.name}
              srcSet=""
            />
          </div>
          <div className="col-span-6 md:col-span-3">
            <div className="">
              <h1 className="text-3xl">{product?.name}</h1>
              <h1 className="text-2xl py-4">
                {product?.price && <span>₹</span>} {product?.price}
              </h1>
              {/* <div className="">{product?.description}</div> */}
              {product?.price && (
                <div className="">{parse(product?.description)}</div>
              )}
            </div>
            <div className="col-span-6 md:col-span-3 my-3">
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <button
                  onClick={() => removeItem()}
                  disabled={productQuantity == 1}
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 disabled:bg-gray-100"
                >
                  -
                </button>
                <div className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200">
                  {productQuantity}
                </div>
                <button
                  onClick={() => addItem()}
                  disabled={productQuantity >= product?.stock}
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 disabled:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
            <div className="col-span-6 md:col-span-3">
              <button
                type="submit"
                onClick={() => addToCart()}
                className="rounded-0 h-12 w-40 mr-3 bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white hover:text-black border-2 border-black"
              >
                ADD TO CART
              </button>
              <button
                onClick={() => addToCart("buyNow")}
                type="submit"
                className="rounded-0 h-12 w-40 bg-white px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-black hover:text-white border-2 border-black"
              >
                BUY NOW
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
