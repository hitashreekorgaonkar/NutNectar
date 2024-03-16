import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  // const [products, setProducts] = useState([]);
  // const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       setLoading(true);
  //       setError(false);
  //       const response = await axios.get(
  //         "/api/v1/ecommerce/products?page=1&limit=10"
  //       );
  //       // console.log(response.data.data.products);
  //       setProducts(response.data.data.products);
  //       setLoading(false);
  //     } catch (error) {
  //       if (axios.isCancel(error)) {
  //         console.log("Request canceled", error.message);
  //         return;
  //       }
  //       setError(true);
  //       setLoading(false);
  //     }
  //   })();
  // }, []);

  return (
    <>
      <h1 className="text-3xl text-red-500 font-bold underline">Products</h1>

      {/* {loading && <h1>Loading...</h1>}
      {error && <h1>Something went wrong</h1>}

      {products.map((product, index) => (
        <div key={product._id}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <img src={product.mainImage.url} alt="" srcSet="" />
        </div>
      ))} */}
    </>
  );
}

export default App;
