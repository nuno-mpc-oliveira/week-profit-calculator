import React, { useState } from "react";

import Input from "../Input/Input";
import Button from "../Button/Button";
import "./NewProduct.css";

const NewProduct = (props) => {
  const [enteredTitle, setEnteredTitle] = useState("");

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const submitProductHandler = (event) => {
    event.preventDefault();
    props.onAddProduct(enteredTitle);
  };

  return (
    <section id="new-product">
      <h2>Calculate the week profit</h2>
      <form onSubmit={submitProductHandler}>
        <Input
          type="text"
          label="Prices Array"
          id="title"
          value={enteredTitle}
          onChange={titleChangeHandler}
        />
        <Button type="submit">CALCULATE</Button>
      </form>
    </section>
  );
};

export default NewProduct;
