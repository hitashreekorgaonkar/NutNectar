import React from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";

const Card = ({ $id, mainImage, name, price }) => {
  return (
    <Link to={`/product/${$id}`}>
      <div>
        <img className="" src={mainImage} alt={name} srcSet="" />
        {/* commenting below code as appwrite has asked to upgrade for image storage */}
        {/* <img
          className=""
          src={appwriteService.getFilePreview(mainImage)}
          alt={name}
          srcSet=""
        /> */}
        <div className="px-2">
          <h3 className="font-medium">{name}</h3>
          <p>₹{price}</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
