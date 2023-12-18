import React from "react";
import { Link } from "react-router-dom";

const Card = ({ _id, mainImage, name, price }) => {
  return (
    <Link to={`/product/${_id}`}>
      <div>
        <img className="" src={mainImage.url} alt="" srcSet="" />
        <h3>{name}</h3>
        <p>{price}</p>
        {/* <p>2{_id}</p> */}
      </div>
    </Link>
  );
};

export default Card;
