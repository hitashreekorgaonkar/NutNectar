import { React, useCallback, useEffect, useState } from "react";
import axios from "axios";
import "./Store.css";
import img1 from "../../assets/dryfruitsBckg_5.png";
import { Card } from "../../components";
import { setPrice } from "../../components/SetPrice";
const Store = () => {
  const [products, setProducts] = useState([]);
  const [mainProducts, setMainProducts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [minLength, setMinLength] = useState(21);
  const [maxLength, setMaxLength] = useState(550);
  const [sortBy, setSortBy] = useState("bestSelling");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    fetchData();
    setPrice();
  }, []);

  const fetchData = async () => {
    try {
      setProducts([]);
      setLoading(true);
      setError(false);
      const response = await axios.get(
        "/api/v1/ecommerce/products?page=1&limit=15"
      );
      setMainProducts(response.data.data.products);
      setProducts(response.data.data.products);

      setLoading(false);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
        return;
      }
      setError(true);
      setLoading(false);
    }
  };

  const handleMinPriceChange = (event) => {
    setMinLength(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxLength(event.target.value);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const handleCategoryChange = (event) => {
    setCategoryFilter(event);
    // if (event === "butter") {
    //   fetchProductTypeData("6575cae703e9443f2bad3410");
    // } else if (event === "chikki") {
    //   fetchProductTypeData("6575cb7803e9443f2bad3414");
    // } else if (event === "oil") {
    //   fetchProductTypeData("6575cb8b03e9443f2bad3418");
    // } else if (event === "all") {
    //   fetchData();
    // }
  };

  let sortedProducts = [...products];
  if (sortBy === "lowToHigh") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "highToLow") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  if (categoryFilter !== "all") {
    sortedProducts = sortedProducts.filter(
      (product) => product.category === categoryFilter
    );
  }

  sortedProducts = sortedProducts.filter(
    (product) => product.price >= minLength && product.price <= maxLength
  );

  return (
    <>
      <div className="flex justify-center text-center bgPeach relative mb-5">
        <img className="" src={img1} alt="" />
        <div className="absolute top-24 px-2 pb-2 border-4 border-white">
          <h1 className="text-white font-semibold text-4xl ">
            Shop All Products
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-3 px-20 py-4 lg:p-4">
          <p className="text-lg font-[500]">Price</p>

          {/* price starts */}
          <div className="price-input w-full flex mx-0 mb-5">
            <div className="field flex w-full h-11 items-center">
              <span>₹</span>
              <input
                type="number"
                className="input-min mozilla-textfield w-full h-full outline-none ml-3 rounded text-center border-solid border border-gray-400"
                value={minLength}
                onChange={handleMinPriceChange}
              />
            </div>
            <div className="separator w-32 flex text-xl items-center justify-center">
              -
            </div>
            <div className="field flex w-full h-11 items-center">
              <span>₹</span>
              <input
                type="number"
                className="input-max mozilla-textfield w-full h-full outline-none ml-3 rounded text-center border-solid border border-gray-400"
                value={maxLength}
                onChange={handleMaxPriceChange}
              />
            </div>
          </div>
          <div className="slider h-1 relative rounded bg-gray-300">
            <div className="progress h-full absolute rounded bg-gray-700"></div>
          </div>
          <div className="range-input relative">
            <input
              type="range"
              className="range-min cursor-pointer"
              min={0}
              max={600}
              value={minLength}
              onChange={handleMinPriceChange}
            />
            <input
              type="range"
              className="range-max cursor-pointer"
              min={0}
              max={600}
              value={maxLength}
              onChange={handleMaxPriceChange}
            />
          </div>
          {/* price ends */}

          {/* sort by starts */}
          <p className="text-lg font-[500] mt-5">Sort by</p>
          <div className="space-y-2">
            <p
              htmlFor="bestSelling"
              className="peer-checked/bestSelling:text-sky-500"
            >
              <input
                id="bestSelling"
                type="radio"
                className="peer/bestSelling"
                name="sortBy"
                value="bestSelling"
                checked={sortBy === "bestSelling"}
                onChange={(e) => handleSortChange(e.target.value)}
              />
              <span className="ml-2">Best Selling</span>
            </p>
            <p
              htmlFor="highToLow"
              className="peer-checked/highToLow:text-sky-500"
            >
              <input
                id="highToLow"
                type="radio"
                className="peer/highToLow"
                name="sortBy"
                value="highToLow"
                checked={sortBy === "highToLow"}
                onChange={(e) => handleSortChange(e.target.value)}
              />
              <span className="ml-2">Price, high to low</span>
            </p>

            <p
              htmlFor="lowToHigh"
              className="peer-checked/lowToHigh:text-sky-500"
            >
              <input
                id="lowToHigh"
                type="radio"
                className="peer/lowToHigh"
                name="sortBy"
                value="lowToHigh"
                checked={sortBy === "lowToHigh"}
                onChange={(e) => handleSortChange(e.target.value)}
              />
              <span className="ml-2">Price, low to high</span>
            </p>
          </div>
          {/* sort by ends */}

          {/* product type starts */}
          <p className="text-lg font-[500] mt-5">Product type</p>
          <div className="space-y-2">
            <p htmlFor="all" className="peer-checked/all:text-sky-500">
              <input
                id="all"
                type="radio"
                className="peer/all"
                name="prodType"
                value="all"
                checked={categoryFilter === "all"}
                onChange={(e) => handleCategoryChange(e.target.value)}
              />
              <span className="ml-2">All</span>
            </p>
            <p htmlFor="butter" className="peer-checked/butter:text-sky-500">
              <input
                id="butter"
                type="radio"
                className="peer/butter"
                name="prodType"
                value="6575cae703e9443f2bad3410"
                checked={categoryFilter === "6575cae703e9443f2bad3410"}
                onChange={(e) => handleCategoryChange(e.target.value)}
              />
              <span className="ml-2">Butter</span>
            </p>
            <p htmlFor="chikki" className="peer-checked/chikki:text-sky-500">
              <input
                id="chikki"
                type="radio"
                className="peer/chikki"
                name="prodType"
                value="6575cb7803e9443f2bad3414"
                checked={categoryFilter === "6575cb7803e9443f2bad3414"}
                onChange={(e) => handleCategoryChange(e.target.value)}
              />
              <span className="ml-2">Chikki</span>
            </p>

            <p htmlFor="oil" className="peer-checked/oil:text-sky-500">
              <input
                id="oil"
                type="radio"
                className="peer/oil"
                name="prodType"
                value="6575cb8b03e9443f2bad3418"
                checked={categoryFilter === "6575cb8b03e9443f2bad3418"}
                onChange={(e) => handleCategoryChange(e.target.value)}
              />
              <span className="ml-2">Oil</span>
            </p>
          </div>
          {/* product type ends */}
        </div>
        <div className="col-span-12 lg:col-span-9">
          <div className="grid text-center">
            {loading && <h1 className="py-5 font-[500] text-lg">Loading...</h1>}
            {error && (
              <h1 className="py-5 font-[500] text-lg">Something went wrong</h1>
            )}
            {/* {JSON.stringify(products)} */}
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 px-5">
            {sortedProducts.map((product) => (
              <div className="" key={product._id}>
                <Card {...product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Store;
