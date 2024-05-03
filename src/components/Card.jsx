import React from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";

const Card = ({ $id, mainImage, name, price }) => {
  return (
    <Link to={`/product/${$id}`}>
      <div>
        <img
          className=""
          src={appwriteService.getFilePreview(mainImage)}
          alt={name}
          srcSet=""
        />
        <h3 className="font-medium">{name}</h3>
        <p>₹{price}</p>
      </div>
    </Link>
  );
};

export default Card;
