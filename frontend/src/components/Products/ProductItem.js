import React from "react";

import "./ProductItem.css";

const ProductItem = (props) => {
  return (
    <li className="product-item">
      <h2>Profit: ${props.price}</h2>
      <textarea value={props.name} readOnly />
    </li>
  );
};

export default ProductItem;
