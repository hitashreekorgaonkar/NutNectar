import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const Post = () => {
  const { productid } = useParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [product, setProduct] = useState({});

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
        console.log("response", response.data.data);
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

    // cleanup
    // return () => {
    //   controller.abort();
    // };
  }, []);

  return (
    <>
      {loading && <h1>Loading ...</h1>}
      {error && <h1>Something went wrong</h1>}

      <div className="bg-orange-100 text-3xl p-5">
        Product Name: {product.name}
      </div>
    </>
  );
};

export default Post;
