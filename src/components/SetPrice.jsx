export const setPrice = async () => {
  let rangeInput = document.querySelectorAll(".range-input input");
  let priceInput = document.querySelectorAll(".price-input input");
  let range = document.querySelector(".slider .progress");
  let priceGap = 50;

  priceInput.forEach((input) => {
    input.addEventListener("input", (e) => {
      let minPrice = parseInt(priceInput[0].value);
      let maxPrice = parseInt(priceInput[1].value);
      console.log("rangeInput[1].max", rangeInput[1].max);
      if (maxPrice - minPrice >= priceGap && maxPrice <= rangeInput[1].max) {
        if (
          e.target.className ===
          "input-min mozilla-textfield w-full h-full outline-none ml-3 rounded text-center border-solid border border-gray-400"
        ) {
          rangeInput[0].value = minPrice;
          range.style.left = (minPrice / rangeInput[0].max) * 100 + "%";
        } else {
          rangeInput[1].value = maxPrice;
          range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
        }
      }
    });
  });

  rangeInput.forEach((input) => {
    input.addEventListener("input", (e) => {
      let minVal = parseInt(rangeInput[0].value),
        maxVal = parseInt(rangeInput[1].value);

      if (maxVal - minVal < priceGap) {
        if (
          e.target.className ===
          "range-min cursor-pointer absolute w-full h-1 -top-1"
        ) {
          rangeInput[0].value = maxVal - priceGap;
        } else {
          rangeInput[1].value = minVal + priceGap;
        }
      } else {
        priceInput[0].value = minVal;
        priceInput[1].value = maxVal;
        range.style.left = (minVal / rangeInput[0].max) * 100 + "%";
        range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
      }
    });
  });
};
