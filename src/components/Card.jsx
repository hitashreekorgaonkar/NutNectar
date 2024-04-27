import React from "react";
import { Link } from "react-router-dom";

const Card = ({ $id, mainImage, name, price }) => {
  return (
    <Link to={`/product/${$id}`}>
      <div>
        <img className="" src={mainImage} alt={name} srcSet="" />
        <h3>{name}</h3>
        <p>{price}</p>
      </div>
    </Link>
  );
};

export default Card;
