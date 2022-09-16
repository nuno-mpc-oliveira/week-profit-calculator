import React, { useState, useEffect } from "react";

import Header from "./components/Header/Header";
import NewProduct from "./components/Products/NewProduct";
import ProductList from "./components/Products/ProductList";
import "./App.css";

function App() {
  const [loadedProducts, setLoadedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/profits");

      const responseData = await response.json();

      setLoadedProducts(responseData.profits);
      setIsLoading(false);
    };

    fetchProducts();
  }, []);

  const addProductHandler = async (productName) => {
    try {
      if (!productName) {
        throw new Error("Invalid data for calculate!");
      }

      const newProduct = {
        title: productName,
        price: 1,
      };

      let hasError = false;
      const response = await fetch("http://localhost:5000/prices", {
        method: "POST",
        body: JSON.stringify(newProduct),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        hasError = true;
      }

      const responseData = await response.json();

      if (hasError) {
        throw new Error(responseData.message);
      }

      window.location.reload(false);

    } catch (error) {
      alert(error.message || "Something went wrong!");
    }
  };

  return (
    <React.Fragment>
      <Header />
      <main>
        <NewProduct onAddProduct={addProductHandler} />
        {isLoading && <p className="loader">Loading...</p>}
        {!isLoading && <ProductList items={loadedProducts} />}
      </main>
    </React.Fragment>
  );
}

export default App;
